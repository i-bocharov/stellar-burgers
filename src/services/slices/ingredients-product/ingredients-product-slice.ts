import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from 'types';

interface IIngredientsResponse {
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

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetch', async (_, { rejectWithValue }) => {
  try {
    // Типизируем промежуточный ответ
    const res = await getIngredientsApi();
    // Проверяем и приводим к нужному типу
    const response = res as unknown as IIngredientsResponse;

    if (!response.success) {
      return rejectWithValue('Ошибка при загрузке ингредиентов');
    }
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Неизвестная ошибка при загрузке ингредиентов');
  }
});

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
