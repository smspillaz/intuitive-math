/*
 * Basis
 *
 * A section describing how bases work.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import { Axis } from 'components/Axis';
import AxisVisualization3D from 'components/AxisVisualization3D';
import InterpolatedAnimation from 'components/InterpolatedAnimation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';
import Visualization from 'components/Visualization';

const BasisSection = () => (
  <Section title="Basis" anchor="basis">
    <p>
      Knowing that a span is the space <Strong>spanned</Strong> by a set of
      vectors, we might want to go the other way and find a set of vectors that
      describe the space. That set of vectors will be called a <Strong>basis</Strong>.
    </p>
    <p>
      Finding that set only requires that we impose two conditions we already
      know about on a set of vectors.
    </p>
    <ul>
      <li>The set of vectors must span the space we want to describe.</li>
      <li>
        The set of vectors must be linearly independent: that is to say that
        there must not be any <Strong>redundant</Strong> vectors in the set.
      </li>
    </ul>
    <p>
      With these definitions in mind, we can already make some observations
      about the basis.
    </p>
    <ul>
      <li>
        An <MathJax.Node inline>n</MathJax.Node>-dimensional space must have at
        least <MathJax.Node inline>n</MathJax.Node> vectors in its basis, such
        that it could span the entire space.
      </li>
      <li>
        An <MathJax.Node inline>n</MathJax.Node>-dimensional space must have at
        most <MathJax.Node inline>n</MathJax.Node> vectors in its basis such that
        no vector is linearly dependant on another.
      </li>
    </ul>
    <p>
      Generally speaking, if you have some <MathJax.Node inline>n</MathJax.Node>-dimensional space
      then it should always be possible to, using <MathJax.Node inline>n</MathJax.Node>{' '}
      vectors that form a basis, reach every possible point in that space with
      linear combinations of those <MathJax.Node inline>n</MathJax.Node> vectors.
    </p>
    <p>
      It should come as no surprise that in 3-dimensional space, the unit vectors
      <MathJaxMatrix inline matrix={[[1], [0], [0]]} />{' '}
      <MathJaxMatrix inline matrix={[[0], [1], [0]]} />{' '}
      <MathJaxMatrix inline matrix={[[0], [0], [1]]} />{' '}
      are a basis for the three dimensional space. It should be obvious that
      by scaling each of them by a different constant and adding them all together
      that any point in that space can be reached.
    </p>
    <AxisVisualization3D
      render={() => (
        <group>
          <Vector position={new Vector3(1, 0, 0)} color={0xffff00} />
          <Vector position={new Vector3(0, 1, 0)} color={0xff00ff} />
          <Vector position={new Vector3(0, 0, 1)} color={0xffff00} />
        </group>
      )}
    />
    <p>
      Because of that, we have special names for them:{' '}
      <MathJax.Node inline>\hat i</MathJax.Node>,{' '}
      <MathJax.Node inline>\hat j</MathJax.Node> and{' '}
      <MathJax.Node inline>\hat k</MathJax.Node>.
    </p>
    <p>
      The unit vectors are not the only valid basis for an n-dimensional
      space, however. Those vectors could be scaled by any amount and they
      would still be a basis, where we could combine those three to reach
      any other vector.
    </p>
    <InterpolatedAnimation
      values={{
        xInterp: { begin: 0, end: 2 },
        yInterp: { begin: 0, end: 4 },
        zInterp: { begin: 0, end: 1 },
      }}
      render={({ xInterp, yInterp, zInterp }) => (
        <AxisVisualization3D
          render={() => (
            <group>
              <Vector position={new Vector3(xInterp.value, 0, 0)} color={0xffff00} />
              <Vector position={new Vector3(0, yInterp.value, 0)} color={0xff00ff} />
              <Vector position={new Vector3(0, 0, zInterp.value)} color={0x00ffff} />
            </group>
          )}
        />
      )}
    />
    <p>
      In fact, you could imagine squeezing all of those vectors in towards
      a line and as long as they all point in different directions, it is still
      possible to combine them in such a way such that it is possible to reach
      any point in the space with them.
    </p>
    <InterpolatedAnimation
      values={{
        xyInterp: { begin: 0, end: 1 },
        xzInterp: { begin: 0, end: 1 },
        yxInterp: { begin: 0, end: 1 },
        yzInterp: { begin: 0, end: 1 },
        zxInterp: { begin: 0, end: 1 },
        zyInterp: { begin: 0, end: 1 },
      }}
      render={({ xyInterp, xzInterp, yxInterp, yzInterp, zxInterp, zyInterp }) => (
        <AxisVisualization3D
          render={() => (
            <group>
              <Vector position={new Vector3(1, xyInterp.value, xzInterp.value)} color={0xffff00} />
              <Vector position={new Vector3(yxInterp.value, 1, yzInterp.value)} color={0xff00ff} />
              <Vector position={new Vector3(zxInterp.value, zyInterp.value, 1)} color={0x00ffff} />
            </group>
          )}
        />
      )}
    />
    <p>
      It makes more sense if you think about what happens to the rest of space
      if you apply the same change in the basis vectors to every other part of
      the space.
    </p>
    <InterpolatedAnimation
      values={{
        xyInterp: { begin: 0, end: 1 },
        xzInterp: { begin: 0, end: 1 },
        yxInterp: { begin: 0, end: 1 },
        yzInterp: { begin: 0, end: 1 },
        zxInterp: { begin: 0, end: 1 },
        zyInterp: { begin: 0, end: 1 },
      }}
      render={({ xyInterp, xzInterp, yxInterp, yzInterp, zxInterp, zyInterp }) => (
        <Visualization>
          <Axis basis={[1, xyInterp.value, xzInterp.value]} extents={[-10, 10]} color={0xff0000} />
          <Axis basis={[yxInterp.value, 1, yzInterp.value]} extents={[-10, 10]} color={0x00ff00} />
          <Axis basis={[zxInterp.value, zyInterp.value, 1]} extents={[-10, 10]} color={0x0000ff} />
        </Visualization>
      )}
    />
    <p>
      It is only when all of space is flattened on to a line or a plane that
      those vectors stop being a basis for the rest of the space.
    </p>
  </Section>
);

export default BasisSection;
