import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from './reducer';

function HelloWorld() {
  const { value, dBData } = useSelector((state) => state.helloWorldReducer);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  // const electron = window.require('electron');
  console.log(window);
  return (
    <div>
      <h1>{value}</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="button" onClick={() => dispatch(changeValue(text))}>
        Submit
      </button>
      <p>DB Value{JSON.stringify(dBData)}</p>
    </div>
  );
}

export default HelloWorld;
