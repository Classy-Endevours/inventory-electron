/* eslint-disable no-param-reassign */
import { put } from 'redux-saga/effects';
import { notification } from 'antd';
import {
  getInventoryOutsFailed,
  getInventoryOutsSuccess,
  addInventoryOutsFailed,
  addInventoryOutsSuccess,
  editInventoryOutsFailed,
  editInventoryOutsSuccess,
  getInventoryOuts,
} from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function getInventoryOutsDb(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('inventoryOut-fetch-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('inventoryOut-fetch-message', payload);
  });
}
function addInventoryIn(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('inventoryOut-create-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('inventoryOut-create-message', payload);
  });
}
function updateInventoryIn(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('inventoryOut-update-reply', (_, arg) => {
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
    ipcRenderer.send('inventoryOut-update-message', arg);
  });
}

function* inventoryOutSaga(action) {
  try {
    const response = yield getInventoryOutsDb(action.payload);
    if (!response.error) yield put(getInventoryOutsSuccess(response));
    else yield put(getInventoryOutsFailed(response));
  } catch (error) {
    yield put(getInventoryOutsFailed({ message: error.message }));
  }
}
function* inventoryOutAddSaga(action) {
  try {
    const response = yield addInventoryIn(action.payload);
    if (!response.error) {
      yield put(addInventoryOutsSuccess(response));
      yield put(getInventoryOuts());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(addInventoryOutsFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(addInventoryOutsFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
function* inventoryOutUpdateSaga(action) {
  try {
    const response = yield updateInventoryIn(action.payload);
    if (!response.error) {
      yield put(editInventoryOutsSuccess(response));
      yield put(getInventoryOuts());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(editInventoryOutsFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(editInventoryOutsFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
export { inventoryOutSaga, inventoryOutAddSaga, inventoryOutUpdateSaga };
