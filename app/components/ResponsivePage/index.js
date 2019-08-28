/**
 *
 * ResponsivePage
 *
 * This component is just a wrapper around both DesktopPage and MobilePage
 * and picks the correct layout depending on the media type.
 */

import React from 'react';

import PropTypes from 'prop-types';

import { DesktopNavigator } from 'components/DesktopPage';
import { MobileNavigator } from 'components/MobilePage';

const ResponsivePage = ({ children, ...props }) => (
  <div>
    <DesktopNavigator {...props} />
    <MobileNavigator {...props} />
    {children}
  </div>
);

ResponsivePage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default ResponsivePage;
