import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from 'types';

interface IngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null
};

export const ingredientsProductSlice = createSlice({
  name: 'ingredientsProduct',
  initialState,
  reducers: {}
});

export const ingredientsProductReducer = ingredientsProductSlice.reducer;
