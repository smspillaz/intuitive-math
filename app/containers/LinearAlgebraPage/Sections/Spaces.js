/*
 * Spaces
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';

import MathJax from 'react-mathjax';

import AxisVisualization2D from 'components/AxisVisualization2D';
import AxisVisualization3D from 'components/AxisVisualization3D';
import { XAxis } from 'components/Axis';
import Section from 'components/Section';
import Strong from 'components/Strong';
import { BlankableVisualization } from 'components/Visualization';

const SpacesSection = () => (
  <Section title="Co-ordinate Systems" anchor="spaces">
    <div>
      <p>
        If we want to think about things geometrically, we need a way to
        describe where things are in space, where things are in relation to each
        other and how big they are.
      </p>
      <p>
        To do that, we can use a co-ordinate system. <Strong>Linear</Strong>{' '}
        co-ordinate systems have two properties - <Strong>units</Strong> and{' '}
        <Strong>dimensions</Strong>. The dimensions correspond to how many
        different combinations you can make with positions in your space. We
        will often see dimensions referred to by the canonical variables{' '}
        <MathJax.Node inline formula="x" />, <MathJax.Node inline formula="y" />
        , <MathJax.Node inline formula="z" /> and so on.
      </p>
      <AxisVisualization3D title="3D space" />
      <p>
        There exist infinitely many points in the other corresponding dimensions
        for a single point on one dimension. For instance, if you had a two
        dimensional space and you held <MathJax.Node inline formula="x" />{' '}
        constant at <MathJax.Node inline formula="x = 1" />, there are still
        infinitely many points you could pick on the{' '}
        <MathJax.Node inline formula="y" /> dimension. If you had a three
        dimensional space and held <MathJax.Node inline formula="x" /> at{' '}
        <MathJax.Node inline formula="x = 1" />, there are infinitely many
        points that you could choose in the <MathJax.Node inline formula="y" />{' '}
        dimension, and then after that, there are infinitely many points you
        could choose in the <MathJax.Node inline formula="z" /> dimension.
      </p>
      <p>
        In the <Strong>first</Strong> dimension you would just have a number
        line made up of every possible point:
      </p>
      <BlankableVisualization>
        <XAxis title="1D space" />
      </BlankableVisualization>
      <p>
        In <Strong>two</Strong> dimensional space, you have a co-ordinate plane
        made up of every possible line:
      </p>
      <AxisVisualization2D title="2D space" />
      <p>
        In <Strong>three</Strong> dimensional space, you have a volume made up
        of every possible plane:
      </p>
      <AxisVisualization3D title="3D space, again" />
      <p>
        Dimensions above the fourth are a little tricky to visualize, but the
        pattern continues. If two-dimensional space is a plane consisting of
        consists of every possible line and three-dimensional space is a volume
        consisting of every possible plane, then think about what that means for
        four-dimensional space. Or even five-dimensional space.
      </p>
      <p>The logic will generalize to an n-dimensional space</p>
      <p>
        For the sake of simplicitly, we will assume that all co-ordinate systems
        use the same units, meaning that movement of one step along one
        dimension and that if you rotated a system such that the one dimension
        became another, the steps would correspond.
      </p>
    </div>
  </Section>
);

export default SpacesSection;
