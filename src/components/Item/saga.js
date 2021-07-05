/* eslint-disable no-param-reassign */
import { put } from 'redux-saga/effects';
import { notification } from 'antd';
import {
  getItemsFailed,
  getItemsSuccess,
  addItemsFailed,
  addItemsSuccess,
  editItemsFailed,
  editItemsSuccess,
  getItems,
} from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function getItemsDb(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('items-fetch-reply', (_, arg) => {
      console.log({ arg });
      resolve(arg);
    });
    ipcRenderer.send('items-fetch-message', payload);
  });
}
function addItem(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('items-create-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('items-create-message', payload);
  });
}
function updateItem(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('items-update-reply', (_, arg) => {
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
    ipcRenderer.send('items-update-message', arg);
  });
}

function* itemsSaga(action) {
  try {
    const response = yield getItemsDb(action.payload);
    if (!response.error) yield put(getItemsSuccess(response));
    else yield put(getItemsFailed(response));
  } catch (error) {
    yield put(getItemsFailed({ message: error.message }));
  }
}
function* itemsAddSaga(action) {
  try {
    const response = yield addItem(action.payload);
    if (!response.error) {
      yield put(addItemsSuccess(response));
      yield put(getItems());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(addItemsFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(addItemsFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
function* itemsUpdateSaga(action) {
  try {
    const response = yield updateItem(action.payload);
    if (!response.error) {
      yield put(editItemsSuccess(response));
      yield put(getItems());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(editItemsFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(editItemsFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
export { itemsSaga, itemsAddSaga, itemsUpdateSaga };
