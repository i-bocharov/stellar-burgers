import { SELECTORS, TEST_URL } from '../support/constants';

describe('Constructor Product', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(TEST_URL);
  });

  it('adds bun to constructor', () => {
    cy.addIngredient('bun');
    cy.get(SELECTORS.CONSTRUCTOR_BUN_1)
      .contains('Ингредиент 1')
      .should('exist')
      .as('bunTop');
    cy.get(SELECTORS.CONSTRUCTOR_BUN_2)
      .contains('Ингредиент 1')
      .should('exist')
      .as('bunBottom');

    cy.get('@bunTop').should('contain', 'Ингредиент 1');
    cy.get('@bunBottom').should('contain', 'Ингредиент 1');
  });

  it('adds main and sauce to constructor', () => {
    cy.addIngredient('main');
    cy.addIngredient('sauce');
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS)
      .contains('Ингредиент 2')
      .should('exist')
      .as('ingredient2');
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS)
      .contains('Ингредиент 4')
      .should('exist')
      .as('ingredient4');

    cy.get('@ingredient2').should('contain', 'Ингредиент 2');
    cy.get('@ingredient4').should('contain', 'Ингредиент 4');
  });
});

describe('Order placement', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refresh-token')
    );
    cy.setCookie('accessToken', 'test-access-token');
    cy.visit(TEST_URL);
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('places order and clears constructor', () => {
    cy.addIngredient('bun');
    cy.addIngredient('main');
    cy.addIngredient('sauce');

    cy.submitOrder();

    cy.get(SELECTORS.ORDER_NUMBER)
      .contains('123456')
      .should('exist')
      .as('orderNumber');

    cy.get('@orderNumber').should('contain', '123456');

    cy.closeOrderModal();

    cy.get('@orderNumber').should('not.exist');

    cy.get(SELECTORS.CONSTRUCTOR).as('constructorArea');

    cy.get('@constructorArea').contains('Ингредиент 1').should('not.exist');
    cy.get('@constructorArea').contains('Ингредиент 2').should('not.exist');
    cy.get('@constructorArea').contains('Ингредиент 4').should('not.exist');
  });
});
