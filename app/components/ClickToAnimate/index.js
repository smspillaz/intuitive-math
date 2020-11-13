/*
 * ClickToAnimate
 *
 * A component that uses the context to start and stop
 * animation on click
 *
 */

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import AnimationController from 'components/AnimationController';

const ClickToAnimate = ({ isVisible, children }) => {
  const [animating, setAnimating] = useState(false);
  const handleClick = useMemo(() => () => setAnimating(!animating), [
    animating,
  ]);

  return (
    <div
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex={0}
    >
      <AnimationController isVisible={isVisible} running={animating}>
        {children}
      </AnimationController>
    </div>
  );
};

ClickToAnimate.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default ClickToAnimate;
