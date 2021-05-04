import React from 'react';

export default function HeaderChips(props) {
  const style = {
    height: '100%',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid grey',
    padding: '8px',
  };
  // eslint-disable-next-line no-console
  // eslint-disable-next-line react/prop-types
  const { title, children } = props;
  return (
    <div style={style}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}
