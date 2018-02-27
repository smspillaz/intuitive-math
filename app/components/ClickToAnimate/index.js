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
    startAnimation: PropTypes.func.isRequired,
    stopAnimation: PropTypes.func.isRequired,
  };

  static propTypes = {
    animationIsRunning: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  };

  handleClick = () => {
    if (this.props.animationIsRunning) {
      this.context.stopAnimation();
    } else {
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
