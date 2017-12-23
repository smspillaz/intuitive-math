/**
 *
 * NavigationState
 *
 * This component is used to hold the navigation state. Provide a
 * renderNavigable prop to tell this component how to render a
 * Navigatable thing along with the stored state.
 */

import React from 'react';
import PropTypes from 'prop-types';

class NavigationState extends React.Component {
  static propTypes = {
    renderNavigable: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    navOpenState: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      navOpenState: {
        isOpen: true,
        width: 304,
      },
    };
  }

  getChildContext() {
    return {
      navOpenState: this.state.navOpenState,
    };
  }

  onNavResize = navOpenState => {
    this.setState({
      navOpenState,
    });
  };

  render() {
    return (
      <div>{this.props.renderNavigable({ onNavResize: this.onNavResize })}</div>
    );
  }
}

export default NavigationState;
