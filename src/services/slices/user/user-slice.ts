import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  checkUserAuth,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser
} from '@thunks/user';

import { TUser } from 'types';

interface IUserState {
  user: TUser | null;
  isAuth: boolean;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
  forgotPasswordSuccess: boolean;
  resetPasswordSuccess: boolean;
}

const initialState: IUserState = {
  user: null,
  isAuth: false,
  isAuthChecked: false,
  loading: false,
  error: null,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetPasswordFlags: (state) => {
      state.forgotPasswordSuccess = false;
      state.resetPasswordSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuthChecked = true;
        state.loading = false;
      })

      // login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
      })

      // register
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.loading = false;
      })

      // update
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })

      // forgot password
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordSuccess = true;
        state.loading = false;
      })

      // reset password
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordSuccess = true;
        state.loading = false;
      })

      // общие обработчики
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  }
});

export const { resetError, resetPasswordFlags } = userSlice.actions;
export const userReducer = userSlice.reducer;
