import { DiaryEntry } from './diary-entry.interface';

export interface Diary {
  id: number;
  entries: DiaryEntry[];
  type: 'private' | 'public';
  createdAt: string;
  updatedAt: string;
  userId?: number;
}
