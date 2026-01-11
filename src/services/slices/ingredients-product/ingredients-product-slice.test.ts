import { fetchIngredients } from '@thunks/ingredients-product';
import { ingredientsProductReducer } from './ingredients-product-slice';

describe('ingredientsProductSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('sets loading=true and error=null on fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsProductReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('sets loading=false and updates items on fetchIngredients.fulfilled', () => {
    const items = [{ _id: '1', name: 'Булка 1' }];
    const action = { type: fetchIngredients.fulfilled.type, payload: items };
    const state = ingredientsProductReducer(initialState, action);
    expect(state.items).toEqual(items);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('sets loading=false and error on fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type, payload: 'Ошибка' };
    const state = ingredientsProductReducer(initialState, action);
    expect(state.error).toBe('Ошибка');
    expect(state.loading).toBe(false);
  });
});
