import { User } from './user.interface';
import { Diary } from './diary.interface';

export interface AppState {
  auth: {
    token: string | null;
    isAuthenticated: boolean;
  };
  user: User | null;
  diaries: Diary[] | null;
  app: {
    loading: boolean;
    currentLocation: string;
  };
}
