import { TRootState } from '@store';

export const selectUser = (state: TRootState) => state.user.user;
export const selectIsAuthChecked = (state: TRootState) =>
  state.user.isAuthChecked;
export const selectIsAuth = (state: TRootState) => state.user.isAuth;
export const selectUserLoading = (state: TRootState) => state.user.loading;
export const selectUserError = (state: TRootState) => state.user.error;
