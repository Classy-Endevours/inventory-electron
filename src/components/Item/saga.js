import { put } from 'redux-saga/effects';
import {
  getItemsFailed,
  getItemsSuccess,
  addItemsFailed,
  addItemsSuccess,
} from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function getItems(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('items-fetch-reply', (_, arg) => {
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
function* itemsSaga(action) {
  try {
    const response = yield getItems(action.payload);
    if (!response.error) yield put(getItemsSuccess(response));
    else yield put(getItemsFailed(response));
  } catch (error) {
    yield put(getItemsFailed({ message: error.message }));
  }
}
function* itemsAddSaga(action) {
  try {
    const response = yield addItem(action.payload);
    if (!response.error) yield put(addItemsSuccess(response));
    else yield put(addItemsFailed(response));
  } catch (error) {
    yield put(addItemsFailed({ message: error.message }));
  }
}
export { itemsSaga, itemsAddSaga };
