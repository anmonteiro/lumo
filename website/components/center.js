import React from 'react';

export default ({ style, ...props }) => {
  const newStyle = Object.assign({}, style, { textAlign: 'center' });

  return (
    <div {...props} style={newStyle}>
      {props.children}
    </div>
  );
};
