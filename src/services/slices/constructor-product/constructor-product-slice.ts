import { createSlice } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from 'types';

interface ConstructorProductState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  total: number;
}

const initialState: ConstructorProductState = {
  bun: null,
  ingredients: [],
  total: 0
};

export const constructorProductSlice = createSlice({
  name: 'constructorProduct',
  initialState,
  reducers: {}
});

export const constructorProductReducer = constructorProductSlice.reducer;
