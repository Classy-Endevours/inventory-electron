import { takeLatest } from 'redux-saga/effects';
import { login } from '../../components/Login/reducer';
import loginSaga from '../../components/Login/saga';

import {
  itemsSaga,
  itemsAddSaga,
  itemsUpdateSaga,
} from '../../components/Item/saga';
import {
  supplierSaga,
  supplierAddSaga,
  supplierUpdateSaga,
} from '../../components/Supplier/saga';
import {
  vendorsSaga,
  vendorsAddSaga,
  vendorsUpdateSaga,
} from '../../components/Vendors/saga';
import {
  inventoryInSaga,
  inventoryInAddSaga,
  inventoryInUpdateSaga,
} from '../../components/inventoryIn/saga';
import {
  inventoryOutSaga,
  inventoryOutAddSaga,
  inventoryOutUpdateSaga,
} from '../../components/inventoryOut/saga';
import { getItems, addItems, editItems } from '../../components/Item/reducer';
import {
  getSupplier,
  addSupplier,
  editSupplier,
} from '../../components/Supplier/reducer';
import {
  getVendor,
  addVendor,
  editVendor,
} from '../../components/Vendors/reducer';
import {
  getInventoryIns,
  addInventoryIns,
  editInventoryIns,
} from '../../components/inventoryIn/reducer';
import {
  getInventoryOuts,
  addInventoryOuts,
  editInventoryOuts,
} from '../../components/inventoryOut/reducer';
import {
  updateSetting,
  getSetting,
  addSettings,
  defaultSettings,
} from '../../components/Settings/BasicDetail/reducer';
import {
  updateBasicDetailsSaga,
  getBasicDetailsSaga,
  settingsAddSaga,
  settingsDefaultSaga,
} from '../../components/Settings/BasicDetail/saga';
import {
  getChallan,
  editChallan,
  addChallan,
} from '../../components/Challan/reducer';
import {
  getChallanSaga,
  challanAddSaga,
  challanUpdateSaga,
} from '../../components/Challan/saga';
import {
  lineGraphSaga,
  columnGraphSaga,
  allSupplierGraphSaga,
  getComparisonGraphSaga,
} from '../../components/Dashboard/saga';
import {
  getLineGraph,
  getColumnGraph,
  getAllSupplierGraph,
  getComparisonGraph,
} from '../../components/Dashboard/reducer';

export default function* watcherSagas() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(getItems.type, itemsSaga);
  yield takeLatest(addItems.type, itemsAddSaga);
  yield takeLatest(editItems.type, itemsUpdateSaga);
  yield takeLatest(getSupplier.type, supplierSaga);
  yield takeLatest(addSupplier.type, supplierAddSaga);
  yield takeLatest(editSupplier.type, supplierUpdateSaga);
  yield takeLatest(getVendor.type, vendorsSaga);
  yield takeLatest(addVendor.type, vendorsAddSaga);
  yield takeLatest(editVendor.type, vendorsUpdateSaga);
  yield takeLatest(getInventoryIns.type, inventoryInSaga);
  yield takeLatest(addInventoryIns.type, inventoryInAddSaga);
  yield takeLatest(editInventoryIns.type, inventoryInUpdateSaga);
  yield takeLatest(getInventoryOuts.type, inventoryOutSaga);
  yield takeLatest(addInventoryOuts.type, inventoryOutAddSaga);
  yield takeLatest(editInventoryOuts.type, inventoryOutUpdateSaga);
  yield takeLatest(getChallan.type, getChallanSaga);
  yield takeLatest(addChallan.type, challanAddSaga);
  yield takeLatest(editChallan.type, challanUpdateSaga);

  // dashboard sagas and reducers
  yield takeLatest(getLineGraph.type, lineGraphSaga);
  yield takeLatest(getColumnGraph.type, columnGraphSaga);
  yield takeLatest(getAllSupplierGraph.type, allSupplierGraphSaga);
  yield takeLatest(getComparisonGraph.type, getComparisonGraphSaga);

  // Setting Sagas
  yield takeLatest(getSetting.type, getBasicDetailsSaga);
  yield takeLatest(addSettings.type, settingsAddSaga);
  yield takeLatest(updateSetting.type, updateBasicDetailsSaga);
  yield takeLatest(defaultSettings.type, settingsDefaultSaga);
}
