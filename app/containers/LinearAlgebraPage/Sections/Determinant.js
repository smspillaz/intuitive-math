/*
 * Determinant
 *
 * Section about determinants
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Euler, Matrix4, PlaneGeometry, Vector3 } from 'three';

import { XAxis, YAxis, ZAxis } from 'components/Axis';
import AxisVisualization2D from 'components/AxisVisualization2D';
import AxisVisualization3D from 'components/AxisVisualization3D';
import CubeVectors3D from 'components/CubeVectors3D';
import CubeVectorsAnimatedERO from 'components/CubeVectorsAnimatedERO';
import InterpolatedAnimation from 'components/InterpolatedAnimation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import SpanningPlane2D from 'components/SpanningPlane2D';
import Strong from 'components/Strong';
import TriplePlanes from 'components/TriplePlanes';
import Tweakable from 'components/Tweakable';
import Vector from 'components/Vector';
import Visualization from 'components/Visualization';

import { truncate } from 'utils/math';

const DeterminantSection = () => (
  <Section title="Determinant" anchor="determinant">
    <p>
      By now you will have noticed a theme in all the prior sections. A transformation
      can either map everything in an n-dimensional space to somewhere else
      in that n-dimensional space, or it squishes that n-dimensional space into a
      lower dimensional space like a line or a plane.
    </p>
    <p>
      You will probably also appreciate that some transformations squash, or expand
      space more than others. For simple changes in the unit vectors, it is
      pretty obvious how much space gets squashed or expanded.
    </p>
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 1, end: 0.5 },
        yyInterp: { begin: 1, end: 0.8 },
      }}
      render={({ xxInterp, yyInterp }) => {
        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);

        const mat = new Matrix4();
        mat.set(xxInterp.value, 0, 0, 0,
                0, yyInterp.value, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        const rot = new Matrix4();
        rot.makeRotationFromEuler(new Euler(0.5, 0.5, 0));

        return (
          <Visualization matrix={rot.multiply(mat)}>
            <XAxis />
            <YAxis />
            <ZAxis />
            <Vector position={iHat} color={0xffff00} />
            <Vector position={jHat} color={0xffff00} />
          </Visualization>
        );
      }}
    />
    <p>
      For other transformations, its not quite as obvious how much
      space is being squashed or expanded.
    </p>
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 1, end: 0.5 },
        xyInterp: { begin: 0, end: 5 },
        yxInterp: { begin: 0, end: 1 },
        yyInterp: { begin: 1, end: 0.8 },
        zyInterp: { begin: 0, end: 5 },
      }}
      render={({ xxInterp, xyInterp, yxInterp, yyInterp, zyInterp }) => {
        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);

        const mat = new Matrix4();
        mat.set(xxInterp.value, xyInterp.value, 0, 0,
                yxInterp.value, yyInterp.value, 0, 0,
                0, zyInterp.value, 1, 0,
                0, 0, 0, 1);

        const rot = new Matrix4();
        rot.makeRotationFromEuler(new Euler(0.5, 0.5, 0));

        return (
          <Visualization matrix={rot.multiply(mat)}>
            <XAxis />
            <YAxis />
            <ZAxis />
            <Vector position={iHat} color={0xffff00} />
            <Vector position={jHat} color={0xffff00} />
          </Visualization>
        );
      }}
    />
    <p>
      In every case though, there is a computation we can do to work
      out how much space is being squished or expanded overall regardless
      of the other effects of the transformation. The result of that
      computation is called the <Strong>Determinant</Strong>.
    </p>
    <p>
      To interpret the <Strong>Determinant</Strong>, we can think about what
      happens to a 1x1 square in the 2D case or a 1x1x1 volume in
      the 3D case. The factor by which that square or volume has a greater
      area or volume is the Determinant. Because the transformation is
      linear, every other area or volume is going to be changed by that
      same factor.
    </p>
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 1, end: 0.5 },
        yyInterp: { begin: 1, end: 0.8 },
      }}
      render={({ xxInterp, yyInterp }) => {
        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);

        const mat = new Matrix4();
        mat.set(xxInterp.value, 0, 0, 0,
                0, yyInterp.value, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        const rot = new Matrix4();
        rot.makeRotationFromEuler(new Euler(0.5, 0.5, 0));

        return (
          <Visualization matrix={rot.multiply(mat)}>
            <XAxis />
            <YAxis />
            <ZAxis />
            <Vector position={iHat} color={0xffff00} />
            <Vector position={jHat} color={0xffff00} />
          </Visualization>
        );
      }}
    />
    <p>
      Now, as for computing this thing - lets start from the 2D case.
    </p>
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 1, end: 0.5 },
        yyInterp: { begin: 1, end: 0.8 },
      }}
      render={({ xxInterp, yyInterp }) => {
        const mat = new Matrix4();
        mat.set(xxInterp.value, 0, 0, 0,
                0, yyInterp.value, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <AxisVisualization2D
              render={() => (
                <group>
                  <SpanningPlane2D matrix={mat} />
                  <Vector position={new Vector3(xxInterp.value, 0, 0)} color={0xffff00} />
                  <Vector position={new Vector3(0, yyInterp.value, 0)} color={0xffff00} />
                </group>
              )}
            />
            <p>
              <Tweakable {...xxInterp}>
                <MathJax.Node inline>x = </MathJax.Node>
              </Tweakable>
            </p>
            <p>
              <Tweakable {...yyInterp}>
                <MathJax.Node inline>y = </MathJax.Node>
              </Tweakable>
            </p>
          </div>
        );
      }}
    />
    <p>
      When we are just dealing with squares this is quite easy - its just basic
      high school geometry - width <MathJax.Node inline>\times</MathJax.Node> height. The
      determinant is literally the area defined by the scale of each of the two basis vectors.
    </p>
    <p>
      You might think that doing more complicated things like shears or rotations would
      complicate matters, but as it turns out, they do not.
    </p>
    <InterpolatedAnimation
      values={{
        xShear: { begin: 0, end: 1 },
      }}
      render={({ xShear }) => {
        const mat = new Matrix4();
        mat.set(1, xShear.value, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        const planeGeometry = new PlaneGeometry(1, 1);
        planeGeometry.translate(0.5, 0.5, 0.0);
        planeGeometry.applyMatrix(mat);

        return (
          <div>
            <AxisVisualization2D
              render={() => (
                <group>
                  <SpanningPlane2D matrix={mat} />
                  <Vector position={new Vector3(1, 0, 0)} color={0xffff00} />
                  <Vector position={new Vector3(xShear.value, 1, 0)} color={0xffff00} />
                </group>
              )}
            />
            <p>
              <MathJax.Node inline>x</MathJax.Node> = {truncate(1, 2).toFixed(2)}{' '}
              <Tweakable {...xShear}>
                <MathJax.Node inline>y</MathJax.Node><span> = </span>
              </Tweakable>
            </p>
            <p>
              <MathJax.Node inline>x</MathJax.Node> = {truncate(0, 2).toFixed(2)}{' '}
              <MathJax.Node inline>y</MathJax.Node> = {truncate(1, 2).toFixed(2)}
            </p>
          </div>
        );
      }}
    />
    <p>
      Even though this shape changes quite substantially, the determinant of the transformation
      is still 1. The reason for that is that we can imagine that the unit square stretches
      out to a rectangle twice its size, but then we need to subtract away the empty
      right-triangles on either end, which grow as fast as that rectangle does.
    </p>
    <p>
      Things start to get a bit more interesting when we have shears in two directions.
    </p>
    <InterpolatedAnimation
      values={{
        xyShear: { begin: 0, end: 1 },
        yxShear: { begin: 0, end: 1 },
      }}
      render={({ xyShear, yxShear }) => {
        const mat = new Matrix4();
        mat.set(1, xyShear.value, 0, 0,
                yxShear.value, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <Visualization>
              <XAxis />
              <YAxis />
              <group>
                <SpanningPlane2D matrix={mat} />
                <Vector position={new Vector3(1, xyShear.value, 0)} color={0xffff00} />
                <Vector position={new Vector3(yxShear.value, 1, 0)} color={0xffff00} />
              </group>
            </Visualization>
            <p>
              <MathJax.Node inline>x</MathJax.Node> = {truncate(1, 2).toFixed(2)}{' '}
              <Tweakable {...xyShear}>
                <MathJax.Node inline>y</MathJax.Node><span> = </span>
              </Tweakable>
            </p>
            <p>
              <Tweakable {...yxShear}>
                <MathJax.Node inline>x</MathJax.Node><span> = </span>
              </Tweakable>
              <MathJax.Node inline>y</MathJax.Node> = {truncate(1, 2).toFixed(2)}
            </p>
          </div>
        );
      }}
    />
    <p>
      Under this transformation, the x-shear and y-shear are equal, such that the
      transformed basis vectors converge on a point. Notice how as that happens, the
      area itself gets smaller and smaller even though the magnitude of our
      basis vectors increases. However, if we scale one of the basis vectors, notice
      that they will not convege on the same point anymore:
    </p>
    <InterpolatedAnimation
      values={{
        xyShear: { begin: 0, end: 1 },
        yxShear: { begin: 0, end: 1 },
        yyScale: { begin: 1, end: 2 },
      }}
      render={({ xyShear, yxShear, yyScale }) => {
        const mat = new Matrix4();
        mat.set(1, xyShear.value, 0, 0,
                yxShear.value, yyScale.value, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <Visualization>
              <XAxis />
              <YAxis />
              <group>
                <SpanningPlane2D matrix={mat} />
                <Vector position={new Vector3(1, xyShear.value, 0)} color={0xffff00} />
                <Vector position={new Vector3(yxShear.value, yyScale.value, 0)} color={0xffff00} />
              </group>
            </Visualization>
            <p>
              <MathJax.Node inline>x</MathJax.Node> = {truncate(1, 2).toFixed(2)}{' '}
              <Tweakable {...xyShear}>
                <MathJax.Node inline>y</MathJax.Node><span> = </span>
              </Tweakable>
            </p>
            <p>
              <Tweakable {...yxShear}>
                <MathJax.Node inline>x</MathJax.Node><span> = </span>
              </Tweakable>
              <Tweakable {...yyScale}>
                <MathJax.Node inline>y</MathJax.Node><span> = </span>
              </Tweakable>
            </p>
          </div>
        );
      }}
    />
    <p>
      With these intuitions, we should be pretty comfortable to say that the determinant
      in two dimensions has something to do with the relationship between both the left
      and right diagonal. As the product of the left diagonal grows, the overall scale factor
      for area affected by the transformaton increases, because the basis vectors are getting
      further and further away from each other. As the product of the right diagonal
      grows, it actually shrinks because the basis vectors are getting closer towards each other.
    </p>
    <p>
      Thus, overall, the determinant is the difference between the growth factors, the left
      diagonal, and the shrinking factors, the right diagonal.
    </p>
    <p>
      So it should be no surprise then, that we can represent the determinant for a matrix
      like this:
    </p>
    <MathJaxMatrix matrix={[['a', 'b'], ['c', 'd']]} />
    <p>
      with the following formula:
    </p>
    <MathJax.Node>ad - bc</MathJax.Node>
    <p>
      How about generalizing to a higher dimensional space? For a three dimensional space
      we could imagine a volume made up of three two-dimensional faces, one along
      the <MathJax.Node inline>yz</MathJax.Node> at <MathJax.Node inline>x = 0</MathJax.Node>,
      one along <MathJax.Node inline>xz</MathJax.Node> at <MathJax.Node inline>y = 0</MathJax.Node>{' '}
      and one along <MathJax.Node inline>xy</MathJax.Node> at <MathJax.Node inline>z = 0</MathJax.Node>.
    </p>
    <TriplePlanes
      first={[1, 0, 0, 0]}
      second={[0, 1, 0, 0]}
      third={[0, 0, 1, 0]}
      extents={[0, 1]}
    />
    <p>
      Do you notice something that seems off about this visualization though? The plane along the
      <MathJax.Node inline>yz</MathJax.Node> is appears to be facing in the negative direction. Lets
      have a look at the matrix at this point.
    </p>
    <MathJaxMatrix matrix={[[1, 0, 0], [0, 1, 0], [0, 0, 1]]} />
    <p>
      Recall that this 3x3 matrix can be described as a set of planes each with two-component
      basis vectors. If we go along the first row, observe that there are three possible
      2x2 matricies in the second and third row.
    </p>
    <p>
      <MathJax.Node inline>x = 1, yz =</MathJax.Node>{' '}<MathJaxMatrix inline matrix={[[1, 0], [0, 1]]} />
    </p>
    <p>
      <MathJax.Node inline>y = 0, xz =</MathJax.Node>{' '}<MathJaxMatrix inline matrix={[[0, 0], [0, 1]]} />
    </p>
    <p>
      <MathJax.Node inline>z = 0, xy =</MathJax.Node>{' '}<MathJaxMatrix inline matrix={[[0, 1], [0, 0]]} />
    </p>
    <p>
      Of each of these, observe that the value in the first row is a scale factor the corresponding
      2x2 determinant is also a scale factor. So we have three different scale factors along with
      three different areas in play, each of which gives us a 3x3 volume. Of course, notice in this case
      that the volume of the <MathJax.Node inline>y</MathJax.Node> and <MathJax.Node inline>z</MathJax.Node>{' '}
      volumes is zero.
    </p>
    <InterpolatedAnimation
      values={{
        xScale: { begin: 1, end: 2 },
      }}
      render={({ xScale }) => {
        const mat = new Matrix4();
        mat.set(xScale.value, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <AxisVisualization3D
              render={() => (
                <CubeVectors3D matrix={mat} />
              )}
            />
            <p>
              <Tweakable {...xScale}>
                <MathJax.Node inline>x = </MathJax.Node>
              </Tweakable>
              <MathJax.Node inline>\det yz = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 1</MathJax.Node>
            </p>
            <p>
              <MathJax.Node inline>y = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\det xz = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 0</MathJax.Node>
            </p>
            <p>
              <MathJax.Node inline>z = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\det xy = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 0</MathJax.Node>
            </p>
          </div>
        );
      }}
    />
    <p>
      Now what will happen if we start to scale on an axis other than
      the <MathJax.Node inline>x</MathJax.Node> axis? Well, the
      determinant (and hence the area) of the 2x2 plane will increase
      and so the volume will increase, even though
      the <MathJax.Node inline>x</MathJax.Node> scale factor never increases.
    </p>
    <InterpolatedAnimation
      values={{
        yScale: { begin: 1, end: 2 },
      }}
      render={({ yScale }) => {
        const mat = new Matrix4();
        mat.set(1, 0, 0, 0,
                0, yScale.value, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <AxisVisualization3D
              render={() => (
                <CubeVectors3D matrix={mat} />
              )}
            />
            <p>
              <MathJax.Node inline>x = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\det yz = </MathJax.Node>{yScale.value.toFixed(2)},{' '}
              <MathJax.Node inline>\rightarrow 1</MathJax.Node>
            </p>
            <p>
              <MathJax.Node inline>y = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\det xz = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 0</MathJax.Node>
            </p>
            <p>
              <MathJax.Node inline>z = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\det xy = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 0</MathJax.Node>
            </p>
          </div>
        );
      }}
    />
    <p>
      Okay, lets step up the complexity a little. What happens if we shear along the{' '}
      <MathJax.Node inline>xz</MathJax.Node> plane?
    </p>
    <InterpolatedAnimation
      values={{
        xyShear: { begin: 0, end: 1 },
      }}
      render={({ xyShear }) => {
        const mat = new Matrix4();
        mat.set(1, xyShear.value, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <AxisVisualization3D
              render={() => (
                <CubeVectors3D matrix={mat} />
              )}
            />
            <p>
              <MathJax.Node inline>x = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\det yz = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 1</MathJax.Node>
            </p>
            <p>
              <MathJax.Node inline>y = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\det xz = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 0</MathJax.Node>
            </p>
            <p>
              <MathJax.Node inline>z = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\det xy = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 0</MathJax.Node>
            </p>
          </div>
        );
      }}
    />
    <p>
      Like the 2D case, the area of the unit cube being transformed here
      does not change. As it grows more towards the x axis, we just take
      away an equivalent amount of volume on each side. That can be
      visualized below.
    </p>
    <InterpolatedAnimation
      values={{
        xyShear: { begin: 0, end: 1 },
      }}
      render={({ xyShear }) => {
        const mat = new Matrix4();
        mat.set(1, xyShear.value, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        const negativeMat = new Matrix4();
        negativeMat.set(1, 0, 0, 0,
                        0, xyShear.value, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1);

        return (
          <div>
            <AxisVisualization3D
              render={() => (
                <group>
                  <CubeVectors3D matrix={mat} />
                  <CubeVectors3D matrix={negativeMat} wireframe />
                </group>
              )}
            />
            <p>
              <MathJax.Node inline>x = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\det yz = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 1</MathJax.Node>
            </p>
            <p>
              <MathJax.Node inline>y = </MathJax.Node>{xyShear.value.toFixed()},{' '}
              <MathJax.Node inline>\det xz = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 0</MathJax.Node>
            </p>
            <p>
              <MathJax.Node inline>z = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\det xy = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 0</MathJax.Node>
            </p>
          </div>
        );
      }}
    />
    <p>
      Similarly to the 2D case, if we shear on the <MathJax.Node inline>xy</MathJax.Node>{' '}
      and the <MathJax.Node inline>yx</MathJax.Node> components, the volume will actually start
      to collapse into something that looks an awful lot like a plane. Can you see why? Look
      at what happens to the basis vectors.
    </p>
    <InterpolatedAnimation
      values={{
        xyShear: { begin: 0, end: 1 },
        yxShear: { begin: 0, end: 1 },
      }}
      render={({ xyShear, yxShear }) => {
        const mat = new Matrix4();
        mat.set(1, xyShear.value, 0, 0,
                yxShear.value, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <AxisVisualization3D
              render={() => (
                <group>
                  <CubeVectors3D matrix={mat} wireframe />
                </group>
              )}
            />
            <p>
              <MathJax.Node inline>x = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\det yz = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 1</MathJax.Node>
            </p>
            <p>
              <Tweakable {...yxShear}>
                <MathJax.Node inline>y = </MathJax.Node>
              </Tweakable>{', '}
              <MathJax.Node inline>\det xz = </MathJax.Node>{xyShear.value.toFixed(2)},{' '}
              <MathJax.Node inline>\rightarrow </MathJax.Node>{(xyShear.value * yxShear.value).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>z = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\det xy = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 0</MathJax.Node>
            </p>
          </div>
        );
      }}
    />
    <p>
      We are not done yet however. What happens if you add some shear on the{' '}
      <MathJax.Node inline>xz</MathJax.Node> plane?
    </p>
    <InterpolatedAnimation
      values={{
        xyShear: { begin: 0, end: 1 },
        yxShear: { begin: 0, end: 1 },
        zxShear: { begin: 0, end: 1 },
      }}
      render={({ xyShear, yxShear, zxShear }) => {
        const mat = new Matrix4();
        mat.set(1, xyShear.value, 0, 0,
                yxShear.value, 1, 0, 0,
                zxShear.value, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <AxisVisualization3D
              render={() => (
                <group>
                  <CubeVectors3D matrix={mat} wireframe />
                </group>
              )}
            />
            <p>
              <MathJax.Node inline>x = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\det yz = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 1</MathJax.Node>
            </p>
            <p>
              <Tweakable {...yxShear}>
                <MathJax.Node inline>y = </MathJax.Node>
              </Tweakable>{', '}
              <MathJax.Node inline>\det xz = </MathJax.Node>{xyShear.value.toFixed(2)},{' '}
              <MathJax.Node inline>\rightarrow </MathJax.Node>{(xyShear.value * yxShear.value).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>z = 0</MathJax.Node>,{' '}
              <MathJax.Node inline>\det xy = </MathJax.Node>{-zxShear.value.toFixed(2)},{' '}
              <MathJax.Node inline>\rightarrow 0</MathJax.Node>
            </p>
          </div>
        );
      }}
    />
    <p>
      You will notice that even though we added shear on the <MathJax.Node inline>xz</MathJax.Node> plane,
      two basis vectors still ended up being coplanar, as opposed to colinear. So we still ended up with
      a plane.
    </p>
    <p>
      This time, we shall add some additional shear on the <MathJax.Node inline>zx</MathJax.Node> plane.
    </p>
    <InterpolatedAnimation
      values={{
        xyShear: { begin: 0, end: 1 },
        yxShear: { begin: 0, end: 1 },
        zxShear: { begin: 0, end: 1 },
        xzShear: { begin: 0, end: 1 },
      }}
      render={({ xyShear, yxShear, zxShear, xzShear }) => {
        const mat = new Matrix4();
        mat.set(1, xyShear.value, xzShear.value, 0,
                yxShear.value, 1, 0, 0,
                zxShear.value, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <AxisVisualization3D
              render={() => (
                <group>
                  <CubeVectors3D matrix={mat} wireframe />
                </group>
              )}
            />
            <p>
              <MathJax.Node inline>x = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\det yz = 1</MathJax.Node>,{' '}
              <MathJax.Node inline>\rightarrow 1</MathJax.Node>
            </p>
            <p>
              <Tweakable {...yxShear}>
                <MathJax.Node inline>y = </MathJax.Node>
              </Tweakable>{', '}
              <MathJax.Node inline>\det xz = </MathJax.Node>{xyShear.value.toFixed(2)},{' '}
              <MathJax.Node inline>\rightarrow </MathJax.Node>{(xyShear.value * yxShear.value).toFixed(2)}
            </p>
            <p>
              <Tweakable {...xzShear}>
                <MathJax.Node inline>z = </MathJax.Node>
              </Tweakable>{', '}
              <MathJax.Node inline>\det xy = </MathJax.Node>{-zxShear.value.toFixed(2)},{' '}
              <MathJax.Node inline>\rightarrow 0</MathJax.Node>
            </p>
          </div>
        );
      }}
    />
    <p>
      Now the volume kind of ends up becoming an inverted and skewed version of itself, this such that
      it has a negative volume, as though it has been turned inside out.
    </p>
    <p>
      With those intuitions, we should be able to find the algorithm for a 3x3 determinant relatively
      acceptable. We go across the first row and take the sub-determinant
      of <MathJax.Node inline>yz</MathJax.Node> along the second and third rows. Recall that the scalar
      value in the first row sort of gives volume to the area in another dimension. Then, we subtract
      the scaled sub-determinant of <MathJax.Node inline>y</MathJax.Node> applied
      to <MathJax.Node inline>xy</MathJax.Node> since that was just collapsing space on to a plane and
      makes the overall volume smaller. Then, the scalar value
      of <MathJax.Node inline>z</MathJax.Node> applied to <MathJax.Node inline>xy</MathJax.Node> expands
      the overall volume again, so we add that.
    </p>
    <p>
      Or more generally, for a 3x3 matrix of the form:
    </p>
    <MathJaxMatrix matrix={[['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']]} />
    <MathJax.Node>
      {`a \\times \\det \\begin{pmatrix} e & f \\\\ h & i\\end{pmatrix} -
        b \\times \\det \\begin{pmatrix} d & f \\\\ g & i\\end{pmatrix} +
        c \\times \\det \\begin{pmatrix} d & e \\\\ h & h\\end{pmatrix}`}
    </MathJax.Node>
    <p>
      As it turns out, this same algorithm can be followed along any row or column applied
      to their corresponding sub-determinants, though special attention should be paid to
      whether that sub-determinant is negated in the overall equation. The general rule for a 3x3
      looks something like this:
    </p>
    <MathJaxMatrix matrix={[['+', '-', '+'], ['-', '+', '-'], ['+', '-', '+']]} />
    <p>
      The rule for 4x4 or even an <MathJax.Node inline>n \times n</MathJax.Node> matrix
      is very similar - it is just recursively defined in terms of a scalar versus other sub-determinants.
      Which makes sense if you remember the way that dimensionality itself is defined. A plane is just
      a line of every possible vertical line. A volume is just a line of every possible plane and so on.
    </p>
    <p>
      Now, computing the determinant in this way for a 3x3 matrix is already tedious enough and gets
      expotentially more tedious as you increase the number of dimensions. Thankfully, there is an easier
      way of doing it by exploiting a few invariants.
    </p>
    <p>
      Observe what happens when you try to compute the determinant of a matrix like the following
      when you go down the first column:
    </p>
    <MathJaxMatrix matrix={[[1, 2, 3, 4], [0, 3, 4, 5], [0, 0, 5, 6], [0, 0, 0, 7]]} />
    <p>
      Notice that because most of the scaled sub-determinants are zero that the
      overall recursive formula expands quite nicely:
    </p>
    <MathJax.Node>
      {'\\det \\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 0 & 3 & 4 & 5 \\\\ 0 & 0 & 5 & 6 \\\\ 0 & 0 & 0 & 7\\end{pmatrix}'}
    </MathJax.Node>
    <MathJax.Node>
      {'1 \\times \\det \\begin{pmatrix} 3 & 4 & 5 \\\\ 0 & 5 & 6 \\\\ 0 & 0 & 7\\end{pmatrix}'}
    </MathJax.Node>
    <MathJax.Node>
      {'1 \\times 3 \\times \\det \\begin{pmatrix} 5 & 6 \\\\ 0 & 7\\end{pmatrix}'}
    </MathJax.Node>
    <MathJax.Node>
      {'1 \\times 3 \\times 5 \\times 7'}
    </MathJax.Node>
    <p>
      Now the question is how we can get our matrix into this form so we can do the computation
      in a far simpler way. The answer of course, is <Strong>Elementary Row Operations</Strong>. However,{' '}
      <Strong>Elementary Row Operations</Strong> might preserve the row space, but they do not
      preserve the overall characteristic of the transformation, including the degree to which it
      scales space or flips space over on itself.
    </p>
    <p>
      The fact that it does not should be relatively easy to see when you consider the end result
      of a perfect row elimination. You might turn something messy into what is essentially the
      identity matrix which does nothing to the space. Both matrices had the same
      row space, but the transformation is no longer there.
    </p>
    <p>
      So when we are performing row operations we need to keep track of some extra information which
      allows us to undo the changes that affect the determinant.
    </p>
    <p>
      <Strong>Type 1 Row Exchanging:</Strong> when we exchange two rows, we are actually flipping
      space over on itself, which means that the determinant will negate. So we need to keep track
      of how many times we negate the determinant so that we can undo it later.
    </p>
    <InterpolatedAnimation
      values={{
        xyShear: { begin: 0, end: 1 },
        yxShear: { begin: 0, end: 1 },
        xScale: { begin: 1, end: 0 },
        yScale: { begin: 1, end: 0 },
      }}
      render={({ xyShear, yxShear, xScale, yScale }) => {
        const mat = new Matrix4();
        mat.set(xScale.value, xyShear.value, 0, 0,
                yxShear.value, yScale.value, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <AxisVisualization3D
              render={() => (
                <group>
                  <CubeVectors3D matrix={mat} />
                </group>
              )}
            />
          </div>
        );
      }}
    />
    <p>
      <Strong>Type 2 Row Scaling:</Strong> recall that when we multiply an entire row by a
      scalar, the determinant is going to scale by exactly that amount. So we need to keep track
      of that scalar for later, since that is one factor by which the row-reduced determinant
      would have been scaled.
    </p>
    <InterpolatedAnimation
      values={{
        xScale: { begin: 1, end: 2 },
      }}
      render={({ xScale }) => {
        const mat = new Matrix4();
        mat.set(xScale.value, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <AxisVisualization3D
              render={() => (
                <group>
                  <CubeVectors3D matrix={mat} />
                </group>
              )}
            />
          </div>
        );
      }}
    />
    <p>
      <Strong>Type 3 Right Linear Combinations:</Strong> paradoxically, adding scalar
      multiples of any row to any other row (so long as the destination row itself is not
      scaled as a part of the combination, hence the term <Strong>right</Strong> linear
      combination), will not change the determinant at all. Consider a shear where we
      add a scalar multiple of the second row to the first, to see why this is so:
    </p>
    <InterpolatedAnimation
      values={{
        yxShear: { begin: 0, end: 2 },
      }}
      render={({ yxShear }) => {
        const mat = new Matrix4();
        mat.set(1, 0, 0, 0,
                yxShear.value, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        return (
          <div>
            <AxisVisualization3D
              render={() => (
                <group>
                  <CubeVectors3D matrix={mat} />
                </group>
              )}
            />
          </div>
        );
      }}
    />
    <p>
      With all that in mind, we can compute the determinant of
      a 3x3 in far more straightforward fashion. Observe how the nature of
      the transformation changes and the factor by which the area changes as
      we apply row reduction operations.
    </p>
    <CubeVectorsAnimatedERO matrix={[[1, -1, 0], [-1, -1, 0], [2, 1, 2]]} />
    <p>
      Before we begin, first observe a few things about this transformation. First,
      note that it inverts space along the <MathJax.Node inline>x</MathJax.Node> axis.
      Also notice that it appears to expand space as well.
    </p>
    <p>
      First, subtract 2 times the first row from the third. This is a Type 3 operation
      and will not affect the determinant.
    </p>
    <CubeVectorsAnimatedERO matrix={[[1, -1, 0], [-1, -1, 0], [0, 3, 2]]} />
    <p>
      Now subtract the second row from the first. This is also a
      Type 3 operation and does not affect the determinant.
    </p>
    <CubeVectorsAnimatedERO matrix={[[2, 0, 0], [-1, -1, 0], [0, 3, 2]]} />
    <p>
      Then add half of the first row to the second. This is Type 3 and
      als does not affect the determinant.
    </p>
    <CubeVectorsAnimatedERO matrix={[[2, 0, 0], [0, -1, 0], [0, 3, 2]]} />
    <p>
      Add three times the second row to the third, which is also Type 3
    </p>
    <CubeVectorsAnimatedERO matrix={[[2, 0, 0], [0, -1, 0], [0, 0, 2]]} />
    <p>
      Now, from here we can compute the determinant directly by just
      multiplying along the diagonal (recall that the determinant has not yet changed):
    </p>
    <MathJax.Node>
      2 \times -1 \times 2 = -4
    </MathJax.Node>
    <p>
      For the sake of completeness, clean up the matrix by multipying the first
      row by <MathJax.Node inline>1 \over 2</MathJax.Node>, the second row by -1 and
      the third row by <MathJax.Node inline>1 \over 2</MathJax.Node>. These operations
      do change the determinant by an overall factor of <MathJax.Node inline>-1 \over 4</MathJax.Node>.
    </p>
    <CubeVectorsAnimatedERO matrix={[[1, 0, 0], [0, 1, 0], [0, 0, 1]]} />
    <p>
      Computing the determinant of this newly row-reduced matrix is straightforward
    </p>
    <MathJax.Node>
      1 \times 1 \times 1 = 1
    </MathJax.Node>
    <p>
      And to recover our original determinant, we need to do the inverse of the change
      to the determinant, that is, divide by <MathJax.Node inline>-1 \over 4</MathJax.Node>
    </p>
    <MathJax.Node>
      {'\\frac{1}{-1 \\over 4} = -4'}
    </MathJax.Node>
    <p>
      A few things to observe about the determinant based on what we have seen here. First,
      it should be pretty intuitive to see that if you scale an entire matrix by some scalar,
      you will also be scaling the determinant by that scalar, raised to the power of the number
      of rows in that matrix. For instance, scaling the identity matrix by 3
      will change the determinant to 9, since first it scales by 3 in the x direction, 3 in the
      y direction and 3 in the z direction.
    </p>
    <MathJax.Node inline>{'\\det \\alpha A_{mn} = \\alpha^n \\det A'}</MathJax.Node>
    <p>
      Secondly, if you think about two matrices as transformations, the determinant
      of their product is the product of the determinants.
    </p>
    <MathJax.Node inline>\det AB = \det A \times \det B</MathJax.Node>
  </Section>
);

export default DeterminantSection;
