/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const BasicSettingSlice = createSlice({
  name: 'login',
  initialState: {
    isLoading: false,
    fail: false,
    success: false,
    message: '',
    basicDetails: {},
  },
  reducers: {
    updateSetting: (state) => ({
      ...state,
      isLoading: true,
      fail: false,
      success: false,
    }),
    updateSettingSuccess: (state, action) => ({
      ...state,
      basicDetails: action.payload.data,
      message: action.payload.message,
      success: true,
      fail: false,
      isLoading: false,
    }),
    updateSettingFail: (state, action) => ({
      ...state,
      message: action.payload.message,
      success: false,
      fail: true,
      isLoading: false,
    }),
    getSetting: (state) => ({
      ...state,
      isLoading: true,
      fail: false,
      success: false,
    }),
    getSettingSuccess: (state, action) => ({
      ...state,
      basicDetails: action.payload.data,
      message: action.payload.message,
      success: true,
      fail: false,
      isLoading: false,
    }),
    getSettingFail: (state, action) => ({
      ...state,
      message: action.payload.message,
      success: false,
      fail: true,
      isLoading: false,
    }),
  },
});

export const {
  updateSetting,
  updateSettingSuccess,
  updateSettingFail,
  getSetting,
  getSettingFail,
  getSettingSuccess,
} = BasicSettingSlice.actions;

export default BasicSettingSlice.reducer;
