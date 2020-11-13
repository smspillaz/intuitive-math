/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';

import { hot } from 'react-hot-loader/root';

import HomePage from 'containers/HomePage/Loadable';
import GeometryPage from 'containers/GeometryPage/Loadable';
import LinearAlgebraPage from 'containers/LinearAlgebraPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import NavigationFooter from 'components/NavigationFooter';
import ResponsivePage from 'components/ResponsivePage';
import RouteDescriptions, {
  withRouteDescriptions,
} from 'components/RouteDescriptions';

import GlobalStyle from '../../global-styles';

const sections = [
  {
    title: 'Main',
    numbered: false,
    children: [
      {
        text: 'Home',
        href: '/',
      },
    ],
  },
  {
    title: 'Linear Algebra',
    numbered: true,
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
        text: 'Transpose',
        href: '/linear-algebra/transpose',
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
      {
        text: 'Homogeneous Co-ordinates',
        href: '/linear-algebra/homogeneous',
      },
    ],
  },
  {
    title: 'Geometry',
    numbered: true,
    children: [
      {
        text: 'Planes',
        href: '/geometry/planes',
      },
      {
        text: 'Integrals',
        href: '/geometry/integrals',
      },
      {
        text: 'Parametric Surfaces',
        href: '/geometry/parametric',
      },
      {
        text: 'Paths',
        href: '/geometry/paths',
      },
      {
        text: 'Surface Area',
        href: '/geometry/surface-area',
      },
      {
        text: 'Cylinders',
        href: '/geometry/cylinders',
      },
      {
        text: 'Spheres',
        href: '/geometry/spheres',
      },
    ],
  },
];

const NavigationFooterFromRouteDescriptions = ({
  routeDescriptions: { categories, categoryIndex, routeIndex },
}) => (
  <div>
    {categoryIndex > -1 && (
      <NavigationFooter
        prev={
          routeIndex > 0
            ? categories[categoryIndex].routes[routeIndex - 1]
            : null
        }
        next={
          routeIndex !== categories[categoryIndex].routes.length - 1
            ? categories[categoryIndex].routes[routeIndex + 1]
            : null
        }
      />
    )}
  </div>
);

NavigationFooterFromRouteDescriptions.propTypes = {
  routeDescriptions: PropTypes.shape({
    categoryIndex: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        routes: PropTypes.arrayOf(
          PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
          }),
        ).isRequired,
      }),
    ).isRequired,
    routeIndex: PropTypes.number.isRequired,
  }).isRequired,
};

const RoutableRouteDescriptions = withRouter(RouteDescriptions);
const NavigationFooterWithRouteDescriptions = withRouteDescriptions(
  NavigationFooterFromRouteDescriptions,
);

function App() {
  return (
    <>
      <ResponsivePage title="Intuitive Math" sections={sections}>
        <RoutableRouteDescriptions
          descriptions={{
            categories: sections.map(category => ({
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
            <Route path="/geometry" component={GeometryPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
          <NavigationFooterWithRouteDescriptions />
        </RoutableRouteDescriptions>
      </ResponsivePage>
      <GlobalStyle />
    </>
  );
}

export default hot(App);
