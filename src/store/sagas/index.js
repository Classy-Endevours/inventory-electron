import { takeLatest } from 'redux-saga/effects';
import { login } from '../../components/Login/reducer';
import loginSaga from '../../components/Login/saga';

import {
  itemsSaga,
  itemsAddSaga,
  itemsUpdateSaga,
} from '../../components/Item/saga';
import { getItems, addItems, editItems } from '../../components/Item/reducer';

export default function* watcherSagas() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(getItems.type, itemsSaga);
  yield takeLatest(addItems.type, itemsAddSaga);
  yield takeLatest(editItems.type, itemsUpdateSaga);
}
