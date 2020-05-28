export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  diaryIds: string[] | null;
}
