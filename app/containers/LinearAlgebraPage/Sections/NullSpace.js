/*
 * NullSpace
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import AxisVisualization3D from 'components/AxisVisualization3D';
import CenteredParagraph from 'components/CenteredParagraph';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Plane from 'components/Plane';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';

const NullSpaceSection = () => (
  <Section title="Null Space" anchor="Null Space">
    <p>
      Like Row Space and Column Space, <Strong>Null Space</Strong> is another
      fundamental space in a matrix, being the set of all vectors which end up
      as zero when the transformation is applied to them.
    </p>
    <p>
      In cases where the transformation does not flatten all of space into a
      lower dimension, the null space will just contain the zero vector, since
      the only thing that can get transformed to zero is the zero vector itself.
    </p>
    <p>
      In other cases, there is an interesting compliment going on between both
      the <Strong>Column Space</Strong>, the <Strong>Row Space</Strong> and the{' '}
      <Strong>Null Space</Strong>.
    </p>
    <p>Consider the same case above where space was squished on to a plane.</p>
    <AxisVisualization3D
      title="Plane of all zero-solutions"
      render={() => (
        <group>
          <Vector position={new Vector3(2, 1, 0)} color={0xffff00} />
          <Vector position={new Vector3(0, 1, 2)} color={0xff00ff} />
          <Plane
            extents={[-1, 1]}
            a={2}
            b={-4}
            c={2}
            d={0}
            color={0x00ffff}
            transparent
            opacity={0.8}
          />
        </group>
      )}
    />
    <p>
      You can imagine that on every point of this plane, there was once a whole
      line full of vectors sticking out perpendicular to the plane that got
      squashed down to a single point. But there is a special line sticking out
      from the origin of all vectors that got squashed down on to the origin, or
      the zero vector. In this case, that line is the set of all vectors that
      ended up on the zero vector under the transformation, so it{' '}
      <Strong>is</Strong> the Null Space.
    </p>
    <AxisVisualization3D
      title="Plane of all zero-solutions (2)"
      render={() => (
        <group>
          <Vector position={new Vector3(-1, 2, -1)} color={0xffff00} />
          <Vector position={new Vector3(1, -2, 1)} color={0xffff00} />
          <Plane
            extents={[-1, 1]}
            a={2}
            b={-4}
            c={2}
            d={0}
            color={0x00ffff}
            transparent
            opacity={0.8}
          />
        </group>
      )}
    />
    <p>
      (Astute readers might instantly recognize that this line is the surface
      normal to the plane in both directions)
    </p>
    <p>
      Now on to actually computing the Null Space. What we are after is a
      solution to the system of equations, some valid values for{' '}
      <MathJax.Node inline formula="x, y, z" />, such that any linear
      combination of the vector made up of{' '}
      <MathJax.Node inline formula="x, y, z" /> gets squished down to the zero
      vector.
    </p>
    <p>
      To do that, we can just use <Strong>Elementary Row Operations</Strong> to
      get the matrix into a form that is a little easier to work with, and then
      try and solve for those values from there.
    </p>
    <p>Now, recall that our original matrix row-reduces as follows:</p>
    <CenteredParagraph>
      <MathJaxMatrix
        inline
        matrix={[
          [1, 2, 3],
          [2, 2, 2],
          [-1, 0, 1],
        ]}
      />
      ~
      <MathJaxMatrix
        inline
        matrix={[
          [0, 0, 0],
          [2, 1, 0],
          [0, 2, 4],
        ]}
      />
    </CenteredParagraph>
    <p>
      And recall that we are trying to solve the system when the result is the
      zero vector
    </p>
    <CenteredParagraph>
      <MathJaxMatrix
        inline
        matrix={[
          [0, 0, 0],
          [2, 1, 0],
          [0, 2, 4],
        ]}
      />
      <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
      <MathJaxMatrix inline matrix={[[0], [0], [0]]} />
    </CenteredParagraph>
    <p>
      Now, how do we solve for <MathJax.Node inline formula="x, y, z" />, from
      here? One thing to pay attention to are what we call{' '}
      <Strong>basic variables</Strong> and <Strong>free variables</Strong>. A
      basic variable has a leading entry, whereas a free variable does not.
    </p>
    <p>
      So in this case, our basic variables are{' '}
      <MathJax.Node inline formula="x" /> and
      <MathJax.Node inline formula="y" /> since we have a 2 in the first column
      of the second row and a 2 in the second column of the third row.
      <MathJax.Node inline formula="z" /> is not a leading column, so it is a{' '}
      <Strong>free variable</Strong>.
    </p>
    <p>
      In order to solve the system, we can rephrase the two basic variables in
      terms of the free variable:
    </p>
    <p>
      <MathJax.Node formula="2y + 4z = 0" />
      <MathJax.Node formula="y = -2z" />
    </p>
    <p>
      And solving for <MathJax.Node inline formula="x" />
      ...
    </p>
    <p>
      <MathJax.Node formula="2x + y = 0" />
      <MathJax.Node formula="2x - 2z = 0" />
      <MathJax.Node formula="-2z = -2x" />
      <MathJax.Node formula="x = z" />
    </p>
    <p>
      Now that we have a solution for <MathJax.Node inline formula="x, y" /> in
      terms of <MathJax.Node inline formula="z" />, we can express it as a
      vector like this:
    </p>
    <MathJaxMatrix matrix={[['z'], ['-2z'], ['z']]} />
    <p>Or more specifically:</p>
    <CenteredParagraph>
      <MathJaxMatrix inline matrix={[[1], [-2], [1]]} />
      <MathJax.Node inline formula="z" />
    </CenteredParagraph>
    <p>
      Thus, the vector <MathJaxMatrix inline matrix={[[1], [-2], [1]]} /> is the
      basis for the <Strong>Null Space</Strong> of the transformation. You will
      also notice that this is the exact same vector we found earlier as the
      normal vector to the plane.
    </p>
    <AxisVisualization3D
      title="Normal vector to plane"
      render={() => (
        <group>
          <Vector position={new Vector3(1, -2, 1)} color={0xffff00} />
          <Plane
            extents={[-1, 1]}
            a={2}
            b={-4}
            c={2}
            d={0}
            color={0x00ffff}
            transparent
            opacity={0.8}
          />
        </group>
      )}
    />
  </Section>
);

export default NullSpaceSection;
