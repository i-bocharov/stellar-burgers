import { fetchIngredients } from '@thunks/ingredients-product';
import { ingredientsProductReducer } from './ingredients-product-slice';

describe('ingredientsProductSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('устанавливает loading=true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsProductReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('записывает данные и loading=false при fetchIngredients.fulfilled', () => {
    const items = [{ _id: '1', name: 'Булка 1' }];
    const action = { type: fetchIngredients.fulfilled.type, payload: items };
    const state = ingredientsProductReducer(initialState, action);
    expect(state.items).toEqual(items);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('записывает ошибку и loading=false при fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type, payload: 'Ошибка' };
    const state = ingredientsProductReducer(initialState, action);
    expect(state.error).toBe('Ошибка');
    expect(state.loading).toBe(false);
  });
});
