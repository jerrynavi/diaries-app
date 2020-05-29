import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../rootReducer';
import Markdown from 'markdown-to-jsx';
import http from '../../services/api';
import { Entry } from '../../interfaces/entry.interface';
import { Diary } from '../../interfaces/diary.interface';
import { setCurrentlyEditing, setCanEdit } from './editorSlice';
import { updateDiary } from '../diary/diariesSlice';
import { addEntry, updateEntry } from './entriesSlice';
import { showAlert } from '../../util';

const Editor: FC = () => {
  const { currentlyEditing: entry, canEdit, activeDiaryId } = useSelector(
    (state: RootState) => state.editor
  );

  const [editedEntry, updateEditedEntry] = useState(entry);
  const dispatch = useDispatch();

  const saveEntry = async () => {
    if (activeDiaryId === null) {
      return showAlert('Please select a diary.', 'warning');
    }
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
    dispatch(setCanEdit(false));
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
        {entry && !canEdit ? (
          <h4>{entry.title}</h4>
        ) : (
          <input
            value={entry?.title}
            disabled={!canEdit}
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
      {entry && !canEdit ? (
        <Markdown>{entry.content}</Markdown>
      ) : (
        <>
          <textarea
            disabled={!canEdit}
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
          <button onClick={saveEntry} disabled={!canEdit}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default Editor;
