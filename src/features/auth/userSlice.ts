import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/user.interface';

const user = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      return (state = payload);
    },
    clearUser(state) {
      if (state) {
        return (state = null);
      }
    },
  },
});

export const { setUser, clearUser } = user.actions;

export default user.reducer;
