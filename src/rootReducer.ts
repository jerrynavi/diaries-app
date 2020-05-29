import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/auth/userSlice';
import diariesReducer from './features/diary/diariesSlice';
import entriesReducer from './features/entry/entriesSlice';
import editorReducer from './features/entry/editorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  diaries: diariesReducer,
  entries: entriesReducer,
  user: userReducer,
  editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
