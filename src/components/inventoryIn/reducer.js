import { createSlice } from '@reduxjs/toolkit';

const InventoryInSlicer = createSlice({
  name: 'inventoryIn',
  initialState: {
    inventoryIn: [],
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
    getInventoryIns: (state) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      isError: false,
    }),
    getInventoryInsSuccess: (state, action) => ({
      ...state,
      inventoryIn: action.payload.data.inventoryIn ?? [],
      isLoading: false,
      isSuccess: true,
      isError: false,
    }),
    getInventoryInsFailed: (state) => ({
      ...state,
      isLoading: false,
      isSuccess: false,
      isError: true,
    }),
    addInventoryIns: (state) => ({
      ...state,
      isAddLoading: true,
      isAddSuccess: false,
      isAddError: false,
    }),
    addInventoryInsSuccess: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: true,
      isAddError: false,
    }),
    addInventoryInsFailed: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: false,
      isAddError: true,
    }),
    editInventoryIns: (state) => ({
      ...state,
      isEditLoading: true,
      isEditSuccess: false,
      isEditError: false,
    }),
    editInventoryInsSuccess: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: true,
      isEditError: false,
    }),
    editInventoryInsFailed: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: false,
      isEditError: true,
    }),
  },
});

export const {
  getInventoryInsFailed,
  getInventoryIns,
  getInventoryInsSuccess,
  addInventoryIns,
  addInventoryInsSuccess,
  addInventoryInsFailed,
  editInventoryIns,
  editInventoryInsSuccess,
  editInventoryInsFailed,
} = InventoryInSlicer.actions;

export default InventoryInSlicer.reducer;
