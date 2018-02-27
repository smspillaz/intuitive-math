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
  }

  getChildContext() {
    return {
      animationIsRunning: this.state.animating,
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

  animate = () => {
    if (this.frameId === -1) {
      const updater = () => {
        this.setState(this.props.update(this.state));
        this.frameId = requestAnimationFrame(updater);
      };
      this.frameId = requestAnimationFrame(updater);
      this.setState({ animating: true });
    }

    this.animationCountdownId = -1;

    if (this.context.startAnimation) {
      this.context.startAnimation();
    }
  }

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
    children: PropTypes.node.isRequired,
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
