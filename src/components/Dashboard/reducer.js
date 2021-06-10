import { createSlice } from '@reduxjs/toolkit';

const mergeNestedObjects = (arr, key) => {
  const newArray = arr.map((e) => {
    const json = { ...e, ...e[key] };
    delete json[key];
    return json;
  });
  return newArray;
};

const DashboardSlicer = createSlice({
  name: 'dashboard',
  initialState: {
    lineGraph: {
      data: [],
      isSuccess: false,
      isError: false,
      isLoading: false,
    },
  },
  reducers: {
    getLineGraph: (state) => ({
      ...state,
      lineGraph: {
        ...state.lineGraph,
        isLoading: true,
        isSuccess: false,
        isError: false,
      },
    }),
    getLineGraphSuccess: (state, action) => ({
      ...state,
      lineGraph: {
        ...state.lineGraph,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: mergeNestedObjects(
          action.payload.data.mostOutItems ?? [],
          'item',
        ),
      },
    }),
    getLineGraphFailed: (state) => ({
      ...state,
      lineGraph: {
        ...state.lineGraph,
        isLoading: false,
        isSuccess: false,
        isError: true,
        data: [],
      },
    }),
  },
});

export const { getLineGraph, getLineGraphFailed, getLineGraphSuccess } =
  DashboardSlicer.actions;

export default DashboardSlicer.reducer;
