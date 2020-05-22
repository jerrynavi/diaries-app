import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DiaryEntry } from '../../interfaces/diary-entry.interface';

const diaryEntriesInitState: DiaryEntry[] = [];

const diaryEntries = createSlice({
  name: 'diaryEntries',
  initialState: diaryEntriesInitState,
  reducers: {
    addEntry(state: DiaryEntry[], { payload }: PayloadAction<DiaryEntry>) {
      state.push(payload);
    },
    removeEntry(
      state: DiaryEntry[],
      { payload }: PayloadAction<{ id: number }>
    ) {
      state.splice(payload.id, 1);
    },
    updateEntry(state: DiaryEntry[], { payload }: PayloadAction<DiaryEntry>) {
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

export const { addEntry, removeEntry, updateEntry } = diaryEntries.actions;

export default diaryEntries.reducer;
