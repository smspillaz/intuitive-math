/*
 * LinearAlgebraPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';

import PropTypes from 'prop-types';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import AxisVisualization3D from 'components/AxisVisualization3D';
import InterpolatedAnimation from 'components/InterpolatedAnimation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Plane from 'components/Plane';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';

const TriplePlanes = ({ first, second, third, extents = [-2, 2] }) => (
  <AxisVisualization3D
    render={() => (
      <group>
        <Plane extents={extents} a={first[0]} b={first[1]} c={first[2]} d={first[3]} color={0xffff00} transparent opacity={0.8} />
        <Plane extents={extents} a={second[0]} b={second[1]} c={second[2]} d={second[3]} color={0xff00ff} transparent opacity={0.8} />
        <Plane extents={extents} a={third[0]} b={third[1]} c={third[2]} d={third[3]} color={0x00ffff} transparent opacity={0.8} />
      </group>
    )}
  />
);

TriplePlanes.propTypes = {
  first: PropTypes.arrayOf(PropTypes.number).isRequired,
  second: PropTypes.arrayOf(PropTypes.number).isRequired,
  third: PropTypes.arrayOf(PropTypes.number).isRequired,
  extents: PropTypes.arrayOf(PropTypes.number),
};

const EROVisualization = ({ first, second, third, ...props }) => (
  <div>
    <p style={{ textAlign: 'center' }}>
      <MathJaxMatrix
        inline
        matrix={[
          [[first[0]], [first[1]], [first[2]]],
          [[second[0]], [second[1]], [second[2]]],
          [[third[0]], [third[1]], [third[2]]],
        ]}
      />
      <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
      <MathJax.Node inline>=</MathJax.Node>
      <MathJaxMatrix inline matrix={[[first[3]], [second[3]], [third[3]]]} />
    </p>
    <TriplePlanes first={first} second={second} third={third} {...props} />
  </div>
);

EROVisualization.propTypes = {
  first: PropTypes.arrayOf(PropTypes.number).isRequired,
  second: PropTypes.arrayOf(PropTypes.number).isRequired,
  third: PropTypes.arrayOf(PropTypes.number).isRequired,
  extents: PropTypes.arrayOf(PropTypes.number),
};

const EROSection = () => (
  <Section title="Elementary Row Operations" anchor="elementary-row-operations">
    <p>
      If we think about a matrix as a system of equations, recall that there
      are certain things that we can do to solve for the variables in that
      system of equations. For instance, if we have a system of equations
      given by:
    </p>
    <MathJax.Node>x + y = 2</MathJax.Node>
    <MathJax.Node>x - z = 1</MathJax.Node>
    <MathJax.Node>y - z = 0</MathJax.Node>
    <p>
      We could try to solve those equations either by using substition or
      by adding and subtracting scalar multiples of entire equations
      to and from each other. Or we could express the entire system as a
      matrix-vector product and try to solve for the vector in the middle:
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 1, 0], [1, 0, -1], [0, 1, -1]]} />
      <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
      <MathJax.Node inline>=</MathJax.Node>
      <MathJaxMatrix inline matrix={[[2], [1], [0]]} />
    </p>
    <p>
      If you visualize the three planes in the system, you will notice that they
      intersect at a point.
    </p>
    <TriplePlanes
      first={[1, 1, 0, 2]}
      second={[1, 0, -1, 1]}
      third={[0, 1, -1, 0]}
    />
    <p>
      Now, if we recall that any vector multiplied by the three standard basis
      vectors in matrix form, <MathJax.Node inline>\hat i, \hat j, \hat k</MathJax.Node>{' '}
      is just itself, it stands to reason that if add and subtract scalar multiples
      of each component to recover our basis vectors that we will eventually arrive
      at a point where we have the identity matrix multiplied by some vector
      which gives us a point, implying that the point is equal to the resultant
      vector.
    </p>
    <p>
      At every point where we apply these operations, observe what happens to
      the three planes and to the vectors defined by the columns of the matrix.
    </p>
    <p>
      First, subtract the first row from the second:
    </p>
    <EROVisualization
      first={[1, 1, 0, 2]}
      second={[0, -1, -1, -1]}
      third={[0, 1, -1, 0]}
    />
    <p>Then, add the second row to the third</p>
    <EROVisualization
      first={[1, 1, 0, 2]}
      second={[0, -1, -1, -1]}
      third={[0, 0, -2, -1]}
    />
    <p>Now, subtract half of the third row from the second</p>
    <EROVisualization
      first={[1, 1, 0, 2]}
      second={[0, -1, 0, -0.5]}
      third={[0, 0, -2, -1]}
    />
    <p>Add the second row to the first</p>
    <EROVisualization
      first={[1, 0, 0, 1.5]}
      second={[0, -1, 0, -0.5]}
      third={[0, 0, -2, -1]}
    />
    <p>Clean everything up by dividing the second row by -1 and the third row by -2</p>
    <EROVisualization
      first={[1, 0, 0, 1.5]}
      second={[0, 1, 0, 0.5]}
      third={[0, 0, 1, 0.5]}
    />
    <p>
      As you will have noticed, the intersection between the planes is the point
      of the solution, but now we can simply just express that as the vector{' '}
      <MathJaxMatrix inline matrix={[['3 \\over 2'], ['1 \\over 2'], ['1 \\over 2']]} />
    </p>
    <InterpolatedAnimation
      values={{
        xInterp: { begin: 0, end: 1.5 },
        yInterp: { begin: 0, end: 0.5 },
        zInterp: { begin: 0, end: 0.5 },
        fade: { begin: 1, end: 0 },
      }}
      render={({ xInterp, yInterp, zInterp, fade }) => (
        <AxisVisualization3D
          render={() => (
            <group>
              <Vector position={new Vector3(xInterp.value, yInterp.value, zInterp.value)} color={0xffff00} />
              <Plane extents={[-2, 2]} a={1} b={0} c={0} d={1.5} color={0xffff00} transparent opacity={fade.value} />
              <Plane extents={[-2, 2]} a={0} b={1} c={0} d={0.5} color={0xff00ff} transparent opacity={fade.value} />
              <Plane extents={[-2, 2]} a={0} b={0} c={1} d={0.5} color={0x00ffff} transparent opacity={fade.value} />
            </group>
          )}
        />
      )}
    />
    <p>
      As we will see, <Strong>Elementary Row Operations</Strong> can help us solve
      all sorts of problems where we need to determine a vector that satisfies
      a given solution.
    </p>
  </Section>
);

export default EROSection;
