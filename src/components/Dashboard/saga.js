/* eslint-disable no-param-reassign */
import { put } from 'redux-saga/effects';
import { getLineGraphFailed, getLineGraphSuccess } from './reducer';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function getLineGraphFromDB(payload) {
  return new Promise((resolve) => {
    ipcRenderer.once('report-items-fetch-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('report-items-fetch-message', payload);
  });
}

function* lineGraphSaga(action) {
  try {
    const response = yield getLineGraphFromDB(action.payload);
    if (!response.error) yield put(getLineGraphSuccess(response));
    else yield put(getLineGraphFailed(response));
  } catch (error) {
    yield put(getLineGraphFailed({ message: error.message }));
  }
}
export { lineGraphSaga };

export default {};
