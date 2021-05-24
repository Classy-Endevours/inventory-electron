import { createSlice } from '@reduxjs/toolkit';

const SupplierSlicer = createSlice({
  name: 'supplier',
  initialState: {
    supplier: [],
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
    getSupplier: (state) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      isError: false,
    }),
    getSupplierSuccess: (state, action) => ({
      ...state,
      supplier: action.payload.data.supplier ?? [],
      isLoading: false,
      isSuccess: true,
      isError: false,
    }),
    getSupplierFailed: (state) => ({
      ...state,
      isLoading: false,
      isSuccess: false,
      isError: true,
    }),
    addSupplier: (state) => ({
      ...state,
      isAddLoading: true,
      isAddSuccess: false,
      isAddError: false,
    }),
    addSupplierSuccess: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: true,
      isAddError: false,
    }),
    addSupplierFailed: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: false,
      isAddError: true,
    }),
    editSupplier: (state) => ({
      ...state,
      isEditLoading: true,
      isEditSuccess: false,
      isEditError: false,
    }),
    editSupplierSuccess: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: true,
      isEditError: false,
    }),
    editSupplierFailed: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: false,
      isEditError: true,
    }),
  },
});

export const {
  getSupplierFailed,
  getSupplier,
  getSupplierSuccess,
  addSupplier,
  addSupplierSuccess,
  addSupplierFailed,
  editSupplier,
  editSupplierSuccess,
  editSupplierFailed,
} = SupplierSlicer.actions;

export default SupplierSlicer.reducer;
