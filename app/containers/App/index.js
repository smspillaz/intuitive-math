/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LinearAlgebraPage from 'containers/LinearAlgebraPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Navigation, { AkNavigationItemGroup, AkNavigationItem, AkContainerTitle } from '@atlaskit/navigation';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const Navigator = () => (
  <Navigation
    containerHeaderComponent={() => (
      <AkContainerTitle text="Intuitive Math" />
    )}
  >
    <AkNavigationItemGroup title="Linear Algebra">
      <AkNavigationItem text="Vectors" href="/linear-algebra#vectors" />
      <AkNavigationItem text="Matrices" href="/linear-algebra#matrices" />
      <AkNavigationItem text="Linear Independence" href="/linear-algebra#linear-independence" />
      <AkNavigationItem text="Subspaces" href="/linear-algebra#subspaces" />
      <AkNavigationItem text="Spans" href="/linear-algebra#spans" />
      <AkNavigationItem text="Basis" href="/linear-algebra#basis" />
      <AkNavigationItem text="Row Space" href="/linear-algebra#row-space" />
      <AkNavigationItem text="Column Space / Range" href="/linear-algebra#column-space" />
      <AkNavigationItem text="Null Space / Kernels" href="/linear-algebra#null-space" />
      <AkNavigationItem text="Determinant" href="/linear-algebra#determinant" />
      <AkNavigationItem text="Inverses" href="/linear-algebra#inverses" />
      <AkNavigationItem text="Eigenvalues" href="/linear-algebra#eigenvalues" />
      <AkNavigationItem text="Eigenvectors" href="/linear-algebra#eigenvectors" />
      <AkNavigationItem text="Eigenbasis" href="/linear-algebra#eigenbasis" />
      <AkNavigationItem text="Diagonalization" href="/linear-algebra#diagonalization" />
    </AkNavigationItemGroup>
  </Navigation>
);

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Navigator>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/linear-algebra" component={LinearAlgebraPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Navigator>
    </AppWrapper>
  );
}
