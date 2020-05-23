import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/auth/userSlice';
import diariesReducer from '../features/diary/diariesSlice';
import entriesReducer from '../features/entry/entriesSlice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  diaries: diariesReducer,
  entries: entriesReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
