import React from 'react';
import Button from '../Button';
import siteConfig from '../../siteConfig';

import {
  homeContainer,
  homeWrapper,
  pluginRowBlock,
  promoSection,
  pluginWrapper,
  promoRow,
  projectTitle,
  projectLogo,
} from './HomeSplash.scss';

export default () => (
  <div className={homeContainer}>
    <div className={`wrapper ${homeWrapper}`}>
      <div className={projectLogo}>
        <img src="/img/jest-outline.svg" alt="Jest" />
      </div>
      <h2 className={projectTitle}>
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
      <div className={promoSection}>
        <div className={promoRow}>
          <div className={pluginRowBlock}>
            <Button className={pluginWrapper} href="#try">
              Try out Lumo
            </Button>
            <Button className={pluginWrapper} href="/docs/getting-started.html">
              Get Started
            </Button>
            <Button
              className={pluginWrapper}
              href="/docs/snapshot-testing.html"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div>{siteConfig.githubButton}</div>
    </div>
  </div>
);
