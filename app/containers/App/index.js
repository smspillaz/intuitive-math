/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LinearAlgebraPage from 'containers/LinearAlgebraPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import ResponsivePage from 'components/ResponsivePage';

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
        text: 'Matrices',
        href: '/linear-algebra/matrices',
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
        text: 'Eigenbasis',
        href: '/linear-algebra/eigenbasis',
      },
      {
        text: 'Diagonalization',
        href: '/linear-algebra/diagonalization',
      },
    ],
  },
];

const NavigatablePage = () => (
  <AtlaskitThemeProvider>
    <ResponsivePage
      title="Intuitive Math"
      sections={sections}
    >
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/linear-algebra" component={LinearAlgebraPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
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
