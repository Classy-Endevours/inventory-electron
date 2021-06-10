/* eslint-disable no-param-reassign */
import { put } from 'redux-saga/effects';
import {
  getLineGraphFailed,
  getLineGraphSuccess,
  getColumnGraphFailed,
  getColumnGraphSuccess,
  getAllSupplierGraphFailed,
  getAllSupplierGraphSuccess,
} from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function getLineGraphFromDB(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('report-items-fetch-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('report-items-fetch-message', payload);
  });
}

function* lineGraphSaga(action) {
  try {
    const response = yield getLineGraphFromDB(action.payload);
    if (!response.error) yield put(getLineGraphSuccess(response));
    else yield put(getLineGraphFailed(response));
  } catch (error) {
    yield put(getLineGraphFailed({ message: error.message }));
  }
}

function getColumnGraphFromDB(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('report-inventory-in-out-fetch-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('report-inventory-in-out-fetch-message', payload);
  });
}

function* columnGraphSaga(action) {
  try {
    const response = yield getColumnGraphFromDB(action.payload);
    if (!response.error) yield put(getColumnGraphSuccess(response));
    else yield put(getColumnGraphFailed(response));
  } catch (error) {
    yield put(getColumnGraphFailed({ message: error.message }));
  }
}

function getAllSupplierFromDB(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('report-all-suppliers-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('report-all-suppliers', payload);
  });
}

function* allSupplierGraphSaga(action) {
  try {
    const response = yield getAllSupplierFromDB(action.payload);
    if (!response.error) yield put(getAllSupplierGraphSuccess(response));
    else yield put(getAllSupplierGraphFailed(response));
  } catch (error) {
    yield put(getAllSupplierGraphFailed({ message: error.message }));
  }
}
export { lineGraphSaga, columnGraphSaga, allSupplierGraphSaga };

export default {};
