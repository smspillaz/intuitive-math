/*
 * ScrollToTop
 *
 * A simple wrapper component that scrolls the window to the top
 * when the location is updated. Use it with react-router to ensure
 * that the scroll position is reset on route change.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (!window) {
      return;
    }

    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default withRouter(ScrollToTop);
