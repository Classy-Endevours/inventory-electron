import { takeLatest } from 'redux-saga/effects';
import { login } from '../../components/Login/reducer';
import loginSaga from '../../components/Login/saga';

export default function* watcherSagas() {
  yield takeLatest(login.type, loginSaga);
}
