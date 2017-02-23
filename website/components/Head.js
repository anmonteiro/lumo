import React from 'react';

export default ({ title, url, description }) =>
  <head>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>
      {title}
    </title>
    <meta name="viewport" content="width=device-width" />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    {/* <meta property="og:image" content="https://anmonteiro.github.io/lumo/img/opengraph.png" />*/}
    <meta property="og:description" content={description} />

    <link
      rel="alternate"
      type="application/atom+xml"
      href="/blog/atom.xml"
      title="Jest Blog ATOM Feed"
    />
    <link
      rel="alternate"
      type="application/rss+xml"
      href="/blog/feed.xml"
      title="Jest Blog RSS Feed"
    />
    <link rel="shortcut icon" href="/img/favicon.png" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.css"
    />
    <link rel="stylesheet" href="/css/jest.css" />
    <link rel="stylesheet" href="/css/main.css" />

    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/font-hack/2.020/css/hack.min.css"
    />
    <link rel="stylesheet" href="/css/prism.css" />

    <script type="text/javascript" src="//use.typekit.net/vqa1hcx.js" />
    <script type="text/javascript">
      {'try{Typekit.load();}catch(e){}'}
    </script>
  </head>;
