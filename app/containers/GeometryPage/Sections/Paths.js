/*
 * Paths
 *
 * A section on paths and path lengths.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import {
  Parametric3DSurfaceVisualization,
} from 'components/ParametricVisualization';
import Section from 'components/Section';
import Vector from 'components/Vector';

import {
  segment1D,
} from 'utils/math';

const MeshLineParametricVisualization = ({ func, radius = 0.02, children }) => (
  <Parametric3DSurfaceVisualization
    func={(u, v) => {
      const [x, y, z] = func(v);
      return new Vector3((Math.cos(2 * Math.PI * u) * radius) + x,
                         (Math.sin(2 * Math.PI * u) * radius) + y,
                         z);
    }}
  >
    {children}
  </Parametric3DSurfaceVisualization>
);

MeshLineParametricVisualization.propTypes = {
  func: PropTypes.func.isRequired,
  radius: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const VectorApproximatedMeshLineParametricVisualization = ({ func, segments, ...props }) => (
  <MeshLineParametricVisualization
    func={func}
    {...props}
  >
    {segment1D(0.0, 1.0, segments).map(([tBegin, tEnd]) => {
      const base = func(tBegin);
      const target = func(tEnd);

      return (
        <Vector
          key={base.join('-')}
          base={new Vector3(...base)}
          position={new Vector3(...target)}
          color={0xff00ff}
        />
      );
    })}
  </MeshLineParametricVisualization>
);

VectorApproximatedMeshLineParametricVisualization.propTypes = {
  func: PropTypes.func.isRequired,
  segments: PropTypes.number.isRequired,
};

const PathsSection = () => (
  <Section title="Paths" anchor="paths">
    <p>
      Similar to parametric surfaces, paths are typically defined by using
      a parametric function mapping a single input, <MathJax.Node inline>t</MathJax.Node> to
      any number of dimensions through a vector valued function. However,
      instead of visualizing <MathJax.Node inline>t</MathJax.Node> as time,
      we instead visualize it by tracing out the entire path along the
      domain of <MathJax.Node inline>t</MathJax.Node>
    </p>
    <MeshLineParametricVisualization
      func={(t) => ([Math.cos(2 * Math.PI * t), Math.sin(2 * Math.PI * t), t])}
      slices={40}
      stacks={40}
    />
    <MathJax.Node>
      {'r(t) = (\\cos(2\\pi t), \\sin(2\\pi t), t)'}
    </MathJax.Node>
    <p>
      One question we might have about a path is how long it is. We can use
      integrals to work out how long a path is by breaking the problem into
      smaller sub-problems.
    </p>
    <p>
      Say for instance we take a very small section of that path
      like <MathJax.Node inline>{'dt'}</MathJax.Node>. You could imagine
      approximating that path using a vector, or a series of vectors in their
      place.
    </p>
    <VectorApproximatedMeshLineParametricVisualization
      func={(t) => ([Math.cos(2 * Math.PI * t), Math.sin(2 * Math.PI * t), t])}
      slices={40}
      stacks={40}
      segments={10}
    />
    <p>
      Because we can reduce the problem into a sum of vector lengths over a
      defined interval, we can also express the problem as an integral! To do this
      we integrate over the length of each vector for{' '}
      <MathJax.Node inline>dt</MathJax.Node>. We determine what each vector is
      by taking the gradient vector of the path at each point{' '}
      <MathJax.Node inline>t</MathJax.Node>. Then measure the length.
    </p>
    <MathJax.Node>
      {`\\int_0^t \\sqrt{\\frac{\\partial x}{\\partial t}^2 +
                         \\frac{\\partial y}{\\partial t}^2 +
                         \\frac{\\partial z}{\\partial t}^2}
       \\, dt`}
    </MathJax.Node>
    <p>
      So for instance, on our function above, we would have:
    </p>
    <MathJax.Node>
      {`\\int_0^t \\sqrt{(-2\\pi\\sin(2\\pi t))^2 +
                         (2\\pi\\cos(2\\pi t))^2 +
                         1}
       \\, dt`}
    </MathJax.Node>
    <p>
      Now considering that a negative squared is a positive, we can
      rewrite as follows:
    </p>
    <MathJax.Node>
      {`\\int_0^t \\sqrt{(2\\pi\\sin(2\\pi t))^2 +
                         (2\\pi\\cos^2(2\\pi t))^2 +
                         1}
       \\, dt`}
    </MathJax.Node>
    <p>
      And remembering that{' '}
      <MathJax.Node inline>{'\\sin^2(\\theta) + \\cos^2(\\theta) = 1'}</MathJax.Node> we
      can simplify:
    </p>
    <MathJax.Node>
      {`\\int_0^t \\sqrt{4\\pi^2 sin^2(2\\pi t) +
                         4\\pi^2 cos^2(2\\pi t) +
                         1}
       \\, dt`}
    </MathJax.Node>
    <MathJax.Node>
      {'\\int_0^t \\sqrt{4\\pi^2 (sin^2(2\\pi t) + cos^2(2\\pi t)) + 1} \\, dt'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\int_0^t \\sqrt{4\\pi^2 + 1} \\, dt = 6.36'}
    </MathJax.Node>
  </Section>
);

export default PathsSection;
