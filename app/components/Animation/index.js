import React from 'react';
import PropTypes from 'prop-types';

import TrackVisibility from 'react-on-screen';

class Animation extends React.Component {
  static propTypes = {
    initial: PropTypes.any,
    isVisible: PropTypes.bool.isRequired,
    update: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    stopAnimation: PropTypes.func,
    startAnimation: PropTypes.func,
  };

  static childContextTypes = {
    animationIsRunning: PropTypes.bool,
    registerOnNewFrameCallback: PropTypes.func,
    unregisterOnNewFrameCallback: PropTypes.func,
    isVisible: PropTypes.bool,
    stopAnimation: PropTypes.func,
    startAnimation: PropTypes.func,
    withinAnimation: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...props.initial,
      animating: false,
    };
    this.frameId = -1;
    this.animationCountdownId = -1;
    this.frameCallbackRegistrationCounter = 0;
    this.frameCallbacks = {};
  }

  getChildContext() {
    return {
      animationIsRunning: this.state.animating,
      registerOnNewFrameCallback: this.registerOnNewFrameCallback,
      unregisterOnNewFrameCallback: this.unregisterOnNewFrameCallback,
      isVisible: this.props.isVisible,
      startAnimation: this.animate,
      stopAnimation: this.stop,
      withinAnimation: true,
    };
  }

  componentDidUpdate(prevProps) {
    // Only want to stop running automatically, to start
    // running, the user must interact with us.
    if (prevProps.running && !this.props.running) {
      this.stop();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  registerOnNewFrameCallback = callback => {
    this.frameCallbacks[this.frameCallbackRegistrationCounter] = callback;
    /* eslint-disable-next-line */
    return this.frameCallbackRegistrationCounter++;
  };

  unregisterOnNewFrameCallback = location => {
    delete this.frameCallbacks[location];
  };

  animate = () => {
    if (this.frameId === -1) {
      const updater = () => {
        this.setState(this.props.update(this.state));
        Object.keys(this.frameCallbacks).forEach(key =>
          this.frameCallbacks[key](),
        );
        this.frameId = requestAnimationFrame(updater);
      };
      this.frameId = requestAnimationFrame(updater);
      this.setState({ animating: true });
    }

    this.animationCountdownId = -1;

    if (this.context.startAnimation) {
      this.context.startAnimation();
    }
  };

  startAnimationCountdown = () => {
    if (this.animationCountdownId === -1) {
      this.animationCountdownId = setTimeout(() => this.animate(), 50);
    }
  }

  stop = () => {
    if (this.context.stopAnimation) {
      this.context.stopAnimation();
    }

    if (this.frameId !== -1) {
      cancelAnimationFrame(this.frameId);
      this.frameId = -1;
      this.setState({ animating: false });
    }

    if (this.animationCountdownId !== -1) {
      clearTimeout(this.animationCountdownId);
      this.animationCountdownId = -1;
    }
  }

  render() {
    return this.props.render(this.state);
  }
}

// eslint-disable-next-line
class PureVisibilityTracker extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  shouldComponentUpdate(nextProps) {
    return Object.keys(nextProps).some((prop) => (
      prop === 'children' ? false : nextProps[prop] !== this.props[prop]
    ));
  }

  render() {
    return (<div>{this.props.children}</div>);
  }
}

const PowerEfficientAnimation = ({ running = true, ...props }) => (
  <TrackVisibility offset={100}>
    {({ isVisible }) => (
      <PureVisibilityTracker isVisible={isVisible} {...props}>
        <Animation {...props} running={running && isVisible} isVisible={isVisible} />
      </PureVisibilityTracker>
    )}
  </TrackVisibility>
);

PowerEfficientAnimation.propTypes = {
  running: PropTypes.bool,
};

export default PowerEfficientAnimation;
