import { getFeeds } from '@thunks/feed';
import { feedReducer } from './feed-slice';

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  it('sets loading=true and error=null on getFeeds.pending', () => {
    const action = {
      type: getFeeds.pending.type,
      meta: {
        requestId: 'test-request-id',
        arg: undefined,
        requestStatus: 'pending'
      }
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('sets loading=false and updates data on getFeeds.fulfilled', () => {
    const payload = { orders: [{ number: 1 }], total: 10, totalToday: 2 };
    const action = { type: getFeeds.fulfilled.type, payload };
    const state = feedReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
  });

  it('sets loading=false and error on getFeeds.rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Ошибка' },
      meta: {
        requestId: 'test-request-id',
        arg: undefined,
        requestStatus: 'rejected'
      }
    };
    const state = feedReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('does not change state on unrelated pending action', () => {
    const prevState = { ...initialState, loading: false, error: 'err' };
    const action = {
      type: 'someOtherThunk/pending',
      meta: {}
    };
    const state = feedReducer(prevState, action);
    expect(state).toEqual(prevState);
  });

  it('does not change state on unrelated rejected action', () => {
    const prevState = { ...initialState, loading: true, error: null };
    const action = {
      type: 'someOtherThunk/rejected',
      error: { message: 'fail' },
      meta: {}
    };
    const state = feedReducer(prevState, action);
    expect(state).toEqual(prevState);
  });
});
