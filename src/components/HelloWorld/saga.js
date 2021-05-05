/* eslint-disable import/no-extraneous-dependencies */
import { put } from 'redux-saga/effects';
import { setValue } from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;
// const { ipcRenderer } = require('electron');

function dbCall() {
  return new Promise((resolve) => {
    ipcRenderer.once('asynchronous-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('asynchronous-message');
  });
}
export default function* changeValueSaga() {
  const response = yield dbCall();
  // console.log(response);
  yield put(setValue(response));
}
