/*
 * GeometryPage
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

import MathJax from 'react-mathjax';

import injectReducer from 'utils/injectReducer';

import PlanesSection from './Sections/Planes';

import reducer from './reducer';

export class GeometryPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <article>
        <Helmet>
          <title>Linear Algebra</title>
          <meta name="description" content="A primer on geometry" />
        </Helmet>
        <div>
          <MathJax.Context>
            <Switch>
              <Route path={`${this.props.match.path}/planes`} component={PlanesSection} />
            </Switch>
          </MathJax.Context>
        </div>
      </article>
    );
  }
}

GeometryPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, null);

const withReducer = injectReducer({ key: 'geometry', reducer });

export default compose(
  withReducer,
  withConnect,
  withRouter,
)(GeometryPage);
