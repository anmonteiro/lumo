import React from 'react';
import siteConfig from '../siteConfig';

import {
  navFooter,
  sitemap,
  navHome,
  fbOpenSource,
  copyright,
} from './Footer.scss';

export default () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={navFooter} id="footer">
      <section className={sitemap}>
        <a href="/" className={navHome}>
          <img src="/img/jest-outline.svg" alt="Jest" width="66" height="58" />
        </a>
        <div>
          <h5>Docs</h5>
          <a href="/docs/getting-started.html">Getting Started</a>
          <a href="/docs/snapshot-testing.html">Guides</a>
          <a href="/docs/api.html">API Reference</a>
        </div>
        <div>
          <h5>Community</h5>
          <a href="/users.html">User Showcase</a>
          <a
            href="http://stackoverflow.com/questions/tagged/jestjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stack Overflow
          </a>
          <a href="https://discordapp.com/channels/102860784329052160/103622435865104384">
            Jest Chat
          </a>
          <a
            href="https://twitter.com/fbjest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
        <div>
          <h5>More</h5>
          <a href="/blog">Blog</a>
          <a href="https://github.com/facebook/jest">GitHub</a>
          {siteConfig.githubButton}
        </div>
      </section>

      <a
        href="https://code.facebook.com/projects/"
        target="_blank"
        rel="noopener noreferrer"
        className={fbOpenSource}
      >
        <img
          src="/img/oss_logo.png"
          alt="Facebook Open Source"
          width="170"
          height="45"
        />
      </a>
      <section className={copyright}>
        Copyright © {currentYear} Facebook Inc.
      </section>
    </footer>
  );
};
