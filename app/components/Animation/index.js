import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import TrackVisibility from 'react-on-screen';

export const AnimationContext = createContext({
  animationIsRunning: false,
  isVisible: false,
  onAnimationFrame: null,
  onRegisterManualRenderCallback: null,
  stopAnimation: null,
  startAnimation: null,
  withinAnimation: false,
});

const Animation = ({
  initial,
  isVisible,
  onRegisterManualRenderCallback,
  update,
  render,
  running = false,
}) => {
  const [state, setState] = useState(initial);
  const [animating, setAnimating] = useState(false);
  const {
    startAnimation,
    stopAnimation,
    onAnimationFrame,
    onRegisterManualRenderCallback: upperOnRegisterManualRenderCallback,
  } = useContext(AnimationContext);

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

  const handleFrame = () => {
    setState(update(state));

    if (onAnimationFrame) {
      onAnimationFrame();
    }
  };

  useEffect(() => {
    /* Control from the parent component -
     * if a child wants to start or stop us, they
     * can call the hooks in the context directly */
    if (running) {
      start();
    } else {
      stop();

      if (stopAnimation) {
        stopAnimation();
      }
    }

    return () => stop();
  }, [running]);

  return (
    <AnimationContext.Provider
      value={{
        animationIsRunning: animating,
        isVisible,
        onAnimationFrame: handleFrame,
        onRegisterManualRenderCallback:
          onRegisterManualRenderCallback || upperOnRegisterManualRenderCallback,
        startAnimation: start,
        stopAnimation: stop,
        withinAnimation: true,
      }}
    >
      {render(state)}
    </AnimationContext.Provider>
  );
};

Animation.propTypes = {
  initial: PropTypes.any.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onRegisterManualRenderCallback: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  running: PropTypes.bool,
};

// eslint-disable-next-line
class PureVisibilityTracker extends React.Component {
  shouldComponentUpdate(nextProps) {
    return Object.keys(nextProps).some(prop =>
      prop === 'children' ? false : nextProps[prop] !== this.props[prop],
    );
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

PureVisibilityTracker.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const PowerEfficientAnimation = ({ running = false, ...props }) => (
  <TrackVisibility offset={100}>
    {({ isVisible }) => (
      <PureVisibilityTracker isVisible={isVisible} {...props}>
        <Animation
          {...props}
          running={running && isVisible}
          isVisible={isVisible}
        />
      </PureVisibilityTracker>
    )}
  </TrackVisibility>
);

PowerEfficientAnimation.propTypes = {
  running: PropTypes.bool,
};

export default PowerEfficientAnimation;
