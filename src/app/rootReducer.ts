import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import authReducer from '../features/auth/authSlice';
import diariesReducer from '../features/diary/diariesSlice';
import diaryEntriesSlice from '../features/diary-entry/diaryEntriesSlice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  diaries: diariesReducer,
  diaryEntries: diaryEntriesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
