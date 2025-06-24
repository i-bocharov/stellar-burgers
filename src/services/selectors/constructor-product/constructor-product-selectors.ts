import { TRootState } from '@store';
import { TIngredient } from 'types';

export const selectConstructorBun = (state: TRootState): TIngredient | null =>
  state.constructorProduct.bun;
export const selectConstructorIngredients = (
  state: TRootState
): TIngredient[] => state.constructorProduct.ingredients;
export const selectConstructorState = (state: TRootState) =>
  state.constructorProduct;
