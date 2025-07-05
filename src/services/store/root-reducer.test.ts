import { rootReducer } from './root-reducer';

describe('rootReducer', () => {
  it('returns initial state for unknown action', () => {
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toBeDefined();
  });
});
