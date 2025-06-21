import { TRootState } from '@store';
import { TOrder } from 'types';

export const selectUserOrders = (state: TRootState): TOrder[] =>
  state.orders.userOrders;
export const selectOrderModalData = (state: TRootState) =>
  state.orders.orderModalData;
export const selectOrderRequest = (state: TRootState) =>
  state.orders.orderRequest;
