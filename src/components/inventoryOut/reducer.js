import { createSlice } from '@reduxjs/toolkit';

const InventoryOutSlicer = createSlice({
  name: 'inventoryOut',
  initialState: {
    inventoryOut: [],
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
    getInventoryOuts: (state) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      isError: false,
    }),
    getInventoryOutsSuccess: (state, action) => ({
      ...state,
      inventoryOut: action.payload.data.inventoryOut ?? [],
      isLoading: false,
      isSuccess: true,
      isError: false,
    }),
    getInventoryOutsFailed: (state) => ({
      ...state,
      isLoading: false,
      isSuccess: false,
      isError: true,
    }),
    addInventoryOuts: (state) => ({
      ...state,
      isAddLoading: true,
      isAddSuccess: false,
      isAddError: false,
    }),
    addInventoryOutsSuccess: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: true,
      isAddError: false,
    }),
    addInventoryOutsFailed: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: false,
      isAddError: true,
    }),
    editInventoryOuts: (state) => ({
      ...state,
      isEditLoading: true,
      isEditSuccess: false,
      isEditError: false,
    }),
    editInventoryOutsSuccess: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: true,
      isEditError: false,
    }),
    editInventoryOutsFailed: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: false,
      isEditError: true,
    }),
  },
});

export const {
  getInventoryOutsFailed,
  getInventoryOuts,
  getInventoryOutsSuccess,
  addInventoryOuts,
  addInventoryOutsSuccess,
  addInventoryOutsFailed,
  editInventoryOuts,
  editInventoryOutsSuccess,
  editInventoryOutsFailed,
} = InventoryOutSlicer.actions;

export default InventoryOutSlicer.reducer;
