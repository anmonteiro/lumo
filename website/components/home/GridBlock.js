import React from 'react';
import classNames from 'classnames';
import Marked from '../Marked';

import {
  blockElement,
  blockContent,
  blockImage,
  alignCenter,
  alignRight,
  imageAlignBottom,
  imageAlignSide,
  imageAlignTop,
  gridBlock,
  twoByGridBlock,
  threeByGridBlock,
  fourByGridBlock,
} from './GridBlock.scss';

function renderBlockImage(image) {
  if (image) {
    return (
      <div className={blockImage}>
        <img src={image} alt="" />
      </div>
    );
  }
  return null;
}

function renderBlockTitle(title) {
  if (title) {
    return <h2>{title}</h2>;
  }
  return null;
}

export default class GridBlock extends React.Component {
  static defaultProps = {
    align: 'left',
    contents: [],
    imagealign: 'top',
    layout: 'twoColumn',
  };

  renderBlock(block) {
    const blockClasses = classNames(blockElement, this.props.className, {
      [alignCenter]: this.props.align === 'center',
      [alignRight]: this.props.align === 'right',
      [fourByGridBlock]: this.props.layout === 'fourColumn',
      [imageAlignBottom]: block.image && block.imageAlign === 'bottom',
      [imageAlignSide]:
        block.image &&
        (block.imageAlign === 'left' || block.imageAlign === 'right'),
      [imageAlignTop]: block.image && block.imageAlign === 'top',
      [threeByGridBlock]: this.props.layout === 'threeColumn',
      [twoByGridBlock]: this.props.layout === 'twoColumn',
    });

    const topLeftImage =
      (block.imageAlign === 'top' || block.imageAlign === 'left') &&
      renderBlockImage(block.image);

    const bottomRightImage =
      (block.imageAlign === 'bottom' || block.imageAlign === 'right') &&
      renderBlockImage(block.image);

    return (
      <div className={blockClasses} key={block.title}>
        {topLeftImage}
        <div className={blockContent}>
          {renderBlockTitle(block.title)}
          <Marked>{block.content}</Marked>
        </div>
        {bottomRightImage}
      </div>
    );
  }

  render() {
    return (
      <div className={gridBlock}>
        {this.props.contents.map(this.renderBlock, this)}
      </div>
    );
  }
}
