import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { changeValue } from './reducer';

function HelloWorld() {
  const history = useHistory();
  const { value } = useSelector((state) => state.helloWorldReducer);
  const [text, setText] = useState('');
  // const dispatch = useDispatch();
  function handleClick() {
    history.push('/HelloWorld1');
  }
  return (
    <div>
      <h1>{value}</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {/* <button type="button" onClick={() => dispatch(changeValue(text))}> */}
      <button type="button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}

export default HelloWorld;
