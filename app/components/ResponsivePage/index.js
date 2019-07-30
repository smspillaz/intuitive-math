/**
 *
 * ResponsivePage
 *
 * This component is just a wrapper around both DesktopPage and MobilePage
 * and picks the correct layout depending on the media type.
 */

import React from 'react';

import Media from 'react-media';

import DesktopPage from 'components/DesktopPage';
import MobilePage from 'components/MobilePage';

const ResponsivePage = (props) => (
  (window && Object.keys(window).indexOf('matchMedia') !== -1) ? (
    <Media query="(min-width: 800px)">
      {(matches) => matches ? <DesktopPage {...props} /> : <MobilePage {...props} />}
    </Media>
  ) : (
    <DesktopPage {...props} />
  )
);

export default ResponsivePage;
