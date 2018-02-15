/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, Route, Switch, withRouter } from 'react-router-dom';

import styled from 'styled-components';

import PropTypes from 'prop-types';

import HomePage from 'containers/HomePage/Loadable';
import LinearAlgebraPage from 'containers/LinearAlgebraPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import ResponsivePage from 'components/ResponsivePage';

import { AtlaskitThemeProvider } from '@atlaskit/theme';

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
    children: PropTypes.node,
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

const RoutableRouteDescriptions = withRouter(RouteDescriptions);

const sections = [
  {
    title: 'Linear Algebra',
    children: [
      {
        text: 'Co-ordinate Systems',
        href: '/linear-algebra/spaces',
      },
      {
        text: 'Vectors',
        href: '/linear-algebra/vectors',
      },
      {
        text: 'Matrices',
        href: '/linear-algebra/matrices',
      },
      {
        text: 'Linear Independence',
        href: '/linear-algebra/linear-independence',
      },
      {
        text: 'Subspaces',
        href: '/linear-algebra/subspaces',
      },
      {
        text: 'Spans',
        href: '/linear-algebra/spans',
      },
      {
        text: 'Basis',
        href: '/linear-algebra/basis',
      },
      {
        text: 'Elementary Row Ops',
        href: '/linear-algebra/elementary-row-operations',
      },
      {
        text: 'Row Space',
        href: '/linear-algebra/row-space',
      },
      {
        text: 'Column Space / Range',
        href: '/linear-algebra/column-space',
      },
      {
        text: 'Null Space / Kernels',
        href: '/linear-algebra/null-space',
      },
      {
        text: 'Determinant',
        href: '/linear-algebra/determinant',
      },
      {
        text: 'Inverses',
        href: '/linear-algebra/inverses',
      },
      {
        text: 'Eigenvalues',
        href: '/linear-algebra/eigenvalues',
      },
      {
        text: 'Eigenvectors',
        href: '/linear-algebra/eigenvectors',
      },
      {
        text: 'Eigenbasis / Diagonalization',
        href: '/linear-algebra/eigenbasis',
      },
    ],
  },
];

const withRouteDescriptions = (Component) => {
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

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #F4F5F7;
`;

const PaginationContainerChild = styled.div`
  flex: 1 1 auto;
  padding: 10px;

  a {
    text-decoration: none;
    color: #54516C;
    padding: 10px;
    border-radius: 2px;
  }

  a:hover {
    background-color: #EAECF0;
    color: #54516C;
  }
`;

const RightJustify = styled.div`
  text-align: right;
`;

const LeftJustify = styled.div`
  text-align: left;
`;

// eslint-disable-next-line react/prop-types
const PaginationChild = (Justifier) => ({ path, title }) => (
  <PaginationContainerChild>
    <Justifier>
      <Link to={path}>{title}</Link>
    </Justifier>
  </PaginationContainerChild>
);

PaginationChild.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const LeftJustifiedPaginationChild = PaginationChild(LeftJustify);
const RightJustifiedPaginationChild = PaginationChild(RightJustify);

const NavigationFooter = ({ prev, next }) => (
  <PaginationContainer>
    {prev && <LeftJustifiedPaginationChild path={prev.path} title={prev.title} />}
    {next && <RightJustifiedPaginationChild path={next.path} title={next.title} />}
  </PaginationContainer>
);

NavigationFooter.propTypes = {
  prev: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  next: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

const NavigationFooterFromRouteDescriptions = ({ routeDescriptions: { categories, categoryIndex, routeIndex } }) => (
  <div>
    {categoryIndex > -1 && (
      <NavigationFooter
        prev={routeIndex > 0 && categories[categoryIndex].routes[routeIndex - 1]}
        next={routeIndex !== categories[categoryIndex].routes.length - 1 && categories[categoryIndex].routes[routeIndex + 1]}
      />
    )}
  </div>
);

NavigationFooterFromRouteDescriptions.propTypes = {
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

const NavigationFooterWithRouteDescriptions = withRouteDescriptions(NavigationFooterFromRouteDescriptions);

const NavigatablePage = () => (
  <AtlaskitThemeProvider>
    <ResponsivePage
      title="Intuitive Math"
      sections={sections}
    >
      <RoutableRouteDescriptions
        descriptions={{
          categories: sections.map((category) => ({
            routes: category.children.map(({ text, href }) => ({
              title: text,
              path: href,
            })),
          })),
        }}
      >
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/linear-algebra" component={LinearAlgebraPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <NavigationFooterWithRouteDescriptions />
      </RoutableRouteDescriptions>
    </ResponsivePage>
  </AtlaskitThemeProvider>
);

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Intuitive Math" defaultTitle="Intuitive Math">
        <meta name="description" content="Intuitive Math Explainers" />
      </Helmet>
      <NavigatablePage />
    </div>
  );
}
