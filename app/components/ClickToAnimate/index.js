/*
 * ClickToAnimate
 *
 * A component that uses the context to start and stop
 * animation on click
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

class ClickToAnimate extends React.Component {
  static contextTypes = {
    animationIsRunning: PropTypes.bool,
    startAnimation: PropTypes.func,
    stopAnimation: PropTypes.func,
  };

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  };

  handleClick = () => {
    if (!!this.context.animationIsRunning && this.context.stopAnimation) {
      this.context.stopAnimation();
    } else if (this.context.startAnimation) {
      this.context.startAnimation();
    }
  }

  render() {
    return (
      <div onClick={() => this.handleClick()} role="button" tabIndex={0}>
        {this.props.children}
      </div>
    );
  }
}

export default ClickToAnimate;
