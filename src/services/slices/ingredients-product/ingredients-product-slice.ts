import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchIngredients } from '@thunks/ingredients-product';
import { TIngredient } from 'types';

export interface IIngredientsResponse {
  success: boolean;
  data: TIngredient[];
}

export interface IIngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IIngredientsState = {
  items: [],
  loading: false,
  error: null
};

export const ingredientsProductSlice = createSlice({
  name: 'ingredientsProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchIngredients.pending), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchIngredients.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const ingredientsProductReducer = ingredientsProductSlice.reducer;
