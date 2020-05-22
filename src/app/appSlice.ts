import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  loading: boolean;
  currentLocation: string;
}

const initialAppState: AppState = {
  loading: false,
  currentLocation: '/',
};

const app = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    updateCurrentLocation(state, { payload }: PayloadAction<{ path: string }>) {
      if (payload.path) {
        state.currentLocation = payload.path;
      }
    },
  },
});

export const { toggleLoading, updateCurrentLocation } = app.actions;

export default app.reducer;
