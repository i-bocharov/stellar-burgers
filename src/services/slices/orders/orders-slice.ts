import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { createOrder, getOrderByNumber, getUserOrders } from '@thunks/orders';
import { TOrder } from 'types';

interface IOrdersState {
  userOrders: TOrder[];
  loading: boolean;
  error: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: IOrdersState = {
  userOrders: [],
  loading: false,
  error: null,
  orderRequest: false,
  orderModalData: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderModalData = action.payload;
        state.loading = false;
      })
      .addMatcher(isPending, (state, action) => {
        if (action.type.startsWith('orders/createOrder')) {
          state.orderRequest = true;
          state.error = null;
        } else if (action.type === getUserOrders.pending.type) {
          state.loading = true;
          state.error = null;
        }
      })
      .addMatcher(isRejected, (state, action) => {
        if (action.type.startsWith('orders/createOrder')) {
          state.orderRequest = false;
          state.error = action.payload as string;
        } else if (action.type === getUserOrders.rejected.type) {
          state.loading = false;
          state.error = action.payload as string;
        }
      });
  }
});

export const { clearOrderModalData } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
