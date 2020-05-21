export interface Diary {
  id: number;
  title: string;
  type: 'private' | 'public';
  createdAt: string;
  updatedAt: string;
  userId?: number;
}
