import React, { Component } from 'react';

import {
  fixedHeaderContainer,
  navSearchWrapper,
  reactNavSearchWrapper,
  navigationWrapper,
  navigationSlider,
  slidingNav,
} from './HeaderNav.scss';

export default class HeaderNav extends Component {
  static defaultProps = {
    linksInternal: [
      { section: 'docs', href: '/docs/getting-started.html', text: 'Docs' },
      { section: 'api', href: '/docs/api.html', text: 'API' },
      { section: 'help', href: '/help.html', text: 'Help' },
      { section: 'blog', href: '/blog/', text: 'Blog' },
    ],
    linksExternal: [
      {
        section: 'github',
        href: 'https://github.com/anmonteiro/lumo',
        text: 'GitHub',
      },
    ],
  };

  constructor() {
    super();
    this.state = {
      slideoutActive: false,
    };
  }

  makeLinks(link) {
    return (
      <li key={link.section}>
        <a
          href={link.href}
          className={link.section === this.props.section ? 'active' : ''}
        >
          {link.text}
        </a>
      </li>
    );
  }

  renderResponsiveNav() {
    return (
      <div className={`${navigationWrapper} ${navigationSlider}`}>
        <nav className={slidingNav}>
          <ul className="nav-site nav-site-internal">
            {this.props.linksInternal.map(this.makeLinks, this)}
            <li className={`${navSearchWrapper} ${reactNavSearchWrapper}`}>
              <input id="search_input_react" type="text" placeholder="Search" />
            </li>
            {this.props.linksExternal.map(this.makeLinks, this)}
          </ul>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <div className={fixedHeaderContainer}>
        <div className="headerWrapper wrapper">
          <header>
            <a href={this.props.baseUrl}>
              <img
                src={`${this.props.baseUrl}img/jest-outline.svg`}
                alt="outline"
              />
              <h2>
                {this.props.title}
              </h2>
            </a>
            {this.renderResponsiveNav()}
          </header>
        </div>
      </div>
    );
  }
}
