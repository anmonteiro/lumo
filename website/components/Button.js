import React from 'react';

import { button } from './Button.scss';

export default ({ href, className, target = '_self', children }) => (
  <div className={className}>
    <a className={button} href={href} target={target}>
      {children}
    </a>
  </div>
);
