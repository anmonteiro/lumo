/* eslint-disable jsx-a11y/anchor-has-content */

import React from 'react';
import toSlug from './toSlug';

import { anchor, hashLink } from './Header.scss';

export default ({ level, children, ...props }) => {
  const slug = toSlug(props.toSlug || children);
  const Heading = `h${level}`;

  return (
    <Heading {...props}>
      <a className={anchor} name={slug} />
      {children}{' '}
      <a className={hashLink} href={`#${slug}`}>
        #
      </a>
    </Heading>
  );
};
