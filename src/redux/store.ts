import {configureStore} from '@reduxjs/toolkit';
import RootReducer from './RootReducer';
import logger from 'redux-logger';

export const Store = configureStore({
  // combined된 여러개의 리듀서를 store에 저장합니다.
  reducer: RootReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
