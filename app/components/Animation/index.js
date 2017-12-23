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
  }

  componentDidMount() {
    const updater = () => {
      this.setState(this.props.update(this.state));
      requestAnimationFrame(updater);
    };
    requestAnimationFrame(updater);
  }

  render() {
    return this.props.render(this.state);
  }
}

export default Animation;
