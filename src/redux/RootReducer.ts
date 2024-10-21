import {combineReducers} from '@reduxjs/toolkit';
import User from './slice/userSlice';
import Navigation from './slice/navigationSlice';

/**
 * 애플리케이션에서 목적에 따라 리듀서를 분리하여 관리 합니다.
 */
const RootReducer = combineReducers({
  UserReducer: User,
  NavigationReducer: Navigation,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
