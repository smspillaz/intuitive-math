import React from 'react';
import PropTypes from 'prop-types';

import TrackVisibility from 'react-on-screen';

class Animation extends React.Component {
  static propTypes = {
    initial: PropTypes.any,
    update: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    running: PropTypes.bool.isRequired,
  };

  static childContextTypes = {
    animationIsRunning: PropTypes.bool,
    withinAnimation: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...props.initial,
    };
    this.frameId = -1;
    this.animationCountdownId = -1;
  }

  getChildContext() {
    return {
      animationIsRunning: this.frameId !== -1,
      withinAnimation: true,
    };
  }

  componentDidMount() {
    this.startAnimationCountdown();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.running && this.props.running) {
      this.startAnimationCountdown();
    } else if (prevProps.running && !this.props.running) {
      this.stop();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  animate() {
    if (this.frameId === -1 && this.props.running) {
      const updater = () => {
        this.setState(this.props.update(this.state));
        this.frameId = requestAnimationFrame(updater);
      };
      this.frameId = requestAnimationFrame(updater);
    }

    this.animationCountdownId = -1;
  }

  startAnimationCountdown() {
    if (this.animationCountdownId === -1) {
      this.animationCountdownId = setTimeout(() => this.animate(), 50);
    }
  }

  stop() {
    if (this.frameId !== -1) {
      cancelAnimationFrame(this.frameId);
      this.frameId = -1;
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
        <Animation {...props} running={running && isVisible} />
      </PureVisibilityTracker>
    )}
  </TrackVisibility>
);

PowerEfficientAnimation.propTypes = {
  running: PropTypes.bool,
};

export default PowerEfficientAnimation;
