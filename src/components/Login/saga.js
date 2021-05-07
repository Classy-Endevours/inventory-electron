/* eslint-disable import/no-extraneous-dependencies */
import { put } from 'redux-saga/effects';
import { loginSuccess, loginFail } from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;
// const { ipcRenderer } = require('electron');

function dbCall(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('login-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('login-message', payload);
  });
}
export default function* loginSaga(action) {
  try {
    const response = yield dbCall(action.payload);
    if (!response.error) yield put(loginSuccess(response));
    else yield put(loginFail(response));
  } catch (error) {
    yield put(loginFail({ message: error.message }));
  }
}
