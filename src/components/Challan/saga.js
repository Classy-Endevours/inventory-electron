/* eslint-disable no-param-reassign */
import { put } from 'redux-saga/effects';
import { notification } from 'antd';
import {
  getChallanFailed,
  getChallanSuccess,
  editChallanFailed,
  editChallanSuccess,
  addChallanSuccess,
  addChallanFailed,
} from './reducer';
import { getInventoryOuts } from '../inventoryOut/reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function getChallanDb(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('challan-fetch-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('challan-fetch-message', payload);
  });
}
function addChallan(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('challan-create-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('challan-create-message', payload);
  });
}
function updateChallan(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('challan-update-reply', (_, arg) => {
      resolve(arg);
    });
    const arg = {
      where: {
        id: payload.challan.id,
      },
    };

    delete payload.id;
    delete payload.updatedAt;
    delete payload.createdAt;
    payload = {
      itemId: payload.itemId,
      productName: payload.productName,
      inventoryOutId: payload.id,
      truckNo: payload.truckNo,
    };
    arg.values = { ...payload };
    ipcRenderer.send('challan-update-message', arg);
  });
}

function* getChallanSaga(action) {
  try {
    const response = yield getChallanDb(action.payload);
    if (!response.error) yield put(getChallanSuccess(response));
    else yield put(getChallanFailed(response));
  } catch (error) {
    yield put(getChallanFailed({ message: error.message }));
  }
}
function* challanAddSaga(action) {
  try {
    action.payload = {
      itemId: action.payload.itemId,
      productName: action.payload.productName,
      inventoryOutId: action.payload.id,
      truckNo: action.payload.truckNo,
      settingsId: action.payload.settingsId,
    };
    const response = yield addChallan(action.payload);
    if (!response.error) {
      yield put(addChallanSuccess());
      yield put(getInventoryOuts(response));
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(addChallanFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(addChallanFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
function* challanUpdateSaga(action) {
  try {
    const response = yield updateChallan(action.payload);
    if (!response.error) {
      yield put(editChallanSuccess(response));
      yield put(getInventoryOuts(response));
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(editChallanFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(editChallanFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
export { getChallanSaga, challanUpdateSaga, challanAddSaga };

export default {};
