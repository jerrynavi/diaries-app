import React, { FC, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../rootReducer';
import http from '../../services/api';
import { Entry } from '../../interfaces/entry.interface';
import { setEntries } from '../entry/entriesSlice';
import { setCurrentlyEditing, setCanEdit } from '../entry/editorSlice';

const DiaryEntries: FC = () => {
  const { entries } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id !== null) {
      http
        .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            dispatch(setEntries(_entries));
          }
        });
    }
  }, [id, dispatch]);

  return (
    <div className="entries">
      <header>
        <Link to="/">
          <h3>&larr; Go Back</h3>
        </Link>
      </header>
      <ul>
        {entries.map((entry) => (
          <li
            key={entry.id}
            onClick={() => {
              dispatch(setCurrentlyEditing(entry));
              dispatch(setCanEdit(true));
            }}
          >
            {entry.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryEntries;
