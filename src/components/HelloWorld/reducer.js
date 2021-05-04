/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const helloWorldSlice = createSlice({
  name: 'helloWorld',
  initialState: {
    value: 'Hello World',
    dBData: {},
  },
  reducers: {
    changeValue: () => {},
    setValue: (state, action) => {
      return {
        ...state,
        dBData: action.payload,
      };
    },
  },
});

export const { changeValue, setValue } = helloWorldSlice.actions;

export default helloWorldSlice.reducer;
