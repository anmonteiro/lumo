import React, { Component } from 'react';
import Metadata from './metadata';
import Container from './Container';
import SideNav from './nav/SideNav';

export default class DocsSidebar extends Component {
  static defaultProps = {
    layout: 'docs',
    root: '/docs/getting-started.html',
    title: 'Docs',
  };

  getCategories() {
    const metadatas = Metadata.files.filter(
      metadata => metadata.layout === this.props.layout,
    );
    // Build a hashmap of article_id -> metadata
    const articles = {};
    for (let i = 0; i < metadatas.length; i += 1) {
      const metadata = metadatas[i];
      articles[metadata.id] = metadata;
    }

    // Build a hashmap of article_id -> previous_id
    const previous = {};
    for (let i = 0; i < metadatas.length; i += 1) {
      const metadata = metadatas[i];
      if (metadata.next) {
        if (!articles[metadata.next]) {
          throw new Error(
            `\`next: ${metadata.next}\` in ${metadata.id} doesn't exist`,
          );
        }
        previous[articles[metadata.next].id] = metadata.id;
      }
    }

    // Find the first element which doesn't have any previous
    let first = null;
    for (let i = 0; i < metadatas.length; i += 1) {
      const metadata = metadatas[i];
      if (!previous[metadata.id]) {
        first = metadata;
        break;
      }
    }

    const categories = [];
    let currentCategory = null;

    let metadata = first;
    let i = 0;
    while (metadata && i < 1000) {
      if (!currentCategory || metadata.category !== currentCategory.name) {
        if (currentCategory) {
          categories.push(currentCategory);
        }
        currentCategory = {
          name: metadata.category,
          links: [],
        };
      }
      currentCategory.links.push(metadata);
      metadata = articles[metadata.next];
      i += 1;
    }
    categories.push(currentCategory);

    return categories;
  }

  render() {
    return (
      <Container className="docsNavContainer" id="docsNav" wrapper={false}>
        <SideNav
          root={this.props.root}
          title={this.props.title}
          contents={this.getCategories()}
          current={this.props.metadata}
        />
      </Container>
    );
  }
}
