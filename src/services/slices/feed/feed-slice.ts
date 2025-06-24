import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { getFeeds } from '@thunks/feed';
import { TOrder } from 'types';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addMatcher(isPending, (state, action) => {
        if (action.type === getFeeds.pending.type) {
          state.loading = true;
          state.error = null;
        }
      })
      .addMatcher(isRejected, (state, action) => {
        if (action.type === getFeeds.rejected.type) {
          state.loading = false;
          state.error = action.payload as string;
        }
      });
  }
});

export const feedReducer = feedSlice.reducer;
