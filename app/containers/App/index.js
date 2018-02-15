/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import HomePage from 'containers/HomePage/Loadable';
import LinearAlgebraPage from 'containers/LinearAlgebraPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import NavigationFooter from 'components/NavigationFooter';
import ResponsivePage from 'components/ResponsivePage';
import RouteDescriptions, { withRouteDescriptions } from 'components/RouteDescriptions';

import { AtlaskitThemeProvider } from '@atlaskit/theme';

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

const RoutableRouteDescriptions = withRouter(RouteDescriptions);
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
      <Helmet
        titleTemplate="%s - Intuitive Math"
        defaultTitle="Intuitive Math"
      >
        <meta name="description" content="Intuitive Math Explainers" />
      </Helmet>
      <NavigatablePage />
    </div>
  );
}
