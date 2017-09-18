import classnames from 'classnames';
import React from 'react';
import Marked from './Marked';

import { editPageLink } from './Doc.scss';
import { button } from './Button.scss';

export default ({ source, title, content }) => (
  <div className="post">
    <header className="postHeader">
      <a
        className={classnames(editPageLink, button)}
        href={`https://github.com/anmonteiro/lumo/edit/master/docs/${source}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Edit this Doc
      </a>
      <h1>{title}</h1>
    </header>
    <article>
      <Marked>{content}</Marked>
    </article>
  </div>
);
