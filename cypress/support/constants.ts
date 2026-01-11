export const TEST_URL = 'http://localhost:4000';

export const SELECTORS = {
  INGREDIENT_BUN: '[data-cy=ingredients-bun]',
  INGREDIENT_MAIN: '[data-cy=ingredients-main]',
  INGREDIENT_SAUCE: '[data-cy=ingredients-sauce]',
  CONSTRUCTOR_BUN_1: '[data-cy=constructor-bun-1]',
  CONSTRUCTOR_BUN_2: '[data-cy=constructor-bun-2]',
  CONSTRUCTOR_INGREDIENTS: '[data-cy=constructor-ingredients]',
  ORDER_SUMM_BUTTON: '[data-cy=order-summ] button',
  ORDER_NUMBER: '[data-cy=order-number]',
  MODAL_CLOSE_BUTTON: '#modals button[aria-label="Закрыть"]',
  CONSTRUCTOR: '[data-cy=constructor]'
} as const;
