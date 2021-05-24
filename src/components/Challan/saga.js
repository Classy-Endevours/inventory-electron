/* eslint-disable no-param-reassign */
import { put } from 'redux-saga/effects';
import { getChallanFailed, getChallanSuccess } from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function getChallanDb(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('challan-fetch-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('challan-fetch-message', payload);
  });
}

function* getChallanSaga(action) {
  try {
    const response = yield getChallanDb(action.payload);
    if (!response.error) yield put(getChallanSuccess(response));
    else yield put(getChallanFailed(response));
  } catch (error) {
    yield put(getChallanFailed({ message: error.message }));
  }
}
export { getChallanSaga };

export default {};
