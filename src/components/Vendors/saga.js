/* eslint-disable no-param-reassign */
import { put } from 'redux-saga/effects';
import { notification } from 'antd';
import {
  getVendorFailed,
  getVendorSuccess,
  addVendorFailed,
  addVendorSuccess,
  editVendorFailed,
  editVendorSuccess,
  getVendor,
} from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function getVendorDb(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('vendor-fetch-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('vendor-fetch-message', payload);
  });
}
function addVendor(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('vendor-create-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('vendor-create-message', payload);
  });
}
function updateVendor(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('vendor-update-reply', (_, arg) => {
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
    ipcRenderer.send('vendor-update-message', arg);
  });
}

function* vendorsSaga(action) {
  try {
    const response = yield getVendorDb(action.payload);
    if (!response.error) yield put(getVendorSuccess(response));
    else yield put(getVendorFailed(response));
  } catch (error) {
    yield put(getVendorFailed({ message: error.message }));
  }
}
function* vendorsAddSaga(action) {
  try {
    const response = yield addVendor(action.payload);
    if (!response.error) {
      yield put(addVendorSuccess(response));
      yield put(getVendor());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(addVendorFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(addVendorFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
function* vendorsUpdateSaga(action) {
  try {
    const response = yield updateVendor(action.payload);
    if (!response.error) {
      yield put(editVendorSuccess(response));
      yield put(getVendor());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(editVendorFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(editVendorFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
export { vendorsSaga, vendorsAddSaga, vendorsUpdateSaga };
