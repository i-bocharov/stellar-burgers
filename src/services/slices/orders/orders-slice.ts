import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { createOrder, getFeeds, getUserOrders } from '@thunks/orders';
import { TOrder } from 'types';

interface IOrdersState {
  orders: TOrder[];
  userOrders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: IOrdersState = {
  orders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null,
  orderRequest: false,
  orderModalData: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработчики fulfilled
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      // Один обработчик для всех pending
      .addMatcher(isPending, (state, action) => {
        if (action.type.startsWith('orders/createOrder')) {
          state.orderRequest = true;
          state.error = null;
        } else {
          state.loading = true;
          state.error = null;
        }
      })
      // Один обработчик для всех rejected
      .addMatcher(isRejected, (state, action) => {
        if (action.type.startsWith('orders/createOrder')) {
          state.orderRequest = false;
          state.error = action.payload as string;
        } else {
          state.loading = false;
          state.error = action.payload as string;
        }
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
