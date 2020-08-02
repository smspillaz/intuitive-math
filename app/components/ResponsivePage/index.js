/**
 *
 * ResponsivePage
 *
 * This component is just a wrapper around both DesktopPage and MobilePage
 * and picks the correct layout depending on the media type.
 */

import React from 'react';
import PropTypes from 'prop-types';

import DesktopPage from 'components/DesktopPage';

const ResponsivePage = ({ children, ...props }) => (
  <div>
    <DesktopPage {...props}>{children}</DesktopPage>
  </div>
);

ResponsivePage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default ResponsivePage;
