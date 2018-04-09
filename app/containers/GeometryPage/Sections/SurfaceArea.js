/*
 * ParametricSurfaces
 *
 * A section parametric surfaces, which can be used to define any smooth surface
 * from two input co-ordinates.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MathJax from 'react-mathjax';

import { Vector3, Matrix4 } from 'three';

import InterpolatedAnimation from 'components/InterpolatedAnimation';
import AxisVisualization3D from 'components/AxisVisualization3D';
import CubeVectors3D from 'components/CubeVectors3D';
import { DoubleIntegral } from 'components/DoubleIntegralVisualization';
import {
  Parametric3DSurfaceVisualization,
} from 'components/ParametricVisualization';
import Plane from 'components/Plane';
import Section from 'components/Section';
import SpanningPlane2D from 'components/SpanningPlane2D';
import SurfaceNormalsIntegral from 'components/SurfaceNormalsIntegral';
import Tweakable from 'components/Tweakable';
import Vector from 'components/Vector';

import {
  cross,
  magnitude,
} from 'utils/math';

const VectorNormalVisualization = ({ firstVectorExtents, secondVectorExtents, area = false }) => (
  <InterpolatedAnimation
    values={{
      firstXScale: { begin: firstVectorExtents[0], end: 0 },
      firstYScale: { begin: firstVectorExtents[1], end: 0 },
      firstZScale: { begin: firstVectorExtents[2], end: 0 },
      secondXScale: { begin: secondVectorExtents[0], end: 0 },
      secondYScale: { begin: secondVectorExtents[1], end: 0 },
      secondZScale: { begin: secondVectorExtents[2], end: 0 },
    }}
    render={({
      firstXScale,
      firstYScale,
      firstZScale,
      secondXScale,
      secondYScale,
      secondZScale,
    }) => {
      const normal = cross([
        firstXScale.value,
        firstYScale.value,
        firstZScale.value,
      ], [
        secondXScale.value,
        secondYScale.value,
        secondZScale.value,
      ]);

      return (
        <div>
          <AxisVisualization3D
            render={() => (
              <group>
                <Vector position={new Vector3(firstXScale.value, firstYScale.value, firstZScale.value)} color={0xff00ff} />
                <Vector position={new Vector3(secondXScale.value, secondYScale.value, secondZScale.value)} color={0xffff00} />
                <Vector
                  position={
                    new Vector3(...normal)
                  }
                  color={0xffffff}
                />
                {area && (() => {
                  const mat = new Matrix4();
                  mat.set(firstXScale.value, secondXScale.value, 0, 0,
                          firstYScale.value, secondYScale.value, 0, 0,
                          firstZScale.value, secondZScale.value, 1, 0,
                          0, 0, 0, 1);
                  return (
                    <SpanningPlane2D matrix={mat} />
                  );
                })()}
              </group>
            )}
          />
          <div>
            <Tweakable {...firstXScale}>
              <MathJax.Node inline>{'x_1 ='}</MathJax.Node>{' '}
            </Tweakable>
          </div>
          <div>
            <Tweakable {...firstYScale}>
              <MathJax.Node inline>{'y_1 ='}</MathJax.Node>{' '}
            </Tweakable>
          </div>
          <div>
            <Tweakable {...firstZScale}>
              <MathJax.Node inline>{'z_1 ='}</MathJax.Node>{' '}
            </Tweakable>
          </div>
          <div>
            <Tweakable {...secondXScale}>
              <MathJax.Node inline>{'x_2 ='}</MathJax.Node>{' '}
            </Tweakable>
          </div>
          <div>
            <Tweakable {...secondYScale}>
              <MathJax.Node inline>{'y_2 ='}</MathJax.Node>{' '}
            </Tweakable>
          </div>
          <div>
            <Tweakable {...secondZScale}>
              <MathJax.Node inline>{'z_2 ='}</MathJax.Node>{' '}
            </Tweakable>
          </div>
          <div>
            <MathJax.Node inline>{'\\lvert N \\rvert ='}</MathJax.Node>{magnitude(...normal).toFixed(2)}
          </div>
        </div>
      );
    }}
  />
);

VectorNormalVisualization.propTypes = {
  firstVectorExtents: PropTypes.arrayOf(PropTypes.number).isRequired,
  secondVectorExtents: PropTypes.arrayOf(PropTypes.number).isRequired,
  area: PropTypes.boolean,
};

const SurfaceAreaSection = () => (
  <Section title="Surface Area" anchor="surface-area">
    <p>
      Now that we have some understanding of integrals and of parametric
      surfaces, we can apply that knowledge to find the surface area
      of a parametric surface. To do this, we need to think of a way
      to split the surface up into lots of very small pieces that we can
      easily calculate the surface area of, then add them all up to find
      the total surface area over the whole surface.
    </p>
    <p>
      To start out, consider the surface area of a very small, non-curved
      horizontal rectangle. That rectangle is just going to have an area
      of its width times its height.
    </p>
    <p>
      Unfortunately, we cannot jump directly from knowing the surface
      area of a rectangle to finding the surface area of something that
      is not rectangular in nature. Rectangles do not really tesselate all
      that well into non-rectangular shapes and fixed bounds of integration
      only make sense if the candidate shape is rectangular. For most surfaces,
      the bounds of the shape change depending on where you are in it.
    </p>
    <Parametric3DSurfaceVisualization
      func={(u, v) => new Vector3(3 * ((Math.sin(u + v)) ** 2),
                                  3 * (Math.sin(v + (u / 4)) ** 2),
                                  0)}
      wireframe
    >
      <DoubleIntegral
        xMin={0}
        xMax={3}
        yMin={0}
        yMax={3}
        zMin={0}
        zMax={0.125}
        func={() => 1}
        segments={10}
      />
    </Parametric3DSurfaceVisualization>
    <p>
      We can get around this problem by shifting around the orientation of the
      vectors making up the lines of each small patch by changing our co-ordinate
      system, in the same way that we define a parametric surface. However, if we
      do that then, it becomes harder to conceptualize what the surface area
      of the shape will be. The area does not remainin constant, it actually
      changes as the shape contracts and expands as the orientation of the lines
      change around.
    </p>
    <p>
      Another way to think about area, then, is with the normal vector. On face
      value these two things do not seem to be related. After all the normal vector
      is just a vector that sticks out from the shape, perpendicular to its surface.
    </p>
    <AxisVisualization3D
      render={() => (
        <group>
          <Plane
            a={0}
            b={1}
            c={0}
            d={0}
            color={0xff00ff}
            extents={[-2, 2]}
            transparent
            opacity={0.8}
          />
          <Vector
            position={new Vector3(0, 1, 0)}
            color={0xffff00}
          />
        </group>
      )}
    />

    <p>
      But remember that the normal vector has a magnitude like any other vector and
      its magnitude is actually proportionate to the lengths of the vectors that
      made up its cross product.
    </p>
    <VectorNormalVisualization
      firstVectorExtents={[1.0, 1.0, 1.0]}
      secondVectorExtents={[0.0, 1.0, 0.0]}
    />
    <p>
      As it turns out, the normal vector becomes a proxy for working out the area
      of a quadrialteral defined by two vectors. If the normal vector is short, then
      the area will be quite small. If the normal vector is long, then the area
      will be larger.
    </p>
    <VectorNormalVisualization
      firstVectorExtents={[1.0, 1.0, 1.0]}
      secondVectorExtents={[0.0, 1.0, 0.0]}
      area
    />
    <p>
      Astute readers may recognize the link between the normal
      vector defined as the cross product between two vectors and the determinant
      of a square 3x3 matrix. This is because the determinant of a 3x3 matrix
      will compute the volume of a parallelepiped having the basis vectors{' '}
      <MathJax.Node inline>a</MathJax.Node>, <MathJax.Node inline>b</MathJax.Node> and{' '}
      <MathJax.Node inline>c</MathJax.Node> as edges.
    </p>
    <AxisVisualization3D
      title="Parallelepiped"
      render={() => {
        const mat = new Matrix4();
        mat.set(2, 1, 3, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);
        return (
          <CubeVectors3D matrix={mat} wireframe />
        );
      }}
    />
    <MathJax.Node>
      {`\\det \\begin{pmatrix} a_1 & a_2 & a_3 \\\\
                               b_1 & b_2 & b_3 \\\\
                               c_1 & c_2 & c_3 \\end{pmatrix} =
        c_1(a_2b_3 - a_3b_2) - c_2(a_1b_3 - a_3b_1) + c_3(a_1b_2 - a_2b_1)`}
    </MathJax.Node>
    <MathJax.Node>
      {`\\left\\| (a \\times b) \\cdot c \\right\\|  =
        c_1(a_2b_3 - a_3b_2) - c_2(a_1b_3 - a_3b_1) + c_3(a_1b_2 - a_2b_1)`}
    </MathJax.Node>
    <p>
      So if we divide by <MathJax.Node inline>c</MathJax.Node> and drop the depth
      dimension, we are just left with area, which is the cross product between
      <MathJax.Node inline>a</MathJax.Node> and <MathJax.Node inline>b</MathJax.Node>
    </p>
    <AxisVisualization3D
      title="Parallelepiped - no depth"
      render={() => {
        const mat = new Matrix4();
        mat.set(2, 1, 0, 0,
                0, 1, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 1);
        return (
          <CubeVectors3D matrix={mat} wireframe />
        );
      }}
    />
    <p>
      Back to surface areas, we reformulate the problem in another way -
      divide up the surface into small patches and then add up the magnitude
      of their normal vectors. That will give you the surface area!
    </p>
    <Parametric3DSurfaceVisualization
      func={(u, v) => new Vector3(3 * ((Math.sin(u + v)) ** 2),
                                  3 * (Math.sin(v + (u / 4)) ** 2),
                                  0)}
      wireframe
    >
      <SurfaceNormalsIntegral
        uMin={0}
        uMax={1}
        vMin={0}
        vMax={1}
        func={(u, v) => new Vector3(3 * ((Math.sin(u + v)) ** 2),
                                    3 * (Math.sin(v + (u / 4)) ** 2),
                                    0)}
        uGradientVecFunc={(u, v) => new Vector3(6 * Math.sin(u + v) * Math.cos(u + v),
                                                (3 / 2) * Math.sin(v + (u / 4)) * Math.cos(v + (u / 4)),
                                                0)}
        vGradientVecFunc={(u, v) => new Vector3(-6 * Math.sin(u + v) * Math.cos(u + v),
                                                -6 * Math.sin(v + (u / 4)) * Math.cos(v + (u / 4)),
                                                0)}
        segments={10}
      />
    </Parametric3DSurfaceVisualization>
    <p>
      Unfortunately, we now have another problem, which is how exactly those
      small patches should be defined. We cannot just pick one set of orientations
      for our vectors and expect them to tesselate perfectly throughout the shape
      as it is possible that the surface is curved and that tesselation will not work.
    </p>
    <p>
      Instead, we come up with a mechanism to find the vector orientations
      at each point. Calculus comes to the rescue! Since our parametric surface
      is a function of two parameters, <MathJax.Node inline>u</MathJax.Node> and{' '}
      <MathJax.Node inline>v</MathJax.Node> for each of those two co-ordinates, outputs
      a three co-ordinate vector <MathJax.Node inline>(x, y, z)</MathJax.Node>, we
      can find the rate of change of both <MathJax.Node inline>u</MathJax.Node>{' '}
      and <MathJax.Node inline>v</MathJax.Node>, with respect to each of{' '}
      <MathJax.Node inline>(x, y, z)</MathJax.Node> and that will give us the
      two gradient vectors that we can use to calculate the normal, and thus
      the surface area at that point:
    </p>
    <MathJax.Node>{'S_u = (\\frac{\\partial x}{\\partial u}, \\frac{\\partial y}{\\partial u}, \\frac{\\partial z}{\\partial u})'}</MathJax.Node>
    <MathJax.Node>{'S_v = (\\frac{\\partial x}{\\partial v}, \\frac{\\partial y}{\\partial v}, \\frac{\\partial z}{\\partial v})'}</MathJax.Node>
    <p>
      Once we have those two, we can calculate the normal:
    </p>
    <MathJax.Node>{'N = S_u \\times S_v'}</MathJax.Node>
    <p>
      And then from there, we can calculate the magnitude of the normal:
    </p>
    <MathJax.Node>{'\\sqrt{N_x^2 + N_y^2 + N_z^2}'}</MathJax.Node>
    <p>
      All of this working then tells us how we can integrate
    </p>
    <MathJax.Node>{'\\int_0^1 \\int_0^1 \\left\\| S_u \\times S_v \\right\\|\\, du \\, dv'}</MathJax.Node>
    <p>
      We will give it a try on the function defined above. Our parametric function was:
    </p>
    <MathJax.Node>
      {'S(u, v) = (3\\sin(u + v)^2, 3\\sin(v + \\frac{u}{4})^2, 0)'}
    </MathJax.Node>
    <p>
      First, we find the gradient vector in terms of <MathJax.Node inline>u</MathJax.Node>{' '}
      and <MathJax.Node inline>v</MathJax.Node>.
    </p>
    <MathJax.Node>
      {'S_u = (6\\sin(u + v), \\frac{3}{2}\\sin(v + \\frac{u}{4}), 0)'}
    </MathJax.Node>
    <MathJax.Node>
      {'S_v = (6\\sin(u + v), 6\\sin(v + \\frac{u}{4}), 0)'}
    </MathJax.Node>
    <p>
      Now that we know that, we can take the cross product
    </p>
    <MathJax.Node>
      {'S_u \\times S_v = (0, 0, 27\\sin(u + v)\\sin(u + \\frac{v}{4}))'}
    </MathJax.Node>
    <p>
      And we can then integrate over the magnitude of it:
    </p>
    <MathJax.Node>{'\\int_0^1 \\int_0^1 \\sqrt{(27\\sin(u + v)\\sin(u + \\frac{v}{4})^2} du \\, dv = 12.8456'}</MathJax.Node>
  </Section>
);

export default SurfaceAreaSection;
