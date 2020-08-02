/*
 * Planes
 *
 * A section describing how bases work.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import AxisVisualization3D from 'components/AxisVisualization3D';
import AxisVisualization2D from 'components/AxisVisualization2D';
import InterpolatedAnimation, {
  cosineInterpolator,
} from 'components/InterpolatedAnimation';
import Plane from 'components/Plane';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Tweakable from 'components/Tweakable';
import Vector from 'components/Vector';
import { TweakablesBox } from 'components/Visualization';

import { dotProduct } from 'utils/math';

const PlanesSection = () => (
  <Section title="Planes" anchor="planes">
    <p>
      To get a good understanding of planes, we need to have a grasp on the way
      in which we typically represent lines.
    </p>
    <AxisVisualization2D
      render={() => <Vector position={new Vector3(3, 1, 0)} color={0xffff00} />}
    />
    <p>Usually we would represent a line like this with the form:</p>
    <MathJax.Node formula="y = 3x" />
    <p>
      But we can also represent the same line in terms of{' '}
      <MathJax.Node inline formula="x" /> too:
    </p>
    <MathJax.Node formula="x = \frac{1}{3} y" />
    <p>
      In fact, you do not have to represent the function in terms of either{' '}
      <MathJax.Node inline formula="x" /> or <MathJax.Node inline formula="y" />
      . It is perfectly valid to move both over to one side and pose the
      relationship as their difference or sum. This is called an{' '}
      <Strong>implicit function</Strong>:
    </p>
    <MathJax.Node formula="0 = \frac{1}{3} y - x" />
    <MathJax.Node formula="0 = 3x - y" />
    <p>
      So that is <Strong>four</Strong> ways to represent the same function! This
      becomes even more important when we start moving into three dimensions.
      Consider the function:
    </p>
    <MathJax.Node formula="z = 3x + 2y" />
    <AxisVisualization3D
      render={() => <Vector position={new Vector3(1, 1, 5)} color={0xffff00} />}
    />
    <p>
      This is just another way of saying that the{' '}
      <MathJax.Node inline formula="z" /> is defined as three times the{' '}
      <MathJax.Node inline formula="x" /> co-ordinate plus two times the{' '}
      <MathJax.Node inline formula="y" /> co-ordinate, where the{' '}
      <MathJax.Node inline formula="x" /> and{' '}
      <MathJax.Node inline formula="y" /> co-ordinates sit on a flat plane
      vertically in space.
    </p>
    <p>
      In this guide, I am going to use a slightly different convention than what
      most other mathematics visualisations may use, where the
      <MathJax.Node inline formula="z" /> axis appears to go up and down.
      Instead, the <MathJax.Node inline formula="z" /> axis here extends{' '}
      {'"inwards"'} and "outwards", just like it does in OpenGL.
    </p>
    <p>
      Considering the dependencies that are at play here, also note that we can
      legitimately represent this function in terms of{' '}
      <MathJax.Node inline formula="x" /> or <MathJax.Node inline formula="y" />{' '}
      as well.
    </p>
    <MathJax.Node formula="x = -\frac{2}{3}y + \frac{1}{3}z" />
    <MathJax.Node formula="y = -\frac{3}{2}x + \frac{1}{2}z" />
    <p>
      In fact, we can represent the whole thing as three different implicit
      functions too.
    </p>
    <MathJax.Node formula="3x + 2y - z = 0" />
    <MathJax.Node formula="-\frac{2}{3}y + \frac{1}{3}z - x = 0" />
    <MathJax.Node formula="-\frac{3}{2}x + \frac{1}{2}z - y = 0" />
    <p>
      What I have said up to this point carried an important assumption, which
      was that <MathJax.Node inline formula="y" /> had a dependency on{' '}
      <MathJax.Node inline formula="x" /> in the form of{' '}
      <MathJax.Node inline formula="y = x" />. If we relax that restriction and
      allow <Strong>any</Strong> <MathJax.Node inline formula="y" /> for any{' '}
      <MathJax.Node inline formula="x" /> co-ordinate, then what you end up with
      is a plane.
    </p>
    <AxisVisualization3D
      render={() => (
        <Plane
          a={3}
          b={2}
          c={-1}
          d={0}
          color={0xff00ff}
          extents={[-1, 1]}
          transparent
          opacity={0.8}
        />
      )}
    />
    <p>
      Notice that this plane is really just what we would get if it we took our
      existing line and then drew it starting from every possible point on the{' '}
      <MathJax.Node inline formula="x" /> axis.
    </p>
    <AxisVisualization3D
      render={() => (
        <group>
          <Plane
            a={3}
            b={2}
            c={-1}
            d={0}
            color={0xff00ff}
            extents={[-2, 2]}
            transparent
            opacity={0.8}
          />
          <Vector
            position={new Vector3(0, 5 / 2, 5)}
            base={new Vector3(-1, 3 / 2, 0)}
            color={0xffff00}
          />
          <Vector position={new Vector3(1, 1, 5)} color={0xffff00} />
          <Vector
            position={new Vector3(2, -1 / 2, 5)}
            base={new Vector3(1, -3 / 2, 0)}
            color={0xffff00}
          />
        </group>
      )}
    />
    <p>
      Note also that in order for the lines to appear to be "on" the plane, we
      had to shift their <MathJax.Node inline formula="y" /> co-ordinates too -
      it would not work if we just applied an{' '}
      <MathJax.Node inline formula="x" /> translation to the same line. The
      requisite shift here was to ensure that the lines continued to satisfy the
      equation defining the plane itself:
    </p>
    <MathJax.Node formula="3x + 2y - z = 0" />
    <p>
      The line coming out from the origin was defined by the same equation,
      starting at the point <MathJax.Node inline formula="(0, 0, 0)" />, which
      satisfies the equality because{' '}
      <MathJax.Node inline formula="3 \times 0 + 2 \times 0 - 0 = 0" />.
    </p>
    <p>
      However, if we want a line to start from{' '}
      <MathJax.Node inline formula="x = 1" />, notice what happens in the
      equation:
    </p>
    <MathJax.Node formula="3 \times 1 + 2 \times 0 - 0 = 3 \ne 0" />
    <p>
      In order to make the equality "work", we have to adjust either the{' '}
      <MathJax.Node inline formula="y" /> co-ordinate or the{' '}
      <MathJax.Node inline formula="z" /> co-ordinate such that{' '}
      <MathJax.Node inline formula="2y - z = -3" />. In this case, we can just
      tweak the <MathJax.Node inline formula="y" /> co-ordinate and make that{' '}
      <MathJax.Node inline formula="-\frac{3}{2}" />, eg:
    </p>
    <MathJax.Node formula="3 \times 1 + 2 \times -\frac{3}{2} - 0 = 0" />
    <p>
      As we explored earlier, there are lots of different ways that we could
      write the equation for this particular plane. However, the equation{' '}
      <MathJax.Node inline formula="3x + 2y - z = 0" /> is sort of a{' '}
      {'"standard form"'} for writing equations for planes, generalizable as{' '}
      <MathJax.Node inline formula="Ax + By + Cz = D" />. As it turns out, this
      notation has some very useful properties.
    </p>
    <p>
      The first is what happens when <MathJax.Node inline formula="D = 0" /> and
      we treat the remaining coefficients as a vector from the origin.
    </p>
    <AxisVisualization3D
      render={() => (
        <group>
          <Plane
            a={3}
            b={2}
            c={-1}
            d={0}
            color={0xff00ff}
            extents={[-2, 2]}
            transparent
            opacity={0.8}
          />
          <Vector position={new Vector3(3, 2, -1)} color={0xffff00} />
        </group>
      )}
    />
    <p>
      Notice anything interesting about that vector? The vector that you see
      appears to point directly outward in the direction that the plane is{' '}
      {'"facing"'}. That vector has a special name, the{' '}
      <Strong>normal vector</Strong>.
    </p>
    <p>
      In computer graphics, the normal vector is used for all sorts of things.
    </p>
    <p>
      Importantly, it can tell us pretty easily whether or not a surface is
      facing towards the camera or away from it. Just take the dot product
      between the direction that the camera is facing and the normal vector
      itself. Recall that if two surfaces are perpendicular, then their dot
      product will be zero. Similarly, if we were to say that for arguments sake
      a surface was not facing in any <MathJax.Node inline formula="x" /> or{' '}
      <MathJax.Node inline formula="y" /> direction and was facing towards the
      camera in the <MathJax.Node inline formula="-z" /> direction and the
      camera was likewise only looking straight-on in the
      <MathJax.Node inline formula="z" />, then the dot product will be
      negative.
    </p>
    <AxisVisualization3D
      render={() => (
        <group>
          <Plane
            a={0}
            b={0}
            c={-1}
            d={0}
            color={0xff00ff}
            extents={[-2, 2]}
            transparent
            opacity={0.8}
          />
          <Vector position={new Vector3(0, 0, 1)} color={0xffff00} />
        </group>
      )}
    />
    <MathJax.Node formula="(0, 0, -1) \cdot (0, 0, 1) = -1" />
    <p>
      If the surface is facing away from the camera, then the dot product will
      be positive.
    </p>
    <AxisVisualization3D
      render={() => (
        <group>
          <Plane
            a={0}
            b={0}
            c={1}
            d={0}
            color={0xff00ff}
            extents={[-2, 2]}
            transparent
            opacity={0.8}
          />
          <Vector position={new Vector3(0, 0, -1)} color={0xffff00} />
        </group>
      )}
    />
    <MathJax.Node formula="(0, 0, 1) \cdot (0, 0, 1) = 1" />
    <p>
      You can see that as we rotate a surface around, say around the{' '}
      <MathJax.Node inline formula="x" /> axis, that eventually the dot product
      flips around.
    </p>
    <InterpolatedAnimation
      values={{
        y: { begin: -1, end: 1 },
        z: { begin: 1, end: -1, interpolator: cosineInterpolator },
      }}
      render={({ y, z }) => (
        <div>
          <AxisVisualization3D
            render={() => (
              <group>
                <Plane
                  a={0}
                  b={y.value}
                  c={z.value}
                  d={0}
                  color={0xff00ff}
                  extents={[-2, 2]}
                  transparent
                  opacity={0.8}
                />
                <Vector
                  position={new Vector3(0, y.value, z.value)}
                  color={0xffff00}
                />
              </group>
            )}
            renderExtras={({ width }) => (
              <TweakablesBox width={width}>
                <div>
                  <Tweakable {...y}>
                    <MathJax.Node inline formula="y =" />{' '}
                  </Tweakable>
                </div>
                <div>
                  <Tweakable {...z}>
                    <MathJax.Node inline formula="z =" />{' '}
                  </Tweakable>
                </div>
                <div>
                  <MathJax.Node inline formula="(x, y, z) \cdot (0, 0, 1) =" />{' '}
                  {dotProduct([0, y.value, z.value], [0, 0, -1]).toFixed(2)}
                </div>
              </TweakablesBox>
            )}
          />
        </div>
      )}
    />
    <p>
      Another very handy thing about this notation is what would happen if we
      tried to find the rate of change of this plane. If we rearrange the form a
      little we can make some trivial statements aobut how this plane is
      changing:
    </p>
    <MathJax.Node formula="z = 3x + 2y" />
    <p>
      Without going into the calculus of it, we can say that{' '}
      <MathJax.Node inline formula="z" /> changes by a factor of 3 for every
      change in the <MathJax.Node inline formula="x" />. It also changes by a
      factor of 2 for every change in the <MathJax.Node inline formula="y" />{' '}
      direction. With those two facts we can come up with a{' '}
      <Strong>gradient vector</Strong> which shows the tangent that the surface
      is tracing out: <MathJax.Node inline formula="(3, 2, 1)" />. These are the
      coefficients that we had earlier!
    </p>
    <p>
      Planes can be a little tough the visualize, so it helps to have a good
      graps of the three unit planes and their corresponding normal vectors.
    </p>
    <AxisVisualization3D
      render={() => (
        <group>
          <Plane
            a={0}
            b={0}
            c={1}
            d={0}
            color={0xff00ff}
            extents={[-2, 2]}
            transparent
            opacity={0.8}
          />
          <Vector position={new Vector3(0, 0, -1)} color={0xffff00} />
        </group>
      )}
    />
    <MathJax.Node formula="z = 1" />
    <AxisVisualization3D
      render={() => (
        <group>
          <Plane
            a={1}
            b={0}
            c={0}
            d={0}
            color={0xff00ff}
            extents={[-2, 2]}
            transparent
            opacity={0.8}
          />
          <Vector position={new Vector3(1, 0, 0)} color={0xffff00} />
        </group>
      )}
    />
    <MathJax.Node formula="x = 1" />
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
          <Vector position={new Vector3(0, 1, 0)} color={0xffff00} />
        </group>
      )}
    />
    <MathJax.Node formula="y = 1" />
  </Section>
);

export default PlanesSection;
