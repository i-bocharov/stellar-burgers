import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  constructorProductReducer
} from './constructor-product-slice';

const bun = {
  _id: '1',
  name: 'Булка 1',
  type: 'bun',
  price: 100,
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0
};

const ingredient = {
  _id: '2',
  name: 'Начинка 1',
  type: 'main',
  price: 50,
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0
};

describe('constructorProductSlice', () => {
  it('добавляет булку', () => {
    const state = constructorProductReducer(undefined, addIngredient(bun));
    expect(state.bun).toEqual(expect.objectContaining({ name: 'Булка 1' }));
  });

  it('adds ingredient', () => {
    const state = constructorProductReducer(
      undefined,
      addIngredient(ingredient)
    );
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({ name: 'Начинка 1' })
    );
  });

  it('removes ingredient', () => {
    const stateWithIngredient = constructorProductReducer(
      undefined,
      addIngredient(ingredient)
    );
    const id = stateWithIngredient.ingredients[0].id;
    const state = constructorProductReducer(
      stateWithIngredient,
      removeIngredient(id)
    );
    expect(state.ingredients.length).toBe(0);
  });

  it('moves ingredient', () => {
    const state1 = constructorProductReducer(
      undefined,
      addIngredient(ingredient)
    );
    const state2 = constructorProductReducer(
      state1,
      addIngredient({ ...ingredient, _id: '3', name: 'Начинка 2' })
    );
    const id1 = state2.ingredients[0].id;
    const id2 = state2.ingredients[1].id;
    // Меняем местами
    const state3 = constructorProductReducer(
      state2,
      moveIngredient({ from: 0, to: 1 })
    );
    expect(state3.ingredients[0].id).toBe(id2);
    expect(state3.ingredients[1].id).toBe(id1);
  });

  it('clears constructor', () => {
    let state = constructorProductReducer(undefined, addIngredient(bun));
    state = constructorProductReducer(state, addIngredient(ingredient));
    state = constructorProductReducer(state, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});
