import { takeLatest } from 'redux-saga/effects';
import { login } from '../../components/Login/reducer';
import loginSaga from '../../components/Login/saga';

import { itemsSaga, itemsAddSaga } from '../../components/Item/saga';
import { getItems, addItems } from '../../components/Item/reducer';

export default function* watcherSagas() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(getItems.type, itemsSaga);
  yield takeLatest(addItems.type, itemsAddSaga);
}
