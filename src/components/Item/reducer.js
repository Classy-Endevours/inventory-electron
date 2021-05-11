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
  },
});

export const {
  getItemsFailed,
  getItems,
  getItemsSuccess,
  addItems,
  addItemsSuccess,
  addItemsFailed,
} = ItemSlicer.actions;

export default ItemSlicer.reducer;
