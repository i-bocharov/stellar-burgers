import { rootReducer } from './root-reducer';

describe('Проверяем правильную инициализацию rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toBeDefined();
  });
});
