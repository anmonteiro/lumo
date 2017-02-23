import React from 'react';

export default ({ metadata }) => {
  const destinationUrl = metadata.destinationUrl;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href={destinationUrl} />
        <meta httpEquiv="refresh" content={`0; url=${destinationUrl}`} />
        <title>Redirecting...</title>
      </head>
      <body>
        <h1>Redirecting...</h1>
        <a href={destinationUrl}>Click here if you are not redirected.</a>
        <script
          dangerouslySetInnerHTML={{ __html: `location=${destinationUrl}` }}
        />
      </body>
    </html>
  );
};
