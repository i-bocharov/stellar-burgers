import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { TUser } from 'types';

// Регистрация пользователя
export const registerUser = createAsyncThunk<
  TUser,
  { email: string; password: string; name: string }
>('user/register', async (data, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  } catch (err) {
    return rejectWithValue('Ошибка при регистрации');
  }
});

// Логин пользователя
export const loginUser = createAsyncThunk<
  TUser,
  { email: string; password: string }
>(
  'user/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (err) {
      return rejectWithValue('Ошибка при входе');
    }
  }
);

// Запрос на восстановление пароля
export const forgotPassword = createAsyncThunk<void, { email: string }>(
  'user/forgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(data);
    } catch (err) {
      return rejectWithValue('Ошибка при запросе восстановления пароля');
    }
  }
);

// Сброс пароля
export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string }
>('user/resetPassword', async (data, { rejectWithValue }) => {
  try {
    await resetPasswordApi(data);
  } catch (err) {
    return rejectWithValue('Ошибка при сбросе пароля');
  }
});

// Проверка авторизации пользователя
export const checkUserAuth = createAsyncThunk<TUser, void>(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data.user;
    } catch (err) {
      return rejectWithValue('Не авторизован');
    }
  }
);

// Обновление данных пользователя
export const updateUser = createAsyncThunk<
  TUser,
  Partial<{ name: string; email: string; password: string }>
>('user/update', async (data, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(data);
    return response.user;
  } catch (err) {
    return rejectWithValue('Ошибка при обновлении данных');
  }
});

// Выход пользователя
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
    } catch (err) {
      return rejectWithValue('Ошибка при выходе');
    }
  }
);
