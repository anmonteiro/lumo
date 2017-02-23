import React from 'react';
import RedirectLayout from '../layout/RedirectLayout';

export default () => {
  const metadata = {
    id: 'support',
    layout: 'redirect',
    permalink: '/jest/support.html',
    destinationUrl: 'help.html',
    source: 'support.md',
  };
  return <RedirectLayout metadata={metadata} />;
};
