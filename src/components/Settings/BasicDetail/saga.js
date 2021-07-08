/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { put } from 'redux-saga/effects';
import { notification } from 'antd';
import {
  updateSettingSuccess,
  updateSettingFail,
  getSettingFail,
  getSettingSuccess,
  addSettingsSuccess,
  getSetting,
  addSettingsFailed,
  defaultSettingsSuccess,
  defaultSettingsFailed,
  getDefaultSettingSuccess,
  getDefaultSettingFail,
  getDefaultSetting,
} from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;
// const { ipcRenderer } = require('electron');

function updateBasicDetails(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('settings-update-reply', (_, arg) => {
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
    ipcRenderer.send('settings-update-message', arg);
  });
}
function defaultBasicDetails(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('settings-default-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('settings-default-message', payload);
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
function addBasicDetails(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('settings-create-reply', (_, arg) => {
      resolve(arg);
    });
    payload.isDefault = false;
    ipcRenderer.send('settings-create-message', payload);
  });
}
function* updateBasicDetailsSaga(action) {
  try {
    const response = yield updateBasicDetails(action.payload);
    if (!response.error) {
      yield put(updateSettingSuccess(response));
      yield put(getSetting());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(updateSettingFail(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(updateSettingFail({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
function* getBasicDetailsSaga() {
  try {
    const response = yield getBasicDetails();
    if (!response.error) yield put(getSettingSuccess(response));
    else yield put(getSettingFail(response));
  } catch (error) {
    yield put(getSettingFail({ message: error.message }));
  }
}
function* settingsAddSaga(action) {
  try {
    const response = yield addBasicDetails(action.payload);
    if (!response.error) {
      yield put(addSettingsSuccess(response));
      yield put(getSetting());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(addSettingsFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(addSettingsFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
function* settingsDefaultSaga(action) {
  try {
    const response = yield defaultBasicDetails(action.payload);
    if (!response.error) {
      yield put(defaultSettingsSuccess(response));
      yield put(getSetting());
      yield put(getDefaultSetting());
      notification.success({
        message: 'Success',
        description: response.message,
        duration: 2,
      });
    } else {
      yield put(defaultSettingsFailed(response));
      notification.error({
        message: 'Error',
        description: response.message,
        duration: 2,
      });
    }
  } catch (error) {
    yield put(defaultSettingsFailed({ message: error.message }));
    notification.error({
      message: 'Error',
      description: error.message,
      duration: 2,
    });
  }
}
function* getDefaultBasicDetailsSaga(action) {
  try {
    const response = yield getBasicDetails(action.payload);
    if (!response.error) yield put(getDefaultSettingSuccess(response));
    else yield put(getDefaultSettingFail(response));
  } catch (error) {
    yield put(getDefaultSettingFail({ message: error.message }));
  }
}
export {
  getBasicDetailsSaga,
  updateBasicDetailsSaga,
  settingsAddSaga,
  settingsDefaultSaga,
  getDefaultBasicDetailsSaga,
};
