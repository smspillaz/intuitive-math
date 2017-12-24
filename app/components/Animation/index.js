import React from 'react';
import PropTypes from 'prop-types';

import TrackVisibility from 'react-on-screen';

class Animation extends React.Component {
  static propTypes = {
    initial: PropTypes.any,
    update: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
  };

  static childContextTypes = {
    animationIsRunning: PropTypes.bool,
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
    };
  }

  componentDidMount() {
    this.startAnimationCountdown();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isVisible && this.props.isVisible) {
      this.startAnimationCountdown();
    } else if (prevProps.isVisible && !this.props.isVisible) {
      this.stop();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  animate() {
    if (this.frameId === -1 && this.props.isVisible) {
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
      this.animationCountdownId = setTimeout(() => this.animate(), 200);
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

const PowerEfficientAnimation = (props) => (
  <TrackVisibility offset={100}>
    {({ isVisible }) => <Animation {...props} isVisible={isVisible} />}
  </TrackVisibility>
);

export default PowerEfficientAnimation;
