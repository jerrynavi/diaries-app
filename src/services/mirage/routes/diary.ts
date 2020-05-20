import { Response, Request } from 'miragejs';
import { handleErrors } from '../server';
import { Diary } from '../../../interfaces/diary.interface';
import { DiaryEntry } from '../../../interfaces/diary-entry.interface';

export const create = (schema: any, req: Request): Diary | Response => {
  try {
    const { title, type, userId } = JSON.parse(req.requestBody) as Partial<
      Diary
    >;
    const diary = schema.diaries.create({
      title,
      type,
      userId,
    });
    return diary.attrs as Diary;
  } catch (error) {
    return handleErrors(error, 'Failed to create Diary.');
  }
};

export const addEntry = (schema: any, req: Request): DiaryEntry | Response => {
  try {
    const diary = schema.diaries.find(parseInt(req.params.id));
    const { title, content } = JSON.parse(req.requestBody) as Partial<
      DiaryEntry
    >;
    const entry = diary.createDiaryEntry({
      title,
      content,
    });
    return entry.attrs as DiaryEntry;
  } catch (error) {
    return handleErrors(error, 'Failed to save entry.');
  }
};

export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
  try {
    const user = schema.users.find(parseInt(req.params.id));
    return user.diaries as Diary[];
  } catch (error) {
    return handleErrors(error, 'Could not get user diaries.');
  }
};

export const getEntries = (
  schema: any,
  req: Request
): DiaryEntry[] | Response => {
  try {
    const diary = schema.diaries.find(parseInt(req.params.id));
    return diary.entries as DiaryEntry[];
  } catch (error) {
    return handleErrors(error, 'Failed to get Diary entries.');
  }
};

export const updateDiary = (schema: any, req: Request): Diary | Response => {
  try {
    const diary = schema.diaries.find(parseInt(req.params.id));
    const data = JSON.parse(req.requestBody) as Partial<Diary>;
    diary.update({
      ...data,
    });
    return diary.attrs as Diary;
  } catch (error) {
    return handleErrors(error, 'Failed to update Diary.');
  }
};

export const updateEntry = (
  schema: any,
  req: Request
): DiaryEntry | Response => {
  try {
    const diaryEntry = schema.diaryEntries.find(parseInt(req.params.id));
    const data = JSON.parse(req.requestBody) as Partial<DiaryEntry>;
    diaryEntry.update({
      ...data,
    });
    return diaryEntry.attrs as DiaryEntry;
  } catch (error) {
    return handleErrors(error, 'Failed to update entry.');
  }
};
