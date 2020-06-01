import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Diary } from '../../interfaces/diary.interface';

const diaries = createSlice({
  name: 'diaries',
  initialState: [] as Diary[],
  reducers: {
    addDiary(state, { payload }: PayloadAction<Diary[]>) {
      const diariesToSave = payload.filter((diary) => {
        return state.findIndex((item) => item.id === diary.id) === -1;
      });
      state.push(...diariesToSave);
    },
    updateDiary(state, { payload }: PayloadAction<Diary>) {
      const { id } = payload;
      const diaryIndex = state.findIndex((diary) => diary.id === id);
      if (diaryIndex !== -1) {
        state.splice(diaryIndex, 1, payload);
      }
    },
  },
});

export const { addDiary, updateDiary } = diaries.actions;

export default diaries.reducer;
