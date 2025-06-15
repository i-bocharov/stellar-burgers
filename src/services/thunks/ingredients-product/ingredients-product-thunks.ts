import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from 'types';
import { IIngredientsResponse } from '@slices/ingredients-product';

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
