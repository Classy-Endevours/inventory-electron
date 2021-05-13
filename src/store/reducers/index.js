import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../../components/Login/reducer';
import ItemsReducer from '../../components/Item/reducer';
import SupplierReducer from '../../components/Supplier/reducer';

const reducer = combineReducers({
  loginReducer,
  ItemsReducer,
  SupplierReducer,
});
export default reducer;
