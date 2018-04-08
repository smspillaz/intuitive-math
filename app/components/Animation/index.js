import React from 'react';
import PropTypes from 'prop-types';

import TrackVisibility from 'react-on-screen';

class Animation extends React.Component {
  static propTypes = {
    initial: PropTypes.any,
    isVisible: PropTypes.bool.isRequired,
    onRegisterManualRenderCallback: PropTypes.func,
    update: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    onAnimationFrame: PropTypes.func,
    onRegisterManualRenderCallback: PropTypes.func,
    stopAnimation: PropTypes.func,
    startAnimation: PropTypes.func,
  };

  static childContextTypes = {
    animationIsRunning: PropTypes.bool,
    isVisible: PropTypes.bool,
    onAnimationFrame: PropTypes.func,
    onRegisterManualRenderCallback: PropTypes.func,
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
    this.animationCountdownId = -1;
    this.manualRenderCallback = null;
  }

  getChildContext() {
    return {
      animationIsRunning: this.state.animating,
      isVisible: this.props.isVisible,
      onAnimationFrame: this.handleAnimationFrame,
      onRegisterManualRenderCallback: (
        this.props.onRegisterManualRenderCallback ||
        this.context.onRegisterManualRenderCallback
      ),
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
    this.setState({ animating: true });

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

    this.setState({ animating: false });

    if (this.animationCountdownId !== -1) {
      clearTimeout(this.animationCountdownId);
      this.animationCountdownId = -1;
    }
  }

  handleAnimationFrame = () => {
    this.setState(this.props.update(this.state));
    if (this.context.onAnimationFrame) {
      this.context.onAnimationFrame();
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
