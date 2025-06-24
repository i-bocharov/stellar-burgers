import { TRootState } from '@store';
import { TOrder } from 'types';

export const selectFeedOrders = (state: TRootState): TOrder[] =>
  state.feed.orders;
export const selectFeedLoading = (state: TRootState) => state.feed.loading;
export const selectFeedError = (state: TRootState) => state.feed.error;
export const selectFeedTotal = (state: TRootState) => state.feed.total;
export const selectFeedTotalToday = (state: TRootState) =>
  state.feed.totalToday;
