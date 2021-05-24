/* eslint-disable no-param-reassign */
import { put } from 'redux-saga/effects';
import { notification } from 'antd';
import {
  getInventoryInsFailed,
  getInventoryInsSuccess,
  addInventoryInsFailed,
  addInventoryInsSuccess,
  editInventoryInsFailed,
  editInventoryInsSuccess,
  getInventoryIns,
} from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function getInventoryInsDb(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('inventoryIn-fetch-reply', (_, arg) => {
      console.log(arg);
      resolve(arg);
    });
    ipcRenderer.send('inventoryIn-fetch-message', payload);
  });
}
function addInventoryIn(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('inventoryIn-create-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('inventoryIn-create-message', payload);
  });
}
function updateInventoryIn(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('inventoryIn-update-reply', (_, arg) => {
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
    ipcRenderer.send('inventoryIn-update-message', arg);
  });
}

function* inventoryInSaga(action) {
  try {
    const response = yield getInventoryInsDb(action.payload);
    if (!response.error) yield put(getInventoryInsSuccess(response));
    else yield put(getInventoryInsFailed(response));
  } catch (error) {
    yield put(getInventoryInsFailed({ message: error.message }));
  }
}
function* inventoryInAddSaga(action) {
  try {
    const response = yield addInventoryIn(action.payload);
    if (!response.error) {
      yield put(addInventoryInsSuccess(response));
      yield put(getInventoryIns());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(addInventoryInsFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(addInventoryInsFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
function* inventoryInUpdateSaga(action) {
  try {
    const response = yield updateInventoryIn(action.payload);
    if (!response.error) {
      yield put(editInventoryInsSuccess(response));
      yield put(getInventoryIns());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(editInventoryInsFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(editInventoryInsFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
export { inventoryInSaga, inventoryInAddSaga, inventoryInUpdateSaga };
