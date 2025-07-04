import { createAction } from '@reduxjs/toolkit';
import { resetError, resetPasswordFlags, userReducer } from './user-slice';

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuth: false,
    isAuthChecked: false,
    loading: false,
    error: null,
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false
  };

  it('sets loading=true and error=null for any /*/pending action', () => {
    const fakePending = createAction('someThunk/pending')();
    const prevState = { ...initialState, error: 'oops' };
    const next = userReducer(prevState, fakePending);
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('sets loading=false and error=payload for any /*/rejected action', () => {
    const fakeErrorMessage = 'fail reason';
    const fakeRejected = createAction<string>('otherAction/rejected')(
      fakeErrorMessage
    );
    const prevState = { ...initialState, loading: true };
    const next = userReducer(prevState, fakeRejected);
    expect(next.loading).toBe(false);
    expect(next.error).toBe(fakeErrorMessage);
  });

  it('resetError sets error to null', () => {
    const prevState = {
      error: 'fail',
      user: null,
      isAuth: false,
      isAuthChecked: false,
      loading: false,
      forgotPasswordSuccess: false,
      resetPasswordSuccess: false
    };
    const next = userReducer(prevState, resetError());
    expect(next.error).toBeNull();
  });

  it('resetPasswordFlags sets forgotPasswordSuccess and resetPasswordSuccess to false', () => {
    const prevState = {
      error: null,
      user: null,
      isAuth: false,
      isAuthChecked: false,
      loading: false,
      forgotPasswordSuccess: true,
      resetPasswordSuccess: true
    };
    const next = userReducer(prevState, resetPasswordFlags());
    expect(next.forgotPasswordSuccess).toBe(false);
    expect(next.resetPasswordSuccess).toBe(false);
  });
});
