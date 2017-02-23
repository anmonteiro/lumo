import React from 'react';
import Site from '../components/Site';
import Doc from '../components/Doc';
import Container from '../components/Container';

export default ({ metadata, children }) =>
  <Site section={metadata.section}>
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <Doc content={children} />
      </Container>
    </div>
  </Site>;
