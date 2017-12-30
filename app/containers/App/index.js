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

import PropTypes from 'prop-types';

import HomePage from 'containers/HomePage/Loadable';
import LinearAlgebraPage from 'containers/LinearAlgebraPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import NavigationState from 'components/NavigationState';

import { AtlaskitThemeProvider } from '@atlaskit/theme';
import Page from '@atlaskit/page';
import Navigation, { AkNavigationItemGroup, AkNavigationItem, AkContainerTitle } from '@atlaskit/navigation';

const Navigator = ({ title, sections }) => (
  <Navigation
    containerHeaderComponent={() => (
      <AkContainerTitle text={title} />
    )}
  >
    {sections.map((section) => (
      <AkNavigationItemGroup title={section.title} key={section.title}>
        {section.children.map((child) => (
          <AkNavigationItem text={child.text} href={child.href} key={child.href} />
         ))}
      </AkNavigationItemGroup>
     ))}
  </Navigation>
);

Navigator.propTypes = {
  title: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
  })),
};

const sections = [
  {
    title: 'Linear Algebra',
    children: [
      {
        text: 'Co-ordinate Systems',
        href: '/linear-algebra#spaces',
      },
      {
        text: 'Vectors',
        href: '/linear-algebra#vectors',
      },
      {
        text: 'Matrices',
        href: '/linear-algebra#matrices',
      },
      {
        text: 'Linear Independence',
        href: '/linear-algebra#linear-independence',
      },
      {
        text: 'Subspaces',
        href: '/linear-algebra#subspaces',
      },
      {
        text: 'Matrices',
        href: '/linear-algebra#matrices',
      },
      {
        text: 'Spans',
        href: '/linear-algebra#spans',
      },
      {
        text: 'Basis',
        href: '/linear-algebra#basis',
      },
      {
        text: 'Elementary Row Ops',
        href: '/linear-algebra#elementary-row-operations',
      },
      {
        text: 'Row Space',
        href: '/linear-algebra#row-space',
      },
      {
        text: 'Column Space / Range',
        href: '/linear-algebra#column-space',
      },
      {
        text: 'Null Space / Kernels',
        href: '/linear-algebra#null-space',
      },
      {
        text: 'Determinant',
        href: '/linear-algebra#determinant',
      },
      {
        text: 'Inverses',
        href: '/linear-algebra#inverses',
      },
      {
        text: 'Eigenvalues',
        href: '/linear-algebra#eigenvalues',
      },
      {
        text: 'Eigenvectors',
        href: '/linear-algebra#eigenvectors',
      },
      {
        text: 'Eigenbasis',
        href: '/linear-algebra#eigenbasis',
      },
      {
        text: 'Diagonalization',
        href: '/linear-algebra#diagonalization',
      },
    ],
  },
];

class NavigatablePage extends React.PureComponent {
  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object,
  };

  render() {
    return (
      <Page
        navigationWidth={this.context.navOpenState.width}
        navigation={<Navigator title={'Intuitive Math'} sections={sections} />}
      >
        <AtlaskitThemeProvider>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/linear-algebra" component={LinearAlgebraPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </AtlaskitThemeProvider>
      </Page>
    );
  }
}

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - Intuitive Math"
        defaultTitle="Intuitive Math"
      >
        <meta name="description" content="Intuitive Math Explainers" />
      </Helmet>
      <NavigationState
        renderNavigable={({ onNavResize }) => <NavigatablePage onNavResize={onNavResize} />}
      />
    </div>
  );
}
