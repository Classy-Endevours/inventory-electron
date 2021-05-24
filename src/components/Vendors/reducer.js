import { createSlice } from '@reduxjs/toolkit';

const VendorSlicer = createSlice({
  name: 'vendor',
  initialState: {
    vendor: [],
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
    getVendor: (state) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      isError: false,
    }),
    getVendorSuccess: (state, action) => ({
      ...state,
      vendor: action.payload.data.vendor ?? [],
      isLoading: false,
      isSuccess: true,
      isError: false,
    }),
    getVendorFailed: (state) => ({
      ...state,
      isLoading: false,
      isSuccess: false,
      isError: true,
    }),
    addVendor: (state) => ({
      ...state,
      isAddLoading: true,
      isAddSuccess: false,
      isAddError: false,
    }),
    addVendorSuccess: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: true,
      isAddError: false,
    }),
    addVendorFailed: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: false,
      isAddError: true,
    }),
    editVendor: (state) => ({
      ...state,
      isEditLoading: true,
      isEditSuccess: false,
      isEditError: false,
    }),
    editVendorSuccess: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: true,
      isEditError: false,
    }),
    editVendorFailed: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: false,
      isEditError: true,
    }),
  },
});

export const {
  getVendorFailed,
  getVendor,
  getVendorSuccess,
  addVendor,
  addVendorSuccess,
  addVendorFailed,
  editVendor,
  editVendorSuccess,
  editVendorFailed,
} = VendorSlicer.actions;

export default VendorSlicer.reducer;
