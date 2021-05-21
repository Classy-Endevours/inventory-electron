import { createSlice } from '@reduxjs/toolkit';

const InventoryInSlicer = createSlice({
  name: 'challans',
  initialState: {
    challans: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    isAddLoading: false,
    isAddSuccess: false,
    isAddError: false,
    isEditLoading: false,
    isEditSuccess: false,
    isEditError: false,
  },
  reducers: {
    getChallan: (state) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      isError: false,
    }),
    getChallanSuccess: (state, action) => ({
      ...state,
      challans: action.payload.data.challans ?? [],
      isLoading: false,
      isSuccess: true,
      isError: false,
    }),
    getChallanFailed: (state) => ({
      ...state,
      isLoading: false,
      isSuccess: false,
      isError: true,
    }),
  },
});

export const {
  getChallanFailed,
  getChallan,
  getChallanSuccess,
} = InventoryInSlicer.actions;

export default InventoryInSlicer.reducer;
