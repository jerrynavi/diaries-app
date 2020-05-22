import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Diary } from '../../interfaces/diary.interface';

const initialDiariesState: Diary[] = [];

const diaries = createSlice({
  name: 'diaries',
  initialState: initialDiariesState,
  reducers: {
    addDiary(state: Diary[], { payload }: PayloadAction<Diary>) {
      state.push(payload);
    },
    updateDiary(
      state: Diary[],
      { payload }: PayloadAction<{ diary: Diary; id: number }>
    ) {
      const { id, diary } = payload;
      state.splice(id, 1, diary);
    },
    deleteDiary(state: Diary[], { payload }: PayloadAction<number>) {
      state.splice(payload, 1);
    },
  },
});

export const { addDiary, updateDiary, deleteDiary } = diaries.actions;

export default diaries.reducer;
