import React, { FC, useState } from 'react';
import { Diary } from '../../interfaces/diary.interface';
import http from '../../services/api';
import { updateDiary } from './diariesSlice';
import { useDispatch } from 'react-redux';
import {
  setIsEditing,
  setActiveDiaryId,
  setCurrentlyEditing,
} from '../../app/appSlice';
import { showAlert } from '../../util';

interface Props {
  diary: Diary;
}

const buttonStyle: React.CSSProperties = {
  fontSize: '0.7em',
  margin: '0 0.5em',
};

const DiaryTile: FC<Props> = (props) => {
  const [diary, setDiary] = useState(props.diary);
  const [canEdit, setCanEdit] = useState(false);
  const dispatch = useDispatch();

  const totalEntries = props.diary?.entryIds?.length;

  const saveChanges = () => {
    http
      .put<Diary, Diary>(`/diaries/${diary.id}`, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
          showAlert('Saved!', 'success');
        }
      })
      .finally(() => {
        setCanEdit(false);
      });
  };

  return (
    <div className="diary-tile">
      <h2
        className="title"
        title="Click to edit"
        onClick={() => setCanEdit(true)}
        style={{
          cursor: 'pointer',
        }}
      >
        {canEdit ? (
          <input
            value={diary.title}
            onChange={(e) => {
              setDiary({
                ...diary,
                title: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                saveChanges();
              }
            }}
          />
        ) : (
          <span>{diary.title}</span>
        )}
      </h2>
      <p className="subtitle">{totalEntries ?? '0'} saved entries</p>

      <div style={{ display: 'flex' }}>
        <button
          style={buttonStyle}
          onClick={() => {
            dispatch(setIsEditing(true));
            dispatch(setActiveDiaryId(diary.id as string));
            dispatch(setCurrentlyEditing(null));
          }}
        >
          Add New Entry
        </button>
        <button className="secondary" style={buttonStyle}>
          View all &rarr;
        </button>
      </div>
    </div>
  );
};

export default DiaryTile;
