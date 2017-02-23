import React from 'react';
import Header from './Header';

export default ({ children, ...props }) =>
  <Header {...props} level={2}>
    {children}
  </Header>;
