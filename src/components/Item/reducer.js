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
      items: action.payload.items,
      recentItems: action.payload.recentItems,
      mostOutItems: action.payload.mostOutItems,
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
  },
});

export const { getItemsFailed, getItems, getItemsSuccess } = ItemSlicer.actions;

export default ItemSlicer.reducer;
