/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Section from 'components/Section';

import injectReducer from 'utils/injectReducer';

import reducer from './reducer';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div>
          <Section title="Intuitive Math Primer" anchor="intuitive">
            <p>Hello there,</p>
            <p>
              This is a math primer that is a little different. It is written
              using technologies such as React and WebGL with animated explanations
              of fields like Linear Algebra, designed to help you develop a
              visual intuition.
            </p>
            <p>
              I mainly wrote this to help me consolidate my own notes on the
              subjects since I personally have a hard time instantly developing
              an intuition for math. And without the intuition, I have a hard time
              applying math to problems because I will not know what the tools
              are actually for.
            </p>
            <p>
              I hope you find it useful and feel free to
              let me know if I got anything wrong or would like something to
              be expanded in a little more detail at s@polysquare.org
            </p>
            <p>
              Note that due to the limit on the number of concurrently running
              WebGL contexts implemented by most browsers, I have tried to use
              some smarts to disable contexts when they are not fully in view. So far,
              I have tested that this worked on Chrome and Firefox Quantum.
            </p>
            <p>
              If you are interested in how this was made, you can find the
              source code for it on its{' '}
              <a href="https://github.com/smspillaz/intuitive-math">GitHub repository</a>.
            </p>
          </Section>
        </div>
      </article>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, null);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePage);
