/*
 * GeometryPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route, withRouter } from 'react-router-dom';

import CDNMathJaxContext from 'components/CDNMathJaxContext';

import CylindersSection from './Sections/Cylinders';
import IntegralsSection from './Sections/Integrals';
import PathsSection from './Sections/Paths';
import ParametricSurfacesSection from './Sections/ParametricSurfaces';
import PlanesSection from './Sections/Planes';
import SpheresSection from './Sections/Spheres';
import SurfaceAreaSection from './Sections/SurfaceArea';

const GeometryPage = ({ match }) => (
  <article>
    <Helmet>
      <title>Linear Algebra</title>
      <meta name="description" content="A primer on geometry" />
    </Helmet>
    <div>
      <CDNMathJaxContext>
        <Switch>
          <Route path={`${match.path}/planes`} component={PlanesSection} />
          <Route
            path={`${match.path}/integrals`}
            component={IntegralsSection}
          />
          <Route
            path={`${match.path}/parametric`}
            component={ParametricSurfacesSection}
          />
          <Route path={`${match.path}/paths`} component={PathsSection} />
          <Route
            path={`${match.path}/surface-area`}
            component={SurfaceAreaSection}
          />
          <Route
            path={`${match.path}/cylinders`}
            component={CylindersSection}
          />
          <Route path={`${match.path}/spheres`} component={SpheresSection} />
        </Switch>
      </CDNMathJaxContext>
    </div>
  </article>
);

GeometryPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
};

export default withRouter(GeometryPage);
