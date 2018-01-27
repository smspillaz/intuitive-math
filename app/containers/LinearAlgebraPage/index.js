/*
 * LinearAlgebraPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import MathJax from 'react-mathjax';

import injectReducer from 'utils/injectReducer';

import BasisSection from './Sections/Basis';
import ColumnSpaceSection from './Sections/ColumnSpace';
import DeterminantSection from './Sections/Determinant';
import EROSection from './Sections/ERO';
import InversesSection from './Sections/Inverses';
import LinearIndependenceSection from './Sections/LinearIndependence';
import MatricesSection from './Sections/Matrices';
import NullSpaceSection from './Sections/NullSpace';
import RowSpaceSection from './Sections/RowSpace';
import SpacesSection from './Sections/Spaces';
import SpansSection from './Sections/Spans';
import SubspacesSection from './Sections/Subspaces';
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
          <MathJax.Context>
            <div>
              <SpacesSection />
              <VectorsSection />
              <MatricesSection />
              <LinearIndependenceSection />
              <SubspacesSection />
              <SpansSection />
              <BasisSection />
              <EROSection />
              <RowSpaceSection />
              <ColumnSpaceSection />
              <NullSpaceSection />
              <DeterminantSection />
              <InversesSection />
            </div>
          </MathJax.Context>
        </div>
      </article>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, null);

const withReducer = injectReducer({ key: 'linear-algebra', reducer });

export default compose(
  withReducer,
  withConnect,
)(LinearAlgebraPage);
