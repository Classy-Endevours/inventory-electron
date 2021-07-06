/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const BasicSettingSlice = createSlice({
  name: 'login',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    isAddLoading: false,
    isAddSuccess: false,
    isAddError: false,
    isEditLoading: false,
    isEditSuccess: false,
    isEditError: false,
    basicDetails: [],
  },
  reducers: {
    updateSetting: (state) => ({
      ...state,
      isEditLoading: true,
      isEditError: false,
      isEditSuccess: false,
    }),
    updateSettingSuccess: (state, action) => ({
      ...state,
      basicDetails: action.payload.data.settings,
      message: action.payload.message,
      isEditSuccess: true,
      isEditError: false,
      isEditLoading: false,
    }),
    updateSettingFail: (state, action) => ({
      ...state,
      message: action.payload.message,
      isEditSuccess: false,
      isEditError: true,
      isEditLoading: false,
    }),
    getSetting: (state) => ({
      ...state,
      isLoading: true,
      isError: false,
      isSuccess: false,
    }),
    getSettingSuccess: (state, action) => ({
      ...state,
      basicDetails: action.payload.data.settings,
      message: action.payload.message,
      isSuccess: true,
      isError: false,
      isLoading: false,
    }),
    getSettingFail: (state, action) => ({
      ...state,
      message: action.payload.message,
      isSuccess: false,
      isError: true,
      isLoading: false,
    }),
    addSettings: (state) => ({
      ...state,
      isAddLoading: true,
      isAddSuccess: false,
      isAddError: false,
    }),
    addSettingsSuccess: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: true,
      isAddError: false,
    }),
    addSettingsFailed: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: false,
      isAddError: true,
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
  addSettings,
  addSettingsFailed,
  addSettingsSuccess,
} = BasicSettingSlice.actions;

export default BasicSettingSlice.reducer;
