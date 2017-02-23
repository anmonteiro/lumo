import React from 'react';
import Site from '../components/Site';
import Container from '../components/Container';
import Doc from '../components/Doc';
import DocsSidebar from '../components/DocsSidebar';

export default ({ metadata, children, ...props }) => {
  const content = children;

  return (
    <Site
      className="sideNavVisible"
      section="docs"
      title={metadata.title}
      description={content.trim().split('\n')[0]}
    >
      <div className="docMainWrapper wrapper">
        <DocsSidebar metadata={metadata} />
        <Container className="mainContainer">
          <Doc
            content={content}
            source={metadata.source}
            title={metadata.title}
          />
          <div className="docs-prevnext">
            {metadata.previous &&
              <a
                className="docs-prev button"
                href={`${metadata.previous}.html#content`}
              >
                ← Previous
              </a>}
            {metadata.next &&
              <a
                className="docs-next button"
                href={`${metadata.next}.html#content`}
              >
                Continue Reading →
              </a>}
          </div>
        </Container>
      </div>
    </Site>
  );
};
