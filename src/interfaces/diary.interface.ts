import { DiaryEntry } from './diary-entry.interface';

export interface Diary {
  id: number;
  title: string;
  entries: DiaryEntry[];
  type: 'private' | 'public';
  createdAt: string;
  updatedAt: string;
  userId?: number;
}
