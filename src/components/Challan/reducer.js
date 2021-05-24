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
    addChallan: (state) => ({
      ...state,
      isAddLoading: true,
      isAddSuccess: false,
      isAddError: false,
    }),
    addChallanSuccess: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: true,
      isAddError: false,
    }),
    addChallanFailed: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: false,
      isAddError: true,
    }),
    editChallan: (state) => ({
      ...state,
      isEditLoading: true,
      isEditSuccess: false,
      isEditError: false,
    }),
    editChallanSuccess: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: true,
      isEditError: false,
    }),
    editChallanFailed: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: false,
      isEditError: true,
    }),
  },
});

export const {
  getChallanFailed,
  getChallan,
  getChallanSuccess,
  addChallan,
  addChallanFailed,
  addChallanSuccess,
  editChallanFailed,
  editChallan,
  editChallanSuccess,
} = InventoryInSlicer.actions;

export default InventoryInSlicer.reducer;
