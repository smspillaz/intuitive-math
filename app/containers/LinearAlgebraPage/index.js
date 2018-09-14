/*
 * LinearAlgebraPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import CDNMathJaxContext from 'components/CDNMathJaxContext';

import injectReducer from 'utils/injectReducer';

import BasisSection from './Sections/Basis';
import ColumnSpaceSection from './Sections/ColumnSpace';
import DeterminantSection from './Sections/Determinant';
import EigenbasisSection from './Sections/Eigenbasis';
import EigenvaluesSection from './Sections/Eigenvalues';
import EigenvectorsSection from './Sections/Eigenvectors';
import EROSection from './Sections/ERO';
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

import reducer from './reducer';

export class LinearAlgebraPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <article>
        <Helmet>
          <title>Linear Algebra</title>
          <meta name="description" content="A primer on linear algebra" />
        </Helmet>
        <div>
          <CDNMathJaxContext>
            <Switch>
              <Route path={`${this.props.match.path}/spaces`} component={SpacesSection} />
              <Route path={`${this.props.match.path}/vectors`} component={VectorsSection} />
              <Route path={`${this.props.match.path}/matrices`} component={MatricesSection} />
              <Route path={`${this.props.match.path}/linear-independence`} component={LinearIndependenceSection} />
              <Route path={`${this.props.match.path}/subspaces`} component={SubspacesSection} />
              <Route path={`${this.props.match.path}/spans`} component={SpansSection} />
              <Route path={`${this.props.match.path}/basis`} component={BasisSection} />
              <Route path={`${this.props.match.path}/elementary-row-operations`} component={EROSection} />
              <Route path={`${this.props.match.path}/row-space`} component={RowSpaceSection} />
              <Route path={`${this.props.match.path}/column-space`} component={ColumnSpaceSection} />
              <Route path={`${this.props.match.path}/null-space`} component={NullSpaceSection} />
              <Route path={`${this.props.match.path}/determinant`} component={DeterminantSection} />
              <Route path={`${this.props.match.path}/inverses`} component={InversesSection} />
              <Route path={`${this.props.match.path}/transpose`} component={TransposeSection} />
              <Route path={`${this.props.match.path}/eigenvalues`} component={EigenvaluesSection} />
              <Route path={`${this.props.match.path}/eigenvectors`} component={EigenvectorsSection} />
              <Route path={`${this.props.match.path}/eigenbasis`} component={EigenbasisSection} />
            </Switch>
          </CDNMathJaxContext>
        </div>
      </article>
    );
  }
}

LinearAlgebraPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, null);

const withReducer = injectReducer({ key: 'linear-algebra', reducer });

export default compose(
  withReducer,
  withConnect,
  withRouter,
)(LinearAlgebraPage);
