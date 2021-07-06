/* eslint-disable import/no-extraneous-dependencies */
import { put } from 'redux-saga/effects';
import {
  updateSettingSuccess,
  updateSettingFail,
  getSettingFail,
  getSettingSuccess,
} from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;
// const { ipcRenderer } = require('electron');

function updateBasicDetails(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('basicDetails-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('basicDetails-message', payload);
  });
}
function getBasicDetails(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('settings-fetch-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('settings-fetch-message', payload);
  });
}
export function* basicDetailsSaga(action) {
  try {
    const response = yield updateBasicDetails(action.payload);
    if (!response.error) yield put(updateSettingSuccess(response));
    else yield put(updateSettingFail(response));
  } catch (error) {
    yield put(updateSettingFail({ message: error.message }));
  }
}
export function* getBasicDetailsSaga() {
  try {
    const response = yield getBasicDetails();
    if (!response.error) yield put(getSettingSuccess(response));
    else yield put(getSettingFail(response));
  } catch (error) {
    yield put(getSettingFail({ message: error.message }));
  }
}
export default {
  getBasicDetailsSaga,
};
