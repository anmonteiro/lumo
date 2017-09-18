import React from 'react';
import classNames from 'classnames';
import Site from '../components/Site';
import Container from '../components/Container';
import Doc from '../components/Doc';
import DocsSidebar from '../components/DocsSidebar';

import { docMainWrapper, prevnext, prev, next } from './DocsLayout.scss';
import { button } from '../components/Button.scss';

export default ({ metadata, children, ...props }) => {
  const content = children;

  return (
    <Site
      className="sideNavVisible"
      section="docs"
      title={metadata.title}
      description={content.trim().split('\n')[0]}
    >
      <div className={classNames(docMainWrapper, 'wrapper')}>
        <DocsSidebar metadata={metadata} />
        <Container className="mainContainer">
          <Doc
            content={content}
            source={metadata.source}
            title={metadata.title}
          />
          <div className={prevnext}>
            {metadata.previous && (
              <a
                className={classNames(prev, button)}
                href={`${metadata.previous}.html#content`}
              >
                ← Previous
              </a>
            )}
            {metadata.next && (
              <a
                className={classNames(next, button)}
                href={`${metadata.next}.html#content`}
              >
                Continue Reading →
              </a>
            )}
          </div>
        </Container>
      </div>
    </Site>
  );
};
