import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialAuthState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const auth = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    saveToken(state: AuthState, { payload }: PayloadAction<string>) {
      if (payload) {
        state.token = payload;
      }
    },
    clearToken(state: AuthState) {
      state.token = null;
    },
    toggleAuthState(state: AuthState) {
      state.isAuthenticated = !state.isAuthenticated;
    },
  },
});

export const { saveToken, clearToken, toggleAuthState } = auth.actions;

export default auth.reducer;
