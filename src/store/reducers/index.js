import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../../components/Login/reducer';
import ItemsReducer from '../../components/Item/reducer';

const reducer = combineReducers({ loginReducer, ItemsReducer });
export default reducer;
