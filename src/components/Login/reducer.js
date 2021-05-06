/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const helloWorldSlice = createSlice({
  name: 'login',
  initialState: {
    isLoading: false,
    fail: false,
    success: false,
    message: '',
    userData: {},
  },
  reducers: {
    login: (state) => ({
      ...state,
      isLoading: true,
      fail: false,
      success: false,
    }),
    loginSuccess: (state, action) => ({
      ...state,
      userData: action.payload.data,
      message: action.payload.message,
      success: true,
      fail: false,
      isLoading: false,
    }),
    loginFail: (state, action) => ({
      ...state,
      message: action.payload.message,
      success: false,
      fail: true,
      isLoading: false,
    }),
    clear: () => ({
      isLoading: false,
      fail: false,
      success: false,
      message: '',
      userData: {},
    }),
  },
});

export const {
  login,
  loginSuccess,
  loginFail,
  clear,
} = helloWorldSlice.actions;

export default helloWorldSlice.reducer;
