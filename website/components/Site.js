import React from 'react';
import HeaderNav from './nav/HeaderNav';
import Head from './Head';
import Footer from './Footer';
import siteConfig from '../siteConfig';

import { navPusher } from './Site.scss';

export default ({ className, section, children, ...props }) => {
  const title = props.title
    ? `${props.title} · ${siteConfig.title}`
    : `${siteConfig.title} · ${siteConfig.tagline}`;
  const description = props.description || siteConfig.tagline;
  const url = siteConfig.url + siteConfig.baseUrl + (props.url || 'index.html');
  return (
    <html lang="en">
      <Head description={description} title={title} url={url} />
      <body className={className}>
        <HeaderNav
          baseUrl={siteConfig.baseUrl}
          section={section}
          title={siteConfig.title}
        />
        <div className={navPusher}>
          {children}
          <Footer />
        </div>
        <div id="fb-root" />
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-44373548-17', 'auto');
            ga('send', 'pageview');

            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)
            ){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

            docsearch({
              apiKey: '833906d7486e4059359fa58823c4ef56',
              indexName: 'jest',
              inputSelector: '#search_input_react'
            });
          `,
          }}
        />
        <script async defer src="https://buttons.github.io/buttons.js" />
      </body>
    </html>
  );
};
