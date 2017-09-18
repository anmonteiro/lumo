/* eslint-disable sort-keys, max-len */

import React from 'react';

const githubButton = (
  <a
    className="github-button"
    href="https://github.com/anmonteiro/lumo"
    data-icon="octicon-star"
    data-count-href="/anmonteiro/lumo/stargazers"
    data-show-count="true"
    data-count-aria-label="# stargazers on GitHub"
    aria-label="Star anmonteiro/lumo on GitHub"
  >
    Star
  </a>
);

/*
Many companies use Jest, so we can't list all of them in our showcase.
To be useful to someone looking through the showcase, the company must be
something that most readers would recognize, such as a funded startup or
public company.

To add your company, add your logo to the 'website/src/img/logos' folder.
This asset should be at least 256 pixels wide. Then add an entry to the list
below using the following format:

{
  caption: 'Your Company Name',
  image: '/img/logos/YourCompanyLogo.png',
  infoLink: 'https://yourcompany.com',
}
*/
const users = [
  {
    caption: 'Facebook',
    image: '/img/logos/facebook.png',
    infoLink: 'https://code.facebook.com',
    pinned: true,
  },
  {
    caption: 'Oculus',
    image: '/img/logos/oculus.png',
    infoLink: 'https://www.oculus.com/',
    pinned: true,
  },
  {
    caption: 'Instagram',
    image: '/img/logos/instagram.png',
    infoLink: 'https://www.instagram.com/',
    pinned: true,
  },
  {
    caption: 'Twitter',
    image: '/img/logos/twitter.png',
    infoLink: 'https://www.twitter.com',
    pinned: true,
  },
  {
    caption: 'Pinterest',
    image: '/img/logos/pinterest.png',
    infoLink: 'https://www.pinterest.com',
    pinned: true,
  },
  {
    caption: 'The New York Times',
    image: '/img/logos/nyt.png',
    infoLink: 'http://www.nytimes.com/',
    pinned: true,
  },
  {
    caption: 'IBM',
    image: '/img/logos/ibm.png',
    infoLink: 'http://www.ibm.com/',
  },
  {
    caption: 'ebay',
    image: '/img/logos/ebay.png',
    infoLink: 'http://www.ebay.com/',
  },
  {
    caption: 'PayPal',
    image: '/img/logos/paypal.png',
    infoLink: 'https://www.paypal.com',
  },
  {
    caption: 'Spotify',
    image: '/img/logos/spotify.png',
    infoLink: 'https://www.spotify.com',
  },
  {
    caption: 'Target',
    image: '/img/logos/target.png',
    infoLink: 'http://www.target.com',
  },
  {
    caption: 'Intuit',
    image: '/img/logos/intuit.png',
    infoLink: 'https://www.intuit.com/',
  },
  {
    caption: 'Cisco',
    image: '/img/logos/cisco.png',
    infoLink: 'http://www.cisco.com/',
  },
  {
    caption: 'Algolia',
    image: '/img/logos/algolia.svg',
    infoLink: 'https://algolia.com',
  },
  {
    caption: 'Artsy',
    image: '/img/logos/artsy.png',
    infoLink: 'https://www.artsy.net/',
  },
  {
    caption: 'Audiense',
    image: '/img/logos/audiense.png',
    infoLink: 'https://audiense.com/',
  },
  {
    caption: 'Automattic',
    image: '/img/logos/automattic.png',
    infoLink: 'https://automattic.com/',
  },
  {
    caption: 'Coinbase',
    image: '/img/logos/coinbase.png',
    infoLink: 'https://www.coinbase.com/',
  },
  {
    caption: 'Coursera',
    image: '/img/logos/coursera.png',
    infoLink: 'https://coursera.org/',
  },
  {
    caption: 'Deezer',
    image: '/img/logos/deezer.png',
    infoLink: 'https://www.deezer.com/',
  },
];

const siteConfig = {
  title: 'Lumo',
  tagline: 'Fast, cross-platform, standalone ClojureScript environment',
  description:
    'Jest is a JavaScript testing framework, used by Facebook to test all JavaScript code including React applications.',
  url: 'https://anmonteiro.github.io',
  baseUrl: '/',
  repo: 'anmonteiro/lumo',
  githubButton,
  users,
};

export default siteConfig;
