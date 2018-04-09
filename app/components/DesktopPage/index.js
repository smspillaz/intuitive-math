/**
 *
 * DesktopPage
 *
 * Layout optimized for desktops, with left-aligned navigation.
 */

import React from 'react';

import PropTypes from 'prop-types';

import NavigationItems from 'components/NavigationItems';
import Navigation, { AkContainerTitle } from 'components/MonkeyPatchedNavigation';

import GraphLineIcon from '@atlaskit/icon/glyph/graph-line';
import Page from '@atlaskit/page';

const DesktopNavigator = ({ title, sections }) => (
  <Navigation
    containerHeaderComponent={() => (
      <AkContainerTitle
        text={title}
        href="/"
        icon={<GraphLineIcon label="Intuitive Math" />}
      />
    )}
  >
    <NavigationItems sections={sections} />
  </Navigation>
);

DesktopNavigator.propTypes = {
  title: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
  })),
};

const DesktopPage = ({ children, ...props }) => (
  <Page
    navigation={
      <DesktopNavigator {...props} />
    }
  >
    {children}
  </Page>
);

DesktopPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default DesktopPage;
