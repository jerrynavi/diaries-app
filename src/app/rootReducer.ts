import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import authReducer from '../features/auth/authSlice';
import diariesReducer from '../features/diary/diariesSlice';
import entriesSlice from '../features/entry/entriesSlice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  diaries: diariesReducer,
  entries: entriesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
