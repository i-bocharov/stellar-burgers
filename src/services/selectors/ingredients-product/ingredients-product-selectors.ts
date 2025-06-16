import { TIngredient } from '@shared/types';
import { TRootState } from '@store';

export const selectIngredients = (state: TRootState) =>
  state.ingredientsProduct.items;

export const selectIngredientsLoading = (state: TRootState) =>
  state.ingredientsProduct.loading;

export const selectIngredientsError = (state: TRootState) =>
  state.ingredientsProduct.error;

export const selectBuns = (state: TRootState) =>
  state.ingredientsProduct.items.filter(
    (item: TIngredient) => item.type === 'bun'
  );

export const selectMains = (state: TRootState) =>
  state.ingredientsProduct.items.filter(
    (item: TIngredient) => item.type === 'main'
  );

export const selectSauces = (state: TRootState) =>
  state.ingredientsProduct.items.filter(
    (item: TIngredient) => item.type === 'sauce'
  );
