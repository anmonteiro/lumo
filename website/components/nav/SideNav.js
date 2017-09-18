import React, { Component } from 'react';
import classNames from 'classnames';

import {
  toc,
  toggleNav,
  navWrapper,
  navBreadcrumb,
  navToggle,
  navGroups,
  navGroup,
  navGroupActive,
  navListItem,
  navItem,
} from './SideNav.scss';

function getLink(metadata) {
  if (metadata.permalink) {
    if (metadata.permalink.match(/^https?:/)) {
      return metadata.permalink;
    }
    return `/${metadata.permalink}#content`;
  }
  if (metadata.path) {
    return `/blog/${metadata.path}`;
  }

  return null;
}

export default class SideNav extends Component {
  static defaultProps = {
    contents: [],
  };

  renderCategory(category) {
    return (
      <div className={classNames(navGroup, navGroupActive)} key={category.name}>
        <h3>{category.name}</h3>
        <ul>{category.links.map(this.renderItemLink, this)}</ul>
      </div>
    );
  }

  renderItemLink(link) {
    const itemClasses = classNames(navListItem, {
      navListItemActive: link.id === this.props.current.id,
    });
    const linkClasses = classNames(navItem, {
      navItemActive: link.id === this.props.current.id,
    });
    return (
      <li className={itemClasses} key={link.id}>
        <a className={linkClasses} href={getLink(link)}>
          {link.title}
        </a>
      </li>
    );
  }

  render() {
    return (
      <nav className={toc}>
        <div className={toggleNav}>
          <section className={classNames(navWrapper, 'wrapper')}>
            <div className={classNames(navBreadcrumb, 'wrapper')}>
              <div className={navToggle} id="navToggler">
                <i />
              </div>
              <h2>
                <a href={this.props.root}>{this.props.title}</a>
                <i>›</i>
                <span>{this.props.current.category}</span>
              </h2>
              p{' '}
            </div>
            <div className={navGroups}>
              {this.props.contents.map(this.renderCategory, this)}
            </div>
          </section>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          var toggler = document.getElementById('navToggler');
          var nav = document.getElementById('docsNav');
          toggler.onclick = function() {
            nav.classList.toggle('docsSliderActive');
          };
        `,
          }}
        />
      </nav>
    );
  }
}
