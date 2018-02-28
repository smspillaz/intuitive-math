/*
 * CallbackAnimator
 *
 * A HOC that passes onAnimationFrame as a prop to Component so that
 * Component can trigger onAnimationFrame.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const callbackAnimator = (Component) => {
  const CallbackAnimatorWrapper = (props, {
    animationIsRunning,
    onAnimationFrame,
    onRegisterManualRenderCallback,
  }) => (
    <Component
      {...props}
      animationIsRunning={!!animationIsRunning}
      onAnimationFrame={onAnimationFrame}
      onRegisterManualRenderCallback={onRegisterManualRenderCallback}
    />
  );
  CallbackAnimatorWrapper.contextTypes = {
    animationIsRunning: PropTypes.bool,
    onAnimationFrame: PropTypes.func,
    onRegisterManualRenderCallback: PropTypes.func,
  };
  return CallbackAnimatorWrapper;
};

export default callbackAnimator;
