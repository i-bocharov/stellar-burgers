import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@shared/types';

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

export const getOrderByNumber = createAsyncThunk<
  TOrder,
  string,
  { rejectValue: string }
>('orders/getOrderByNumber', async (orderNumber, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(Number(orderNumber));
    if (Array.isArray(response.orders) && response.orders.length > 0) {
      return response.orders[0];
    }
    return rejectWithValue('Заказ не найден');
  } catch (err) {
    return rejectWithValue('Ошибка при получении заказа');
  }
});
