/*
 * ClickToAnimate
 *
 * A component that uses the context to start and stop
 * animation on click
 *
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AnimationContext } from 'components/Animation';

const ClickToAnimate = ({ children }) => {
  const { animationIsRunning, startAnimation, stopAnimation } = useContext(
    AnimationContext,
  );
  const handleClick = () => {
    if (!!animationIsRunning && stopAnimation) {
      stopAnimation();
    } else if (startAnimation) {
      startAnimation();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
};

ClickToAnimate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default ClickToAnimate;
