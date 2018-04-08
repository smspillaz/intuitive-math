/*
 * RouteDescriptions
 *
 * A component to capture all the known routes in the
 * page navigation and expose them through the
 * context.
 */

import React from 'react';

import PropTypes from 'prop-types';

class RouteDescriptions extends React.Component {
  static childContextTypes = {
    routeDescriptions: PropTypes.shape({
      categoryIndex: PropTypes.number.isRequired,
      routeIndex: PropTypes.number.isRequired,
      categories: PropTypes.arrayOf(PropTypes.shape({
        routes: PropTypes.arrayOf(PropTypes.shape({
          path: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })).isRequired,
      })).isRequired,
    }).isRequired,
  };

  static propTypes = {
    descriptions: PropTypes.shape({
      categories: PropTypes.arrayOf(PropTypes.shape({
        routes: PropTypes.arrayOf(PropTypes.shape({
          path: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })).isRequired,
      })).isRequired,
    }).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    location: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      categoryIndex: 0,
      routeIndex: -1,
    };
  }

  getChildContext() {
    return {
      routeDescriptions: {
        categoryIndex: this.state.categoryIndex,
        routeIndex: this.state.routeIndex,
        categories: this.props.descriptions.categories,
      },
    };
  }

  componentWillMount() {
    this.updateIndicesFromRoutePathname(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    /* Look up path in our route descriptions and adjust the categoryIndex
     * and routeIndex accordingly. */
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.updateIndicesFromRoutePathname(nextProps.location.pathname);
    }
  }

  updateIndicesFromRoutePathname(pathname) {
    let routeIndex = -1;
    const categoryIndex = this.props.descriptions.categories.findIndex((category) => {
      routeIndex = category.routes.findIndex((route) => pathname.endsWith(route.path));
      if (routeIndex !== -1) {
        return true;
      }

      return false;
    });

    console.assert(categoryIndex !== -1); // eslint-disable-line no-console
    console.assert(routeIndex !== -1); // eslint-disable-line no-console

    this.setState({
      categoryIndex,
      routeIndex,
    });
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export const withRouteDescriptions = (Component) => {
  const Wrapped = (props, { routeDescriptions }) => (
    <Component routeDescriptions={routeDescriptions}>
    </Component>
  );
  Wrapped.contextTypes = {
    routeDescriptions: PropTypes.shape({
      categoryIndex: PropTypes.number.isRequired,
      categories: PropTypes.arrayOf(PropTypes.shape({
        routes: PropTypes.arrayOf(PropTypes.shape({
          path: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })).isRequired,
      })).isRequired,
      routeIndex: PropTypes.number.isRequired,
    }).isRequired,
  };

  return Wrapped;
};

export default RouteDescriptions;
