import { getFeeds } from '@thunks/feed';
import { feedReducer } from './feed-slice';

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false, // или isLoading: false
    error: null
  };

  it('loading=true при getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true); // или state.isLoading
    expect(state.error).toBeNull();
  });

  it('loading=false и данные при getFeeds.fulfilled', () => {
    const payload = { orders: [{ number: 1 }], total: 10, totalToday: 2 };
    const action = { type: getFeeds.fulfilled.type, payload };
    const state = feedReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false); // или state.isLoading
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
  });

  it('loading=false и error при getFeeds.rejected', () => {
    const action = { type: getFeeds.rejected.type, payload: 'Ошибка' };
    const state = feedReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false); // или state.isLoading
    expect(state.error).toBe('Ошибка');
  });
});
