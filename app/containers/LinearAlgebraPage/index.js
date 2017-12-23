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

import styled from 'styled-components';
import MathJax from 'react-mathjax';

import Section from 'components/Section';

import injectReducer from 'utils/injectReducer';

import reducer from './reducer';

const Strong = styled.span`
  font-weight: bold
`;

const SpacesSection = () => (
  <Section title="Co-ordinate Systems" anchor="spaces">
    <div>
      <p>
        If we want to think about things geometrically, we need a way to describe
        where things are in space, where things are in relation to each other
        and how big they are.
      </p>
      <p>
        To do that, we can use a co-ordinate system. <Strong>Linear</Strong>{' '}
        co-ordinate systems have two properties - <Strong>units</Strong> and{' '}
        <Strong>dimensions</Strong>. The dimensions correspond to how many different
        combinations you can make with positions in your space. We will often
        see dimensions referred to by the canonical variables{' '}
        <MathJax.Node inline>{'x'}</MathJax.Node>, <MathJax.Node inline>{'y'}</MathJax.Node>,{' '}
        <MathJax.Node inline>{'z'}</MathJax.Node> and so on.
      </p>
      <p>
        There exist infinitely many points in the other corresponding
        dimensions for a single point on one dimension. For instance, if you
        had a two dimensional space and you held <MathJax.Node inline>{'x'}</MathJax.Node>
        constant at <MathJax.Node inline>{'x = 1'}</MathJax.Node>, there are
        still infinitely many points you could pick on the <MathJax.Node inline>{'y'}</MathJax.Node>{' '}
        dimension. If you had a three dimensional space and held <MathJax.Node inline>{'x'}</MathJax.Node>{' '}
        at <MathJax.Node inline>{'x = 1'}</MathJax.Node>, there are infinitely
        many points that you could choose in the <MathJax.Node inline>{'y'}</MathJax.Node>{' '}
        dimension, and then after that, there are infinitely many points you could
        choose in the <MathJax.Node inline>{'z'}</MathJax.Node> dimension.
      </p>
      <p>
        For the sake of simplicitly, we will assume
        that all co-ordinate systems use the same units, meaning that movement
        of one step along one dimension and that if you rotated a system
        such that the one dimension became another, the steps would correspond.
      </p>
    </div>
  </Section>
);

const VectorsSection = () => (
  <Section title="Vectors" anchor="vectors">
    <div>Hello, world</div>
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
          <MathJax.Context>
            <div>
              <SpacesSection />
              <VectorsSection />
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
