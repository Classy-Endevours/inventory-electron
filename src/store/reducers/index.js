import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../../components/Login/reducer';
import ItemsReducer from '../../components/Item/reducer';
import SupplierReducer from '../../components/Supplier/reducer';
import VendorReducer from '../../components/Vendors/reducer';
import InventoryInReducer from '../../components/inventoryIn/reducer';

const reducer = combineReducers({
  loginReducer,
  ItemsReducer,
  SupplierReducer,
  VendorReducer,
  InventoryInReducer,
});
export default reducer;
