/// <reference types="cypress" />

import { SELECTORS } from './constants';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(type: 'bun' | 'main' | 'sauce'): Chainable<void>;
      submitOrder(): Chainable<void>;
      closeOrderModal(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('addIngredient', (type) => {
  cy.get(
    SELECTORS[`INGREDIENT_${type.toUpperCase()}` as keyof typeof SELECTORS]
  )
    .contains('Добавить')
    .click()
    .as(`ingredient${type.charAt(0).toUpperCase() + type.slice(1)}`);
});

Cypress.Commands.add('submitOrder', () => {
  cy.get(SELECTORS.ORDER_SUMM_BUTTON).click().as('orderButton');
});

Cypress.Commands.add('closeOrderModal', () => {
  cy.get(SELECTORS.MODAL_CLOSE_BUTTON).click();
});
