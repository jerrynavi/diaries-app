import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../../interfaces/entry.interface';

const entriesInitialState: Entry[] = [];

const entries = createSlice({
  name: 'entries',
  initialState: entriesInitialState,
  reducers: {
    addEntry(state: Entry[], { payload }: PayloadAction<Entry>) {
      state.push(payload);
    },
    removeEntry(state: Entry[], { payload }: PayloadAction<{ id: number }>) {
      state.splice(payload.id, 1);
    },
    updateEntry(state: Entry[], { payload }: PayloadAction<Entry>) {
      const { id, ...rest } = payload;
      let entry = state.find((d) => d.id === id);
      if (entry) {
        entry = {
          ...entry,
          ...rest,
        };
        state.splice(id, 1, entry);
      }
    },
  },
});

export const { addEntry, removeEntry, updateEntry } = entries.actions;

export default entries.reducer;
