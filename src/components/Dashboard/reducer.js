import { createSlice } from '@reduxjs/toolkit';

export const mergeNestedObjects = (arr, key) => {
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
    columnGraph: {
      data: [],
      isSuccess: false,
      isError: false,
      isLoading: false,
    },
    allSuppliers: {
      data: [],
      isSuccess: false,
      isError: false,
      isLoading: false,
    },
    comparison: {
      data: {},
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
    getColumnGraph: (state) => ({
      ...state,
      columnGraph: {
        ...state.columnGraph,
        isLoading: true,
        isSuccess: false,
        isError: false,
      },
    }),
    getColumnGraphSuccess: (state, action) => ({
      ...state,
      columnGraph: {
        ...state.columnGraph,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: action.payload.data.data ?? [],
      },
    }),
    getColumnGraphFailed: (state) => ({
      ...state,
      columnGraph: {
        ...state.columnGraph,
        isLoading: false,
        isSuccess: false,
        isError: true,
        data: [],
      },
    }),
    getAllSupplierGraph: (state) => ({
      ...state,
      allSuppliers: {
        ...state.allSuppliers,
        isLoading: true,
        isSuccess: false,
        isError: false,
      },
    }),
    getAllSupplierGraphSuccess: (state, action) => ({
      ...state,
      allSuppliers: {
        ...state.allSuppliers,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: action.payload.data.data ?? [],
      },
    }),
    getAllSupplierGraphFailed: (state) => ({
      ...state,
      allSuppliers: {
        ...state.allSuppliers,
        isLoading: false,
        isSuccess: false,
        isError: true,
        data: [],
      },
    }),
    getComparisonGraph: (state) => ({
      ...state,
      comparison: {
        ...state.comparison,
        isLoading: true,
        isSuccess: false,
        isError: false,
      },
    }),
    getComparisonGraphSuccess: (state, action) => ({
      ...state,
      comparison: {
        ...state.comparison,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: action.payload.data.data ?? {},
      },
    }),
    getComparisonGraphFailed: (state) => ({
      ...state,
      comparison: {
        ...state.comparison,
        isLoading: false,
        isSuccess: false,
        isError: true,
        data: {},
      },
    }),
  },
});

export const {
  getLineGraph,
  getLineGraphFailed,
  getLineGraphSuccess,
  getColumnGraph,
  getColumnGraphFailed,
  getColumnGraphSuccess,
  getAllSupplierGraph,
  getAllSupplierGraphFailed,
  getAllSupplierGraphSuccess,
  getComparisonGraph,
  getComparisonGraphFailed,
  getComparisonGraphSuccess,
} = DashboardSlicer.actions;

export default DashboardSlicer.reducer;
