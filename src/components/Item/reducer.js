import { createSlice } from '@reduxjs/toolkit';

const ItemSlicer = createSlice({
  name: 'item',
  initialState: {
    items: [],
    recentItems: [],
    mostOutItems: [],
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
    getItems: (state) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      isError: false,
    }),
    getItemsSuccess: (state, action) => ({
      ...state,
      items: action.payload.data.items ?? [],
      recentItems: action.payload.data.recentItems ?? [],
      mostOutItems: action.payload.data.mostOutItems ?? [],
      isLoading: false,
      isSuccess: true,
      isError: false,
    }),
    getItemsFailed: (state) => ({
      ...state,
      isLoading: false,
      isSuccess: false,
      isError: true,
    }),
    addItems: (state) => ({
      ...state,
      isAddLoading: true,
      isAddSuccess: false,
      isAddError: false,
    }),
    addItemsSuccess: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: true,
      isAddError: false,
    }),
    addItemsFailed: (state) => ({
      ...state,
      isAddLoading: false,
      isAddSuccess: false,
      isAddError: true,
    }),
    editItems: (state) => ({
      ...state,
      isEditLoading: true,
      isEditSuccess: false,
      isEditError: false,
    }),
    editItemsSuccess: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: true,
      isEditError: false,
    }),
    editItemsFailed: (state) => ({
      ...state,
      isEditLoading: false,
      isEditSuccess: false,
      isEditError: true,
    }),
  },
});

export const {
  getItemsFailed,
  getItems,
  getItemsSuccess,
  addItems,
  addItemsSuccess,
  addItemsFailed,
  editItems,
  editItemsSuccess,
  editItemsFailed,
} = ItemSlicer.actions;

export default ItemSlicer.reducer;
