import { createSlice } from '@reduxjs/toolkit';
import { TUser } from 'types';

interface IUserState {
  user: TUser | null;
  isAuth: boolean;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: null,
  isAuth: false,
  isAuthChecked: false,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

export const userReducer = userSlice.reducer;
