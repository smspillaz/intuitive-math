/*
 * LinearAlgebraPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import CDNMathJaxContext from 'components/CDNMathJaxContext';

import BasisSection from './Sections/Basis';
import ColumnSpaceSection from './Sections/ColumnSpace';
import DeterminantSection from './Sections/Determinant';
import EigenbasisSection from './Sections/Eigenbasis';
import EigenvaluesSection from './Sections/Eigenvalues';
import EigenvectorsSection from './Sections/Eigenvectors';
import EROSection from './Sections/ERO';
import HomogeneousSection from './Sections/Homogeneous';
import InversesSection from './Sections/Inverses';
import LinearIndependenceSection from './Sections/LinearIndependence';
import MatricesSection from './Sections/Matrices';
import NullSpaceSection from './Sections/NullSpace';
import RowSpaceSection from './Sections/RowSpace';
import SpacesSection from './Sections/Spaces';
import SpansSection from './Sections/Spans';
import SubspacesSection from './Sections/Subspaces';
import TransposeSection from './Sections/Transpose';
import VectorsSection from './Sections/Vectors';

const LinearAlgebraPage = ({ match }) => (
  <article>
    <Helmet>
      <title>Linear Algebra</title>
      <meta name="description" content="A primer on linear algebra" />
    </Helmet>
    <div>
      <CDNMathJaxContext>
        <Switch>
          <Route path={`${match.path}/spaces`} component={SpacesSection} />
          <Route path={`${match.path}/vectors`} component={VectorsSection} />
          <Route path={`${match.path}/matrices`} component={MatricesSection} />
          <Route
            path={`${match.path}/linear-independence`}
            component={LinearIndependenceSection}
          />
          <Route
            path={`${match.path}/subspaces`}
            component={SubspacesSection}
          />
          <Route path={`${match.path}/spans`} component={SpansSection} />
          <Route path={`${match.path}/basis`} component={BasisSection} />
          <Route
            path={`${match.path}/elementary-row-operations`}
            component={EROSection}
          />
          <Route path={`${match.path}/row-space`} component={RowSpaceSection} />
          <Route
            path={`${match.path}/column-space`}
            component={ColumnSpaceSection}
          />
          <Route
            path={`${match.path}/null-space`}
            component={NullSpaceSection}
          />
          <Route
            path={`${match.path}/determinant`}
            component={DeterminantSection}
          />
          <Route path={`${match.path}/inverses`} component={InversesSection} />
          <Route
            path={`${match.path}/transpose`}
            component={TransposeSection}
          />
          <Route
            path={`${match.path}/eigenvalues`}
            component={EigenvaluesSection}
          />
          <Route
            path={`${match.path}/eigenvectors`}
            component={EigenvectorsSection}
          />
          <Route
            path={`${match.path}/eigenbasis`}
            component={EigenbasisSection}
          />
          <Route
            path={`${match.path}/homogeneous`}
            component={HomogeneousSection}
          />
        </Switch>
      </CDNMathJaxContext>
    </div>
  </article>
);

LinearAlgebraPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
};

export default withRouter(LinearAlgebraPage);
