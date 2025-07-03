describe('Constructor Product', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('adds bun to constructor', () => {
    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Ингредиент 1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Ингредиент 1')
      .should('exist');
  });

  it('adds main and sauce to constructor', () => {
    cy.get('[data-cy=ingredients-main]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-sauce]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 2')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 4')
      .should('exist');
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
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('places order and clears constructor', () => {
    cy.get('[data-cy=ingredients-bun]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-main]').contains('Добавить').click();
    cy.get('[data-cy=ingredients-sauce]').contains('Добавить').click();
    cy.get('[data-cy=order-summ] button').click();

    cy.get('[data-cy=order-number]').contains('123456').should('exist');

    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 1')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 2')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 4')
      .should('not.exist');
  });
});
