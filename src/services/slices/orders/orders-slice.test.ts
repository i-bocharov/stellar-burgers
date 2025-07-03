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

  it('orderRequest=true при createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('orderRequest=false и orderModalData при createOrder.fulfilled', () => {
    const payload = { number: 123 };
    const action = { type: createOrder.fulfilled.type, payload };
    const state = ordersReducer(
      { ...initialState, orderRequest: true },
      action
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(payload);
  });

  it('orderRequest=false и error при createOrder.rejected', () => {
    const action = { type: createOrder.rejected.type, payload: 'Ошибка' };
    const state = ordersReducer(
      { ...initialState, orderRequest: true },
      action
    );
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('loading=true при getUserOrders.pending', () => {
    const action = { type: getUserOrders.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('loading=false и userOrders при getUserOrders.fulfilled', () => {
    const payload = [{ number: 1 }];
    const action = { type: getUserOrders.fulfilled.type, payload };
    const state = ordersReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.userOrders).toEqual(payload);
  });

  it('loading=false и error при getUserOrders.rejected', () => {
    const action = { type: getUserOrders.rejected.type, payload: 'Ошибка' };
    const state = ordersReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
