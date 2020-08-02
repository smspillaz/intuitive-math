/*
 * Cylinders
 *
 * A section on cylinders and cylindrical co-ordinates.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import { Parametric3DSurfaceVisualization } from 'components/ParametricVisualization';
import Section from 'components/Section';
import SurfaceNormalsIntegral from 'components/SurfaceNormalsIntegral';
import Strong from 'components/Strong';

const SphereSection = () => (
  <Section title="Spheres" anchor="spheres">
    <p>
      Similar to cylinders, a sphere is an extension of polar co-ordinates,
      except this time it is a polar extension as opposed to a cartesian
      extension. This means that spherical co-ordinates have another angle{' '}
      <MathJax.Node inline formula="\phi" />.
    </p>
    <MathJax.Node formula="s(r, \theta, \phi)" />
    <p>
      The translation from spherical to cartesian co-ordinates is as follows:
    </p>
    <p>
      <MathJax.Node inline formula="x = r\cos(\theta)\sin(\phi)" />
    </p>
    <p>
      <MathJax.Node inline formula="y = r\cos(\theta)\sin(\phi)" />
    </p>
    <p>
      <MathJax.Node inline formula="z = r\cos(\phi)" />
    </p>
    <p>And from cartesian to cylindrical we have:</p>
    <p>
      <MathJax.Node inline formula="r = \sqrt{x^2 + y^2 + z^2}" />
    </p>
    <p>
      <MathJax.Node inline formula="\theta = \tan^{-1}(\frac{y}{x})" />
    </p>
    <p>
      <MathJax.Node inline formula="\phi = \tan^{-1}(\frac{y}{z})" />
    </p>
    <p>For instance, a sphere with radius 2 is defined as:</p>
    <MathJax.Node formula="s(r, \theta, z) = (2, \theta, 1)" />
    <Parametric3DSurfaceVisualization
      func={(u, v, out) => {
        out.set(
          2 * Math.cos(2 * Math.PI * u) * Math.sin(Math.PI * v),
          2 * Math.sin(2 * Math.PI * u) * Math.sin(Math.PI * v),
          2 * Math.cos(Math.PI * v),
        );
      }}
      wireframe
    />
    <p>
      If we want to find the volume of a sphere, we must again use a{' '}
      <Strong>triple integral</Strong> as the input space has three parameters.
    </p>
    <MathJax.Node formula="\int_0^{\pi} \int_0^{2\pi} \int_0^2 -r\sin(\phi) \, dr \, d\theta \, d\phi" />
    <p>
      Note also that we need to apply a density correction which is the
      determinant of the Jacobian matrix for each component. In the case of a
      cylinder, that is <MathJax.Node inline formula="-r\sin(\	heta)" />.
    </p>
    <p>
      Finding the surface area of a cylinder requires us to find a
      parameterization in terms of two parameters. Because this sphere has a
      constant radius, we can use a parameterization that keeps{' '}
      <MathJax.Node inline formula="r" /> constant.
    </p>
    <MathJax.Node formula="s(u, v) = (2\cos(2\pi u)\sin(\pi \phi), 2\sin(2\pi u)\sin(\pi \phi), 2 \cos(\phi))" />
    <p>
      From there we can use the same approach to find the length of the normal
      vector at every point.
    </p>
    <Parametric3DSurfaceVisualization
      func={(u, v, out) =>
        out.set(
          2 * Math.cos(2 * Math.PI * u) * Math.sin(Math.PI * v),
          2 * Math.sin(2 * Math.PI * u) * Math.sin(Math.PI * v),
          2 * Math.cos(Math.PI * v),
        )
      }
      wireframe
    >
      <SurfaceNormalsIntegral
        uMin={0}
        uMax={1}
        vMin={0}
        vMax={1}
        segments={10}
        func={(u, v) =>
          new Vector3(
            2 * Math.cos(2 * Math.PI * u) * Math.sin(Math.PI * v),
            2 * Math.sin(2 * Math.PI * u) * Math.sin(Math.PI * v),
            2 * Math.cos(Math.PI * v),
          )
        }
        uGradientVecFunc={(u, v) =>
          new Vector3(
            -4 * Math.PI * Math.sin(2 * Math.PI * u) * Math.sin(Math.PI * v),
            4 * Math.PI * Math.cos(2 * Math.PI * u) * Math.sin(Math.PI * v),
            0,
          )
        }
        vGradientVecFunc={(u, v) =>
          new Vector3(
            2 * Math.PI * Math.cos(2 * Math.PI * u) * Math.cos(Math.PI * v),
            2 * Math.PI * Math.sin(2 * Math.PI * u) * Math.cos(Math.PI * v),
            -2 * Math.PI * Math.sin(Math.PI * v),
          )
        }
      />
    </Parametric3DSurfaceVisualization>
    <p>So from those points, we can find the surface area.</p>
  </Section>
);

export default SphereSection;
