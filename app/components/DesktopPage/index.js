/**
 *
 * DesktopPage
 *
 * Layout optimized for desktops, with left-aligned navigation.
 */

import React from 'react';

import PropTypes from 'prop-types';

import NavigationItems from 'components/NavigationItems';

import GraphLineIcon from '@atlaskit/icon/glyph/graph-line';
import Page from '@atlaskit/page';
import Navigation, { AkContainerTitle } from '@atlaskit/navigation';

const DesktopNavigator = ({ title, sections }) => (
  <Navigation
    containerHeaderComponent={() => (
      <AkContainerTitle text={title} href="/" icon={<GraphLineIcon />} />
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
  children: PropTypes.arrayOf(PropTypes.children),
};

export default DesktopPage;
