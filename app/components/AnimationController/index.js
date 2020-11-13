import React, { createContext, useState, useEffect, useContext } from 'react';
import { useFrame } from 'react-three-fiber';
import PropTypes from 'prop-types';

import TrackVisibility from 'react-on-screen';

export const AnimationControllerContext = createContext({
  animationIsRunning: true,
  isVisible: false,
  stopAnimation: null,
  startAnimation: null,
  withinAnimation: false,
});

export const useAnimationFrame = func => {
  const animationContext = useContext(AnimationControllerContext);

  // Render the first frame too
  useEffect(func, []);
  return useFrame((...args) => {
    if (animationContext.animationIsRunning) {
      func(...args);
    }
  });
};

const AnimationController = ({ isVisible, running = false, children }) => {
  const [animating, setAnimating] = useState(false);

  const { startAnimation, stopAnimation, animationIsRunning } = useContext(
    AnimationControllerContext,
  );

  const start = () => {
    setAnimating(true);

    if (startAnimation) {
      startAnimation();
    }
  };

  const stop = () => {
    if (stopAnimation) {
      stopAnimation();
    }

    setAnimating(false);
  };

  useEffect(() => {
    /* Control from the parent component -
     * if a child wants to start or stop us, they
     * can call the hooks in the context directly */
    if (running) {
      start();
    } else {
      stop();
    }

    return () => stop();
  }, [running]);

  return (
    <AnimationControllerContext.Provider
      value={{
        animationIsRunning: animating && animationIsRunning,
        isVisible,
        startAnimation: start,
        stopAnimation: stop,
        withinAnimation: true,
      }}
    >
      {children}
    </AnimationControllerContext.Provider>
  );
};

AnimationController.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  running: PropTypes.bool,
};

const PowerEfficientAnimationController = ({
  running = false,
  children,
  ...props
}) => (
  <TrackVisibility offset={100} {...props}>
    {({ isVisible }) => (
      <AnimationController
        {...props}
        running={running && isVisible}
        isVisible={isVisible}
      >
        {children}
      </AnimationController>
    )}
  </TrackVisibility>
);

PowerEfficientAnimationController.propTypes = {
  running: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default PowerEfficientAnimationController;
