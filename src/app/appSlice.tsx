import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../interfaces/entry.interface';

interface AppState {
  loading: boolean;
  isEditing: boolean;
  currentlyEditing: Entry | null;
  activeDiaryId: string | null;
}

const initialState: AppState = {
  loading: false,
  isEditing: false,
  currentlyEditing: null,
  activeDiaryId: null,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload !== null ? payload : !state.loading;
    },
    setIsEditing(state, { payload }: PayloadAction<boolean>) {
      state.isEditing = payload !== null ? payload : !state.isEditing;
    },
    setCurrentlyEditing(state, { payload }: PayloadAction<Entry | null>) {
      state.currentlyEditing = payload;
    },
    setActiveDiaryId(state, { payload }: PayloadAction<string>) {
      state.activeDiaryId = payload;
    },
  },
});

export const {
  setLoading,
  setIsEditing,
  setCurrentlyEditing,
  setActiveDiaryId,
} = app.actions;

export default app.reducer;
