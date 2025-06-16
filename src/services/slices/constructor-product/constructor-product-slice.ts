import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from 'types';
import { v4 as uuidv4 } from 'uuid';

interface IConstructorProductState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  total: number;
}

const initialState: IConstructorProductState = {
  bun: null,
  ingredients: [],
  total: 0
};

export const constructorProductSlice = createSlice({
  name: 'constructorProduct',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    }
  }
});

export const { addIngredient } = constructorProductSlice.actions;
export const constructorProductReducer = constructorProductSlice.reducer;
