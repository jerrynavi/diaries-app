import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../rootReducer';
import Markdown from 'markdown-to-jsx';
import http from '../../services/api';
import { Entry } from '../../interfaces/entry.interface';
import { Diary } from '../../interfaces/diary.interface';
import Swal from 'sweetalert2';
import {
  setCurrentlyEditing,
  setLoading,
  setIsEditing,
} from '../../app/appSlice';
import { updateDiary } from '../diary/diariesSlice';
import { addEntry, updateEntry } from './entriesSlice';

const Editor: FC = () => {
  const {
    currentlyEditing: entry,
    isEditing,
    loading,
    activeDiaryId,
  } = useSelector((state: RootState) => state.app);

  const [editedEntry, updateEditedEntry] = useState(entry);
  const dispatch = useDispatch();

  const saveEntry = async () => {
    if (activeDiaryId === null) {
      return Swal.fire({
        titleText: 'Please select a diary.',
        toast: true,
        icon: 'warning',
        position: 'top-end',
      });
    }
    dispatch(setLoading(true));
    if (entry === null) {
      http
        .post<Entry, { diary: Diary; entry: Entry }>(
          `/diaries/entry/${activeDiaryId}`,
          editedEntry
        )
        .then((data) => {
          if (data !== null) {
            const { diary, entry: _entry } = data;
            dispatch(setCurrentlyEditing(_entry));
            dispatch(addEntry(_entry));
            dispatch(updateDiary(diary));
          }
        });
    } else {
      http
        .put<Entry, Entry>(`diaries/entry/${entry.id}`, editedEntry)
        .then((_entry) => {
          if (_entry !== null) {
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateEntry(_entry));
          }
        });
    }
    dispatch(setIsEditing(false));
    dispatch(setLoading(false));
  };

  return (
    <div className="editor">
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '0.3em',
        }}
      >
        {!isEditing ? (
          <h4>{entry?.title ?? 'New Entry...'}</h4>
        ) : (
          <input
            value={entry?.title}
            disabled={loading}
            onChange={(e) => {
              if (editedEntry) {
                updateEditedEntry({
                  ...editedEntry,
                  title: e.target.value,
                });
              } else {
                updateEditedEntry({
                  title: e.target.value,
                  content: '',
                });
              }
            }}
          />
        )}
      </header>
      {entry && !isEditing ? (
        <Markdown>{entry.content}</Markdown>
      ) : (
        <>
          <textarea
            placeholder="Supports markdown!"
            value={entry?.content}
            onChange={(e) => {
              if (editedEntry) {
                updateEditedEntry({
                  ...editedEntry,
                  content: e.target.value,
                });
              } else {
                updateEditedEntry({
                  title: '',
                  content: e.target.value,
                });
              }
            }}
          />
          <button onClick={saveEntry} disabled={!isEditing}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default Editor;
