import { createOrder, getUserOrders } from '@thunks/orders';
import { ordersReducer } from './orders-slice';

describe('ordersSlice', () => {
  const initialState = {
    userOrders: [],
    loading: false,
    error: null,
    orderRequest: false,
    orderModalData: null
  };

  it('orderRequest=true on createOrder.pending', () => {
    const action = {
      type: createOrder.pending.type,
      meta: {
        requestId: 'test-request-id',
        arg: undefined,
        requestStatus: 'pending'
      }
    };
    const state = ordersReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('orderRequest=false and orderModalData on createOrder.fulfilled', () => {
    const payload = { number: 123 };
    const action = { type: createOrder.fulfilled.type, payload };
    const state = ordersReducer(
      { ...initialState, orderRequest: true },
      action
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(payload);
  });

  it('orderRequest=false and error on createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка' },
      meta: {
        requestId: 'test-request-id',
        arg: undefined,
        requestStatus: 'rejected'
      }
    };
    const state = ordersReducer(
      { ...initialState, orderRequest: true },
      action
    );
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('loading=true on getUserOrders.pending', () => {
    const action = {
      type: getUserOrders.pending.type,
      meta: {
        requestId: 'test-request-id',
        arg: undefined,
        requestStatus: 'pending'
      }
    };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('loading=false and userOrders on getUserOrders.fulfilled', () => {
    const payload = [{ number: 1 }];
    const action = { type: getUserOrders.fulfilled.type, payload };
    const state = ordersReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.userOrders).toEqual(payload);
  });

  it('loading=false and error on getUserOrders.rejected', () => {
    const action = {
      type: getUserOrders.rejected.type,
      error: { message: 'Ошибка' },
      meta: {
        requestId: 'test-request-id',
        arg: undefined,
        requestStatus: 'rejected'
      }
    };
    const state = ordersReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('does not change state on unrelated pending action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'err',
      orderRequest: false
    };
    const action = {
      type: 'someOtherThunk/pending',
      meta: {}
    };
    const state = ordersReducer(prevState, action);
    expect(state).toEqual(prevState);
  });

  it('does not change state on unrelated rejected action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      error: null,
      orderRequest: true
    };
    const action = {
      type: 'someOtherThunk/rejected',
      error: { message: 'fail' },
      meta: {}
    };
    const state = ordersReducer(prevState, action);
    expect(state).toEqual(prevState);
  });
});
