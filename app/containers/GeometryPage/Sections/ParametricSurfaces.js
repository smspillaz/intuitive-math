/*
 * ParametricSurfaces
 *
 * A section parametric surfaces, which can be used to define any smooth surface
 * from two input co-ordinates.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import {
  Parametric2DPositionVisualization,
  Parametric3DPositionVisualization,
  Parametric3DSurfaceVisualization,
} from 'components/ParametricVisualization';
import Section from 'components/Section';
import Strong from 'components/Strong';

const ParametricSurfacesSection = () => (
  <Section title="Parametric Surfaces" anchor="parametric">
    <p>
      Previously, we had been describing surfaces just in terms of
      a single value, say, <MathJax.Node inline>z</MathJax.Node> for a given
      pair of co-ordinates <MathJax.Node inline>x</MathJax.Node> and{' '}
      <MathJax.Node inline>y</MathJax.Node>. These kinds of functions, called
      explict functions, only cross through each{' '}
      <MathJax.Node inline>x</MathJax.Node> and <MathJax.Node inline>y</MathJax.Node>{' '}
      point once and define a single <MathJax.Node inline>z</MathJax.Node> value
      for each of the. In general, they usually always look like some infinite
      plane with variable depth.
    </p>
    <p>
      However, this is not the only way to define a function. Just like a function
      can have multiple parameters which map to a single output, a function can
      also have mutiple outputs generated from a single input. Such a function
      is called a <Strong>Vector Valued Function</Strong> and such functions
      are usually <Strong>implicit</Strong> in nature.
    </p>
    <p>
      The simplest case is a function that describes the position of some
      particle in 2D space as a function of time, <MathJax.Node inline>t</MathJax.Node>.{' '}
      We cannot use the standard {'"y as a function of x"'} notation here since
      what we are concerned with is time, and at any given time the particle could
      be at any <MathJax.Node inline>x</MathJax.Node> and{' '}
      <MathJax.Node inline>y</MathJax.Node> co-ordinate pair. It is not always
      at a unique <MathJax.Node inline>y</MathJax.Node> position for its
      <MathJax.Node inline>x</MathJax.Node> value.
    </p>
    <Parametric2DPositionVisualization
      func={(t) => [Math.cos(t), Math.sin(t)]}
      min={0}
      max={Math.PI * 2}
    />
    <p>
      Thus, we have a sort of {'"hidden"'} parameter <MathJax.Node inline>t</MathJax.Node>{' '}
      which does not get its own axis in the output space, but still defines where
      a particle is over time.
    </p>
    <MathJax.Node>
      {'r(t) = (\\cos(t), \\sin(t))'}
    </MathJax.Node>
    <p>
      Note that by convention we usually specify a domain for the input parameter,
      in this case from <MathJax.Node inline>{'0'}</MathJax.Node> to
      {' '}<MathJax.Node inline>{'2 \\pi'}</MathJax.Node> to prevent having to
      trace out the path of the particle infinitely.
    </p>
    <MathJax.Node>
      {'r(t) = (\\cos(t), \\sin(t)), (0 \\le t \\le 2 \\pi)'}
    </MathJax.Node>
    <p>
      It is also perfectly possible to have a vector valued function that
      returns three output co-ordinates. This function, for instance, wraps
      around a cylinder.
    </p>
    <MathJax.Node>
      {'r(t) = (\\cos(t), \\sin(t), t), (0 \\le t \\le 2 \\pi)'}
    </MathJax.Node>
    <Parametric3DPositionVisualization
      func={(t) => [Math.cos(t), Math.sin(t), t / (Math.PI)]}
      min={0}
      max={Math.PI * 2}
    />
    <p>
      Now that we have defined those what a parametric function with a
      single parameter looks like in two and three dimensions, consider
      what a parametric function with two parameters looks like in three
      dimensions. Such a function will actually trace out a surface. You could
      imagine such a parametric function tracing out a patch in space made up
      of an infinite number of horizontal lines, then an infinite number of
      vertical lines.
    </p>
    <Parametric3DSurfaceVisualization
      func={(u, v) =>
        new Vector3(4 * (u ** 2),
                    3 * v,
                    ((u * v) - (v ** 2)) + ((u - 1.5) ** 2))
      }
      wireframe
    />
    <MathJax.Node>
      {'s(u, v) = (4u^2, 3v, uv - v^2 + (u - \\frac{3}{2})^2), (0 \\le u \\le 1, 0 \\le v \\le 1)'}
    </MathJax.Node>
    <p>
      What is nice about parametric surfaces is that they can wrap around themselves -
      remember that there is no requirement that we have a unique{' '}
      <MathJax.Node inline>z</MathJax.Node> co-ordinate for every{' '}
      <MathJax.Node inline>x</MathJax.Node> and <MathJax.Node inline>y</MathJax.Node>{' '}
      pair, so it is perfectly valid to start defining surfaces in terms
      of trigonometric functions.
    </p>
    <Parametric3DSurfaceVisualization
      func={(u, v) =>
        new Vector3(Math.cos(u * 2 * Math.PI),
                    Math.sin(u * 2 * Math.PI) + Math.sin(v * 4 * Math.PI),
                    v * 3)
      }
      wireframe
    />
    <MathJax.Node>
      {'s(u, v) = (\\cos(2\\pi u), \\sin(2\\pi u) + \\sin(4\\pi v), 3v), (0 \\le u \\le 1, 0 \\le v \\le 1)'}
    </MathJax.Node>
    <p>
      The surface above defines a cylinder and protrudes out with a depth of three. But
      it also oscillates on the y-axis as the depth protrudes out. Can you see why?
    </p>
  </Section>
);

export default ParametricSurfacesSection;

//This is a comment//
