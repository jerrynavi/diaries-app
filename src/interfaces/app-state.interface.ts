import { User } from './user.interface';
import { Diary } from './diary.interface';
import { DiaryEntry } from './diary-entry.interface';

export interface AppState {
  auth: {
    token: string | null;
    isAuthenticated: boolean;
  };
  user: User | null;
  diaries: Diary[] | null;
  diaryEntries: DiaryEntry[];
  app: {
    loading: boolean;
    currentLocation: string;
  };
}
