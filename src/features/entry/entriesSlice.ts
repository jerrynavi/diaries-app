import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../../interfaces/entry.interface';

const entries = createSlice({
  name: 'entries',
  initialState: [] as Entry[],
  reducers: {
    addEntry(state, { payload }: PayloadAction<Entry>) {
      state.push(payload);
    },
    removeEntry(state, { payload }: PayloadAction<number>) {
      state.splice(payload, 1);
    },
    updateEntry(state, { payload }: PayloadAction<Entry>) {
      const { id, ...rest } = payload;
      let index = state.findIndex((e) => e.id === id);
      if (index !== -1) {
        const entry: Entry = {
          ...state[index],
          ...rest,
        };
        state.splice(index, 1, entry);
      }
    },
  },
});

export const { addEntry, removeEntry, updateEntry } = entries.actions;

export default entries.reducer;
