import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import watcherSaga from './sagas';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({ thunk: false }).prepend(logger),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(watcherSaga);

export default store;
