import React from 'react';
import Site from '../components/Site';
import Container from '../components/Container';
import Doc from '../components/Doc';
import DocsSidebar from '../components/DocsSidebar';

export default ({ metadata, children }) => {
  const content = children;
  return (
    <Site
      className="sideNavVisible"
      section="docs"
      title={metadata.title}
      description={content.trim().split('\n')[0]}
    >
      <div className="docMainWrapper wrapper">
        <DocsSidebar
          metadata={metadata}
          title="API"
          root="/jest/docs/api.html"
          layout="reference"
        />
        <Container className="mainContainer referenceContainer">
          <Doc
            content={content}
            source={metadata.source}
            title={metadata.title}
          />
        </Container>
      </div>
    </Site>
  );
};
