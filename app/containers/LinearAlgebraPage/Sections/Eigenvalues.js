/*
 * Eigenvalues
 *
 * A section describing Eigenvalues
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Matrix4, PlaneGeometry, Vector3 } from 'three';

import { XAxis, YAxis } from 'components/Axis';
import Animation from 'components/Animation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';
import Visualization from 'components/Visualization';

import { truncate } from 'utils/math';

const EigenvaluesSection = () => (
  <Section title="Eigenvalues" anchor="eigenvalues">
    <p>
      The topic of Eigenvalues and their sibling, Eigenvectors, is something
      that can be quite confusing for math students. It is not immediately obvious
      from the calculations what they are actually for and how we can think about
      them intuitively.
    </p>
    <p>
      Briefly speaking, the <Strong>Eigenvalues</Strong> of a square matrix translates to
      <Strong>own values</Strong>. They are the special values which encode what happens to the
      Eigenvectors of the matrix when it is applied as a transformation. This description
      probably also does not help very much either if we do not have a clear understanding
      of what Eigenvectors are. But we also need to know about what we are doing when
      we compute Eigenvalues to talk about Eigenvectors, so for now you will just have to
      take my word for it that they are important.
    </p>
    <p>
      Remember how some square matrices had a determinant of zero, and this meant
      that they flattened space from a higher dimension to a lower dimension? If we
      look at any linear transformation with a nonzero determinant, you might wonder
      what you could do to the transformation in order to make the determinant zero.
    </p>
    <Animation
      initial={{
        time: 0,
      }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;

        const mat = new Matrix4();
        mat.set(lerp, 1, 0, 0,
                1, lerp, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        const planeGeometry = new PlaneGeometry(1, 1);
        planeGeometry.translate(0.5, 0.5, 0.0);
        planeGeometry.applyMatrix(mat);

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <group>
                <mesh>
                  <geometry
                    vertices={planeGeometry.vertices}
                    faces={planeGeometry.faces}
                    colors={planeGeometry.colors}
                    faceVertexUvs={planeGeometry.faceVertexUvs}
                  />
                  <meshBasicMaterial color={0xff00ff} opacity={0.8} />
                </mesh>
                <Vector position={new Vector3(lerp, 1, 0)} color={0xffff00} />
                <Vector position={new Vector3(1, lerp, 0)} color={0xffff00} />
              </group>
            </Visualization>
            <p>
              <MathJax.Node inline>x_1</MathJax.Node> = {truncate(lerp, 2).toFixed(2)}{' '}
              <MathJax.Node inline>x_2</MathJax.Node> = {truncate(1, 2).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>y_1</MathJax.Node> = {truncate(1, 2).toFixed(2)}{' '}
              <MathJax.Node inline>y_2</MathJax.Node> = {truncate(lerp, 2).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>
                {'\\det \\begin{pmatrix} x_1 & x_2 \\\\ y_1 & y_2\\end{pmatrix}'}
              </MathJax.Node> = {truncate((lerp * lerp) - 1, 2).toFixed(2)}
            </p>
          </div>
        );
      }}
    />
    <p>
      Recalling that the determinant of an upper or lower triangular matrix is defined
      as multiplication along the diagonal, you might think about what value{' '}
      <Strong>lambda</Strong>, <MathJax.Node inline>\lambda</MathJax.Node> can
      I subtract from each element on the diagonal to make the determinant zero?
    </p>
    <MathJax.Node>
      {'\\det \\begin{pmatrix} x_1 - \\lambda & x_2 \\\\ y_1 & y_2 - \\lambda \\end{pmatrix} = 0'}
    </MathJax.Node>
    <p>
      And remember that when you are doing this, you are essentially finding some value
      (of which they may be more than one) to add or subtract along the diagonal which
      make the determinant zero.
    </p>
    <Animation
      initial={{
        time: 0,
      }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const lambda = lerp;
        const x1 = 1 - lambda;
        const y1 = 2;
        const x2 = 0;
        const y2 = 1 - lambda;


        const mat = new Matrix4();
        mat.set(x1, y1, 0, 0,
                x2, y2, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        const planeGeometry = new PlaneGeometry(1, 1);
        planeGeometry.translate(0.5, 0.5, 0.0);
        planeGeometry.applyMatrix(mat);

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <group>
                <mesh>
                  <geometry
                    vertices={planeGeometry.vertices}
                    faces={planeGeometry.faces}
                    colors={planeGeometry.colors}
                    faceVertexUvs={planeGeometry.faceVertexUvs}
                  />
                  <meshBasicMaterial color={0xff00ff} opacity={0.8} />
                </mesh>
                <Vector position={new Vector3(x1, x2, 0)} color={0xffff00} />
                <Vector position={new Vector3(y1, y2, 0)} color={0xffff00} />
              </group>
            </Visualization>
            <p>
              <MathJax.Node inline>x_1</MathJax.Node> = {truncate(x1, 2).toFixed(2)}{' '}
              <MathJax.Node inline>y_1</MathJax.Node> = {truncate(y1, 2).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>x_2</MathJax.Node> = {truncate(x2, 2).toFixed(2)}{' '}
              <MathJax.Node inline>y_2</MathJax.Node> = {truncate(y2, 2).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>\lambda</MathJax.Node> = {truncate(lambda, 2).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>
                {'\\det \\begin{pmatrix} x_1 & x_2 \\\\ y_1 & y_2\\end{pmatrix}'}
              </MathJax.Node> = {truncate((x1 * y2) - (y1 * x1), 2).toFixed(2)}
            </p>
          </div>
        );
      }}
    />
    <p>
      Remember that there does not just have to be a single Eigenvalue. Sometimes
      a system could have multiple Eigenvalues. This system, which shears by 2
      along the x-axis but scales by two along the y-axis has{' '}
      <MathJax.Node inline>\lambda = 1</MathJax.Node>
    </p>
    <Animation
      initial={{
        time: 0,
      }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const lambda = lerp;
        const x1 = 1 - lambda;
        const y1 = 2;
        const x2 = 0;
        const y2 = 2 - lambda;


        const mat = new Matrix4();
        mat.set(x1, y1, 0, 0,
                x2, y2, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        const planeGeometry = new PlaneGeometry(1, 1);
        planeGeometry.translate(0.5, 0.5, 0.0);
        planeGeometry.applyMatrix(mat);

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <group>
                <mesh>
                  <geometry
                    vertices={planeGeometry.vertices}
                    faces={planeGeometry.faces}
                    colors={planeGeometry.colors}
                    faceVertexUvs={planeGeometry.faceVertexUvs}
                  />
                  <meshBasicMaterial color={0xff00ff} opacity={0.8} />
                </mesh>
                <Vector position={new Vector3(x1, x2, 0)} color={0xffff00} />
                <Vector position={new Vector3(y1, y2, 0)} color={0xffff00} />
              </group>
            </Visualization>
            <p>
              <MathJax.Node inline>x_1</MathJax.Node> = {truncate(x1, 2).toFixed(2)}{' '}
              <MathJax.Node inline>y_1</MathJax.Node> = {truncate(y1, 2).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>x_2</MathJax.Node> = {truncate(x2, 2).toFixed(2)}{' '}
              <MathJax.Node inline>y_2</MathJax.Node> = {truncate(y2, 2).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>\lambda</MathJax.Node> = {truncate(lambda, 2).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>
                {'\\det \\begin{pmatrix} x_1 & x_2 \\\\ y_1 & y_2\\end{pmatrix}'}
              </MathJax.Node> = {truncate((x1 * y2) - (y1 * x1), 2).toFixed(2)}
            </p>
          </div>
        );
      }}
    />
    <p>
      And it also has <MathJax.Node>\lambda = 2</MathJax.Node>
    </p>
    <Animation
      initial={{
        time: 0,
      }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const lambda = lerp * 2;
        const x1 = 1 - lambda;
        const y1 = 2;
        const x2 = 0;
        const y2 = 2 - lambda;


        const mat = new Matrix4();
        mat.set(x1, y1, 0, 0,
                x2, y2, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        const planeGeometry = new PlaneGeometry(1, 1);
        planeGeometry.translate(0.5, 0.5, 0.0);
        planeGeometry.applyMatrix(mat);

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <group>
                <mesh>
                  <geometry
                    vertices={planeGeometry.vertices}
                    faces={planeGeometry.faces}
                    colors={planeGeometry.colors}
                    faceVertexUvs={planeGeometry.faceVertexUvs}
                  />
                  <meshBasicMaterial color={0xff00ff} opacity={0.8} />
                </mesh>
                <Vector position={new Vector3(x1, x2, 0)} color={0xffff00} />
                <Vector position={new Vector3(y1, y2, 0)} color={0xffff00} />
              </group>
            </Visualization>
            <p>
              <MathJax.Node inline>x_1</MathJax.Node> = {truncate(x1, 2).toFixed(2)}{' '}
              <MathJax.Node inline>y_1</MathJax.Node> = {truncate(y1, 2).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>x_2</MathJax.Node> = {truncate(x2, 2).toFixed(2)}{' '}
              <MathJax.Node inline>y_2</MathJax.Node> = {truncate(y2, 2).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>\lambda</MathJax.Node> = {truncate(lambda, 2).toFixed(2)}
            </p>
            <p>
              <MathJax.Node inline>
                {'\\det \\begin{pmatrix} x_1 & x_2 \\\\ y_1 & y_2\\end{pmatrix}'}
              </MathJax.Node> = {truncate((x1 * y2) - (y1 * x1), 2).toFixed(2)}
            </p>
          </div>
        );
      }}
    />
    <p>
      In order to compute these Eigenvalues, recall the equation for the determinant, but
      this time subtract an unknown value <MathJax.Node inline>\lambda</MathJax.Node> from
      the diagonal and set the determinant to zero.
    </p>
    <MathJax.Node>
      {'\\det \\begin{pmatrix} x_1 - \\lambda & y_1 \\\\ x_2 & y_2 - \\lambda \\end{pmatrix} = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'(x_1 - \\lambda)(y_2 - \\lambda) - y_1 \\cdot x_1 = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'(-\\lambda + x_1)(-\\lambda + y_2) - y_1 \\cdot x_1 = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\lambda^2 - (x_1 + y_2) \\cdot \\lambda + x_1 \\cdot y_2 - y_1 \\cdot x_1 = 0'}
    </MathJax.Node>
    <p>
      This is a polynomial known as the <Strong>characteristic equation</Strong> that we
      can solve for <MathJax.Node inline>\lambda</MathJax.Node>.
    </p>
    <p>
      If we take the example of the transformation above, we will see that:
    </p>
    <MathJax.Node>
      {'\\det \\begin{pmatrix} 1 - \\lambda & 2 \\\\ 0 & 2 - \\lambda \\end{pmatrix} = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'(1 - \\lambda)(2 - \\lambda) - 2 \\cdot 0 = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'(-\\lambda + 1)(-\\lambda + 2) = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\lambda^2 - 3\\lambda + 2 = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'(\\lambda - 1)(\\lambda - 2) = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\lambda = 1, \\lambda = 2'}
    </MathJax.Node>
    <p>
      Something to take note of here is that given that that the characteristic
      equation is a polynomial of degree <MathJax.Node inline>n</MathJax.Node>, where
      <MathJax.Node inline>n</MathJax.Node> is the number of columns in the square
      matrix, it stands to reason that there can be up to <MathJax.Node inline>n</MathJax.Node>{' '}
      real-valued solutions for <MathJax.Node inline>\lambda</MathJax.Node>. Sometimes
      there might not be any real valued solutions.
    </p>
    <p>
      If a single value appears as a solution more than once, in the sense that
      one of the critical points of the polynomial lies on the x-axis, then that
      Eigenvalue is said to have a higher <Strong>algebraic multiplicity</Strong>. For
      instance, above, we had the matrix:
    </p>
    <MathJaxMatrix matrix={[[1, 2], [0, 1]]} />
    <p>
      If we were to take the eigenvalues of this matrix:
    </p>
    <MathJax.Node>
      {'\\det \\begin{pmatrix} 1 - \\lambda & 2 \\\\ 0 & 1 - \\lambda \\end{pmatrix} = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'(1 - \\lambda)^2 - 2 \\cdot 0 = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'(-\\lambda + 1)^2 = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\lambda^2 - 2\\lambda + 1 = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'(\\lambda - 1)^2 = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\lambda = 1'}
    </MathJax.Node>
    <p>
      <MathJax.Node inline>\lambda</MathJax.Node> would have
      an <Strong>algebraic multiplicity</Strong> of 2, since it actually
      appears twice if we were to expand the equation out:
    </p>
    <MathJax.Node>
      {'(\\lambda - 1)(\\lambda - 1) = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\lambda = 1, \\lambda = 1'}
    </MathJax.Node>
    <p>
      Eigenvalues also have some other interesting properties, which is why we
      say that they are useful in encoding information about what matrices are
      doing.
    </p>
    <p>
      <Strong>Trace</Strong>: The sum of all the diagonal elements in the matrix
      equals the sum of all the eigenvalues. For instance, with the matrix:
    </p>
    <MathJaxMatrix matrix={[[1, 2], [0, 2]]} />
    <p>
      we found Eigenvalues <MathJax.Node inline>\lambda = 1, \lambda = 2</MathJax.Node>,
      which happens to equal the sum of the diagonal: <MathJax.Node inline>1 + 2 = 1 + 2</MathJax.Node>
    </p>
    <p>
      <Strong>Determinant</Strong>: The determinant of a matrix is the product of its
      Eigenvalues: for instance, <MathJax.Node inline>1 \times 2 = 1 \times 2 - 2 \times 0</MathJax.Node>
    </p>
    <p>
      <Strong>Inverse</Strong>: If a matrix is invertible, then the eigenvalues of the
      inverse are <MathJax.Node inline>1 \over \lambda</MathJax.Node>. For example, the
      inverse of <MathJaxMatrix inline matrix={[[1, 2], [0, 2]]} /> is
      <MathJaxMatrix inline matrix={[[1, -1], [0, '1 \\over 2']]} />. Setting the determinant of the
      inverse to zero allows us to find the Eigenvalues:
    </p>
    <MathJax.Node>
      {'\\det \\begin{pmatrix} 1 - \\lambda & -1 \\\\ 0 & \\frac{1}{2} - \\lambda \\end{pmatrix} = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'(1 - \\lambda)(\\frac{1}{2} - \\lambda) - 2 \\cdot 0 = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\lambda^2 - \\frac{3}{2} \\lambda + \\frac{1}{2} = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'(\\lambda - 1)(\\lambda - \\frac{1}{2}) = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\lambda = 1, \\lambda = \\frac{1}{2}'}
    </MathJax.Node>
  </Section>
);

export default EigenvaluesSection;
