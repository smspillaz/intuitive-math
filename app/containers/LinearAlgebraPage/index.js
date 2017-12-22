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

import PropTypes from 'prop-types';

import injectReducer from 'utils/injectReducer';

import reducer from './reducer';

const Section = ({ title, anchor, children }) => (
  <div>
    <a  // eslint-disable-line jsx-a11y/anchor-has-content
      name={anchor}
      aria-hidden
    />
    <h1>{title}</h1>
    <div>
      {children}
    </div>
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const VectorsSection = () => (
  <Section title="Vectors" anchor="vectors">
  </Section>
);

export class LinearAlgebraPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <article>
        <Helmet>
          <title>Linear Algebra</title>
          <meta name="description" content="A primer on linear algebra" />
        </Helmet>
        <div>
          <VectorsSection />
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
