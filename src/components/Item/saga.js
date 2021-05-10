import { put } from 'redux-saga/effects';
import { getItemsFailed, getItemsSuccess } from './reducer';

// const electron = window.require('electron');
// const { ipcRenderer } = electron;

function dbCall() {
  return new Promise((resolve) => {
    const data = {
      items: [
        {
          id: '1',
          itemName: 'Sulphuric Acid',
          composition: '80%',
          percent: 0.01,
          hsnCode: '!SA##DD',
        },
        {
          id: '2',
          itemName: 'Merphic Acid',
          composition: '90%',
          percent: 0.11,
          hsnCode: '!aa##DD',
        },
        {
          id: '3',
          itemName: 'Vulgaric Acid',
          composition: '80%',
          percent: 0.01,
          hsnCode: '!SA77DD',
        },
        {
          id: '4',
          itemName: 'Vitamin Acid',
          composition: '20%',
          percent: 1,
          hsnCode: '!SA9292DD',
        },
        {
          id: '5',
          itemName: 'Sulphuric Acid',
          composition: '80%',
          percent: 0.01,
          hsnCode: '!SA##DD',
        },
        {
          id: '6',
          itemName: 'Merphic Acid',
          composition: '90%',
          percent: 0.11,
          hsnCode: '!aa##DD',
        },
        {
          id: '7',
          itemName: 'Vulgaric Acid',
          composition: '80%',
          percent: 0.01,
          hsnCode: '!SA77DD',
        },
        {
          id: '8',
          itemName: 'Vitamin Acid',
          composition: '20%',
          percent: 1,
          hsnCode: '!SA9292DD',
        },
      ],
      recentItems: [
        {
          id: 1,
          itemName: 'Sulphur',
          updatedAt: '29/04/2021',
          count: 10,
        },
        {
          id: 2,
          itemName: 'Sulphur',
          updatedAt: '29/04/2021',
          count: 9,
        },
        {
          id: 3,
          itemName: 'Sulphur',
          updatedAt: '29/04/2021',
          count: 11,
        },
        {
          id: 4,
          itemName: 'Sulphur',
          updatedAt: '29/04/2021',
          count: 117,
        },
      ],
      mostOutItems: [
        {
          id: 1,
          itemName: 'Sulphur',
          totalOutEarns: 100,
          lastWeekProgress: 10,
          updatedAt: '29/04/2021',
        },
        {
          id: 2,
          itemName: 'Sulphur',
          totalOutEarns: 90,
          lastWeekProgress: 10,
          updatedAt: '29/04/2021',
        },
        {
          id: 3,
          itemName: 'Sulphur',
          totalOutEarns: 80,
          lastWeekProgress: 0,
          updatedAt: '29/04/2021',
        },
        {
          id: 4,
          itemName: 'Sulphur',
          totalOutEarns: 70,
          lastWeekProgress: -10,
          updatedAt: '29/04/2021',
        },
      ],
      error: false,
    };
    resolve(data);
    // ipcRenderer.once('login-reply', (_, arg) => {
    //   resolve(arg);
    // });
    // ipcRenderer.send('login-message', payload);
  });
}
export default function* itemsSaga(action) {
  try {
    const response = yield dbCall(action.payload);
    if (!response.error) yield put(getItemsSuccess(response));
    else yield put(getItemsFailed(response));
  } catch (error) {
    yield put(getItemsFailed({ message: error.message }));
  }
}
