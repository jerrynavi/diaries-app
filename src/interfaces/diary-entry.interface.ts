export interface DiaryEntry {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  diaryId?: number;
}
