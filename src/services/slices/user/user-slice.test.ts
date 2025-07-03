import { createAction } from '@reduxjs/toolkit';
import { userReducer } from './user-slice';

describe('userSlice generic matchers', () => {
  const initialState = {
    user: null,
    isAuth: false,
    isAuthChecked: false,
    loading: false,
    error: null,
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false
  };

  it('устанавливает loading=true и error=null для любого /*/pending экшена', () => {
    const fakePending = createAction('someThunk/pending')();
    const prevState = { ...initialState, error: 'oops' };
    const next = userReducer(prevState, fakePending);
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('устанавливает loading=false и error=payload для любого /*/rejected экшена', () => {
    const fakeErrorMessage = 'fail reason';
    const fakeRejected = createAction<string>('otherAction/rejected')(
      fakeErrorMessage
    );
    const prevState = { ...initialState, loading: true };
    const next = userReducer(prevState, fakeRejected);
    expect(next.loading).toBe(false);
    expect(next.error).toBe(fakeErrorMessage);
  });
});
