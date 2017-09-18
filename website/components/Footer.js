import React from 'react';
import siteConfig from '../siteConfig';

import { navFooter, sitemap, navHome, copyright } from './Footer.scss';

export default () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={navFooter} id="footer">
      <section className={sitemap}>
        <a href="/" className={navHome}>
          <img src="/img/lumo-outline.svg" alt="Lumo" width="66" height="58" />
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
            href="https://twitter.com/anmonteiro90"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
        <div>
          <h5>More</h5>
          <a href={`https://github.com/${siteConfig.repo}`}>GitHub</a>
          {siteConfig.githubButton}
        </div>
      </section>
      <section className={copyright}>
        Copyright © {currentYear} António Nuno Monteiro.
      </section>
    </footer>
  );
};
