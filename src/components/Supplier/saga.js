/* eslint-disable no-param-reassign */
import { put } from 'redux-saga/effects';
import { notification } from 'antd';
import {
  getSupplierFailed,
  getSupplierSuccess,
  addSupplierFailed,
  addSupplierSuccess,
  editSupplierFailed,
  editSupplierSuccess,
  getSupplier,
} from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function getSupplierDb(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('supplier-fetch-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('supplier-fetch-message', payload);
  });
}
function addSupplier(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('supplier-create-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('supplier-create-message', payload);
  });
}
function updateSupplier(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('supplier-update-reply', (_, arg) => {
      resolve(arg);
    });
    const arg = {
      where: {
        id: payload.id,
      },
    };
    delete payload.id;
    delete payload.updatedAt;
    delete payload.createdAt;
    arg.values = { ...payload };
    ipcRenderer.send('supplier-update-message', arg);
  });
}

function* supplierSaga(action) {
  try {
    const response = yield getSupplierDb(action.payload);
    if (!response.error) yield put(getSupplierSuccess(response));
    else yield put(getSupplierFailed(response));
  } catch (error) {
    yield put(getSupplierFailed({ message: error.message }));
  }
}
function* supplierAddSaga(action) {
  try {
    const response = yield addSupplier(action.payload);
    if (!response.error) {
      yield put(addSupplierSuccess(response));
      yield put(getSupplier());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(addSupplierFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(addSupplierFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
function* supplierUpdateSaga(action) {
  try {
    const response = yield updateSupplier(action.payload);
    if (!response.error) {
      yield put(editSupplierSuccess(response));
      yield put(getSupplier());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(editSupplierFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(editSupplierFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
export { supplierSaga, supplierAddSaga, supplierUpdateSaga };
