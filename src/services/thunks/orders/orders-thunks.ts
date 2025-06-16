import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@shared/types';

export const getFeeds = createAsyncThunk(
  'orders/getFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (err) {
      return rejectWithValue('Ошибка при получении заказов');
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (err) {
      return rejectWithValue('Ошибка при получении заказов пользователя');
    }
  }
);

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('orders/createOrder', async (ingredientIds, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredientIds);
    if (!response.success) {
      return rejectWithValue('Ошибка при оформлении заказа');
    }
    return response.order;
  } catch (err) {
    return rejectWithValue('Ошибка при оформлении заказа');
  }
});
