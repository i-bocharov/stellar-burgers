import { RootState } from '@store';

export const selectIngredients = (state: RootState) =>
  state.ingredientsProduct.items;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredientsProduct.loading;

export const selectIngredientsError = (state: RootState) =>
  state.ingredientsProduct.error;

export const selectBuns = (state: RootState) =>
  state.ingredientsProduct.items.filter((item) => item.type === 'bun');

export const selectMains = (state: RootState) =>
  state.ingredientsProduct.items.filter((item) => item.type === 'main');

export const selectSauces = (state: RootState) =>
  state.ingredientsProduct.items.filter((item) => item.type === 'sauce');
