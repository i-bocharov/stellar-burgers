import { createSlice } from '@reduxjs/toolkit';
import { TUser } from 'types';

interface UserState {
  user: TUser | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

export const userReducer = userSlice.reducer;
