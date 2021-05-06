import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../../components/Login/reducer';

const reducer = combineReducers({ loginReducer });
export default reducer;
