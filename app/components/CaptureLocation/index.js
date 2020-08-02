/*
 * CaptureLocation
 *
 * A higher-order component to capture the current state of the
 * location in the user's location bar so that can be propagated down
 * as a property to the passed-in component.
 */

import React from 'react';
import PropTypes from 'prop-types';

const withLocation = Component => {
  class WrappedComponentWithLocation extends React.Component {
    constructor(props) {
      super();
      this.state = {
        location: props.history.location,
      };
      this.listener = null;
    }

    componentDidMount() {
      this.unlisten = this.props.history.listen(location =>
        this.setState({
          location,
        }),
      );
    }

    componentWillUnmount() {
      this.unlisten();
    }

    render() {
      return <Component location={this.state.location} {...this.props} />;
    }
  }

  WrappedComponentWithLocation.propTypes = {
    history: PropTypes.object.isRequired,
  };

  return WrappedComponentWithLocation;
};

export default withLocation;
