/*
 * Cylinders
 *
 * A section on cylinders and cylindrical co-ordinates.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import {
  Parametric2DSurfaceVisualization,
  Parametric3DSurfaceVisualization,
} from 'components/ParametricVisualization';
import Section from 'components/Section';
import SurfaceNormalsIntegral from 'components/SurfaceNormalsIntegral';
import Strong from 'components/Strong';

const CylindersSection = () => (
  <Section title="Cylinders" anchor="cylinders">
    <p>
      By changing our co-ordinate system using parametric surfaces we can
      represent other types of shapes more easily. Recall that if we want
      to represent a circle in cartesian co-ordinates we would have to
      use an implicit function, such as:
    </p>
    <MathJax.Node>
      {'x^2 + y^2 = 1'}
    </MathJax.Node>
    <p>
      Such functions are very inconvenient to work with, because if we
      were to represent the function in terms of <MathJax.Node inline>x</MathJax.Node>{' '}
      or <MathJax.Node inline>y</MathJax.Node> it would have square roots in it,
      which can have either a positive or negative value.
    </p>
    <MathJax.Node>
      {'y = \\sqrt{1 + x^2}'}
    </MathJax.Node>
    <p>
      Instead, it is much easier to represent circular geometry using
      a <Strong>polar co-ordinates</Strong> in terms of <MathJax.Node inline>r</MathJax.Node>{' '}
      (the radius) and <MathJax.Node inline>{'\\theta'}</MathJax.Node> (the angle between
      1 and <MathJax.Node inline>{'2\\pi'}</MathJax.Node>). Then we can can use a the
      following change of co-ordinates to express our circle:
    </p>
    <p>
      <MathJax.Node inline>{'x = r\\cos(\\theta)'}</MathJax.Node>
    </p>
    <p>
      <MathJax.Node inline>{'y = r\\cos(\\theta)'}</MathJax.Node>
    </p>
    <p>
      Or the other way around:
    </p>
    <p>
      <MathJax.Node inline>{'r = \\sqrt{x^2 + y^2}'}</MathJax.Node>
    </p>
    <p>
      <MathJax.Node inline>{'theta = \\tan^-1(y / x)'}</MathJax.Node>
    </p>
    <p>
      So, converting from cartesian co-ordinates to polar co-ordinates,
      our circle is:
    </p>
    <MathJax.Node>{'(r, \\theta) = (1, \\theta)'}</MathJax.Node>
    <Parametric2DSurfaceVisualization
      func={(u, v) => new Vector3(u * Math.cos(2 * Math.PI * v),
                                  u * Math.sin(2 * Math.PI * v),
                                  0)}
      wireframe
    />
    <p>
      Representing our co-ordinate system in this way has important
      advantages. Since there are no square roots, it is a lot
      easier to take the integral of a circle and find its area:
    </p>
    <MathJax.Node>{'\\int_0^{2\\pi} \\int_0^1 r \\, dr \\, d\\theta'}</MathJax.Node>
    <MathJax.Node>{'\\int_0^{2\\pi} \\frac{1}{2}r^2 \\, d\\theta'}</MathJax.Node>
    <MathJax.Node>{'\\pi r^2'}</MathJax.Node>
    <p>
      This should look familiar!
    </p>
    <p>
      We can now extend this to three dimensions to define a cylinder
      using cylindrical co-ordinates. Cylindrical co-ordinates are effective
      a cartesian extension of polar co-ordinates, so there is a radius,
      <MathJax.Node inline>{'\\theta'}</MathJax.Node> and a
      <MathJax.Node inline>{'z'}</MathJax.Node> co-ordinate.
    </p>
    <MathJax.Node>{'s(r, \\theta, z)'}</MathJax.Node>
    <p>
      The translation from cylindrical to cartesian co-ordinates is as follows:
    </p>
    <p>
      <MathJax.Node inline>{'x = r\\cos(\\theta)'}</MathJax.Node>
    </p>
    <p>
      <MathJax.Node inline>{'y = r\\cos(\\theta)'}</MathJax.Node>
    </p>
    <p>
      <MathJax.Node inline>{'z = z'}</MathJax.Node>
    </p>
    <p>
      And from cartesian to cylindrical we have:
    </p>
    <p>
      <MathJax.Node inline>{'r = \\sqrt{x^2 + y^2}'}</MathJax.Node>
    </p>
    <p>
      <MathJax.Node inline>{'\\theta = \\tan^{-1}(\\frac{y}{x})'}</MathJax.Node>
    </p>
    <p>
      <MathJax.Node inline>{'z = z'}</MathJax.Node>
    </p>
    <p>
      For instance, a cylinder with height 1, and radius 2 is defined
      as:
    </p>
    <MathJax.Node>{'s(r, \\theta, z) = (2, \\theta, 1)'}</MathJax.Node>
    <Parametric3DSurfaceVisualization
      func={(u, v) => new Vector3(2 * Math.cos(2 * Math.PI * v),
                                  2 * Math.sin(2 * Math.PI * v),
                                  1 * u)}
      wireframe
    />
    <p>
      If we want to find the volume of a cylinder, we must use a{' '}
      <Strong>triple integral</Strong> as the input space has three parameters.
    </p>
    <MathJax.Node>
      {'\\int_0^1 \\int_0^{2\\pi} \\int_0^2 r \\times  \\, dr \\, d\\theta \\, dz'}
    </MathJax.Node>
    <p>
      Note also that we need to apply a density correction which is the determinant
      of the Jacobian matrix for each component. In the case of a cylinder,
      that is <MathJax.Node inline>r</MathJax.Node>, as we have:
    </p>
    <MathJax.Node>
      {'r\\cos^2(\\theta) + r\\sin^2(\\theta) = r'}
    </MathJax.Node>
    <p>
      Finding the surface area of a cylinder requires us to find a parameterization
      in terms of two parameters. Because this cylinder has a constant radius,
      we can use a parameterization that keeps <MathJax.Node inline>r</MathJax.Node> constant.
    </p>
    <MathJax.Node>{'s(u, v) = (2, 2\\pi v, u)'}</MathJax.Node>
    <p>
      From there we can use the same approach to find the length of the
      normal vector at every point.
    </p>
    <Parametric3DSurfaceVisualization
      func={(u, v) => new Vector3(2 * Math.cos(2 * Math.PI * v),
                                  2 * Math.sin(2 * Math.PI * v),
                                  1 * u)}
      wireframe
    >
      <SurfaceNormalsIntegral
        uMin={0}
        uMax={1}
        vMin={0}
        vMax={1}
        segments={10}
        func={(u, v) => new Vector3(2 * Math.cos(2 * Math.PI * v),
                                    2 * Math.sin(2 * Math.PI * v),
                                    1 * u)}
        uGradientVecFunc={() => new Vector3(0, 0, 1)}
        vGradientVecFunc={(u, v) => new Vector3(-8 * Math.PI * Math.cos(2 * Math.PI * v) * Math.sin(2 * Math.PI * v),
                                                8 * Math.PI * Math.sin(2 * Math.PI * v) * Math.cos(2 * Math.PI * v),
                                                0)}
      />
    </Parametric3DSurfaceVisualization>
    <p>
      So from those points, we can find the surface area.
    </p>
  </Section>
);

export default CylindersSection;
