import React, { FC } from 'react';
import DiariesList from '../diary/DiariesList';
import Editor from '../entry/Editor';

const Home: FC = () => {
  return (
    <div className="two-cols">
      <div className="left">
        <DiariesList />
      </div>
      <div className="right">
        <Editor />
      </div>
    </div>
  );
};

export default Home;
