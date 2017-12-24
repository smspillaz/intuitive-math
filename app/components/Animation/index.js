import React from 'react';
import PropTypes from 'prop-types';

class Animation extends React.Component {
  static propTypes = {
    initial: PropTypes.any,
    update: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...props.initial,
    };
    this.frameId = -1;
  }

  componentDidMount() {
    const updater = () => {
      this.setState(this.props.update(this.state));
      this.frameId = requestAnimationFrame(updater);
    };
    this.frameId = requestAnimationFrame(updater);
  }

  render() {
    return this.props.render(this.state);
  }
}

export default Animation;
