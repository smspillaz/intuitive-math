/*
 * Eigenvectors
 *
 * A section describing Eigenvectors
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Matrix4, PlaneGeometry, Vector3, Vector4 } from 'three';

import { XAxis, YAxis } from 'components/Axis';
import Animation from 'components/Animation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';
import Visualization from 'components/Visualization';

const EigenvectorsSection = () => (
  <Section title="Eigenvectors" anchor="eigenvectors">
    <p>
      Now that we know about Eigenvalues, we can talk about Eigenvectors and what
      they mean for Eigenvalues.
    </p>
    <p>
      Like Eigenvalues, <Strong>Eigenvectors</Strong> translate
      to <Strong>own vectors</Strong>. Unlike Eigenvalues, it is far easier to give
      a geometric interpretation of what they Eigenvectors are. They are the vectors
      forming a basis for all vectors that do not have their direction changed
      when a transformation is applied to them.
    </p>
    <p>
      For instance, when we consider the transformation{' '}
      <MathJaxMatrix inline matrix={[[2, 0], [0, 2]]} />, which just scales
      everything by a factor of two, we can pretty easily say that
      <MathJaxMatrix inline matrix={[[1, 0]]} /> and <MathJaxMatrix inline matrix={[[0, 1]]} />
      are the Eigenvectors, because the transformation as a whole does not change
      the direction of space. It only scales it. And of course, those two vectors
      are the basis for all of 2D space.
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
        mat.set(1 + lerp, 0, 0, 0,
                0, 1 + lerp, 0, 0,
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
                <Vector position={new Vector3(1 + lerp, 0, 0)} color={0xffff00} />
                <Vector position={new Vector3(0, 1 + lerp, 0)} color={0xffff00} />
              </group>
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      In other cases, it is not so obvious what the Eigenvectors might be. For
      instance, the transformation <MathJaxMatrix inline matrix={[[1, 2], [0, 2]]} />
      has two Eigenvectors, but we would not immediately be able to say what they were:
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
        mat.set(1, 2 * lerp, 0, 0,
                0, 1 + lerp, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        const planeGeometry = new PlaneGeometry(1, 1);
        planeGeometry.translate(0.5, 0.5, 0.0);
        planeGeometry.applyMatrix(mat);

        const eigenvector1 = new Vector4(1, 0, 0, 0);
        const eigenvector2 = new Vector4(2, 1, 0, 0);

        eigenvector1.applyMatrix4(mat);
        eigenvector2.applyMatrix4(mat);

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
                <Vector position={new Vector3(eigenvector1.x, eigenvector1.y, eigenvector1.z)} color={0xffff00} />
                <Vector position={new Vector3(eigenvector2.x, eigenvector2.y, eigenvector2.z)} color={0xffff00} />
              </group>
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      Unsurprisingly, Eigenvectors and Eigenvalues are linked. Remember when we were
      computing the Eigenvalues, we were using an equation like this:
    </p>
    <MathJax.Node>
      {'\\det \\begin{pmatrix} x_1 - \\lambda & x_2 \\\\ y_1 & y_2 - \\lambda \\end{pmatrix} = 0'}
    </MathJax.Node>
    <p>
      If we zoom out a little and call our matrix <MathJax.Node inline>A</MathJax.Node> and recall
      the Identity Matrix <MathJax.Node inline>I</MathJax.Node>, then what we were really doing
      was this:
    </p>
    <MathJax.Node>
      {'\\det (A - \\lambda \\cdot I)'}
    </MathJax.Node>
    <p>
      Like solving for a zero-determinant, if we solve for vectors in
      the <Strong>null space</Strong> of <MathJax.Node inline>A - \lambda \cdot I</MathJax.Node>,
      i.e, the vector <MathJax.Node inline>v</MathJax.Node> in:{' '}
      <MathJax.Node inline>(A - \lambda \cdot I)v = 0</MathJax.Node>, then we will
      find the Eigenvectors. Remember how we said the Eigenvectors are those vectors which
      do not change their direction? Here is proof of that.
    </p>
    <MathJax.Node>
      {'(A - \\lambda \\cdot I)v = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'Av - \\lambda \\cdot Iv = 0'}
    </MathJax.Node>
    <MathJax.Node>
      {'Av = \\lambda \\cdot Iv'}
    </MathJax.Node>
    <p>
      From here it can be observed that <MathJax.Node inline>\lambda \cdot I</MathJax.Node>
      is just a uniform scaling transformation. So what we are saying is that whatever
      <MathJax.Node inline>A</MathJax.Node> does to <MathJax.Node inline>v</MathJax.Node>,
      is the same as what <MathJax.Node inline>\lambda \cdot I</MathJax.Node> does
      to the vector <MathJax.Node inline>v</MathJax.Node>.
    </p>
    <p>
      Solving for vector <MathJax.Node inline>v</MathJax.Node> is not anything we
      have not seen before. In essence, we are just solving for the null space of
      <MathJaxMatrix inline matrix={[['x_1 - \\lambda', 'y_1'], ['x_2', 'y_2 - \\lambda']]} />,
      for some <MathJax.Node inline>\lambda</MathJax.Node> that we already worked out
      as an Eigenvalue before.
    </p>
    <p>
      Suppose we have the matrix <MathJaxMatrix inline matrix={[[1, 2], [0, 2]]} />, with
      the Eigenvalues <MathJax.Node inline>\lambda = 1</MathJax.Node>{' '}
      and <MathJax.Node inline>\lambda = 2</MathJax.Node>. That gives us two possible
      Eigenvectors to solve for.
    </p>
    <p>
      First, solve for <MathJax.Node inline>\lambda = 1</MathJax.Node>
    </p>
    <p>
      <MathJaxMatrix inline matrix={[['1 - 1', '2'], ['0', '2 - 1']]} />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[0, 2], [0, 1]]} />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </p>
    <p>
      This matrix cannot be reduced any further by elementary row operations.
      Multiplying out the first row, we
      have <MathJax.Node inline>{'0 \\cdot v_1 + 2 \\cdot v_2 = 0'}</MathJax.Node>. This means
      that <MathJax.Node inline>v_1</MathJax.Node> is a free variable and we express
      <MathJax.Node inline>v_2</MathJax.Node> in terms of it, eg:
    </p>
    <MathJax.Node>
      0 \cdot v_1 = -2 \cdot v_2
    </MathJax.Node>
    <p>
      which means that <MathJax.Node inline>v_2</MathJax.Node> is just zero, so
      we can express a vector like so:
    </p>
    <MathJax.Node>
      v_1 \cdot (1, 0)
    </MathJax.Node>
    <p>
      The span of which is just <MathJax.Node inline>(1, 0)</MathJax.Node> which is our first
      Eigenvector, for Eigenvalue <MathJax.Node inline>\lambda = 1</MathJax.Node>. Lets now
      have a look at <MathJax.Node inline>\lambda = 2</MathJax.Node>
    </p>
    <p>
      <MathJaxMatrix inline matrix={[['1 - 2', '2'], ['0', '2 - 2']]} />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[-1, 2], [0, 0]]} />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </p>
    <p>
      In this case we have no free variables and an equation by
      examining the first row again:
    </p>
    <MathJax.Node>
      -1 \cdot v_1 + 2 \cdot v_2 = 0
    </MathJax.Node>
    <MathJax.Node>
      -1 \cdot v_1 = -2 \cdot v_2
    </MathJax.Node>
    <MathJax.Node>
      v_1 = 2 \cdot v_2
    </MathJax.Node>
    <p>
      So, we can express another vector in terms of <MathJax.Node inline>v_2</MathJax.Node>,
      that is, <MathJax.Node inline>v_2(2, 1)</MathJax.Node>, which is our second
      Eigenvector.
    </p>
    <p>
      Recall that for some transformations, we had less than <MathJax.Node inline>n</MathJax.Node> solutions
      for Eigenvalues, but those solutions had higher multiplicity, <MathJax.Node inline>m</MathJax.Node>.
      In such cases, there may be up to <MathJax.Node inline>m</MathJax.Node> linearly independent vectors
      in the span of solutions for the Eigenvectors for that Eigenvalue. In general, where an
      Eigenvalue has multiplicity <MathJax.Node inline>m</MathJax.Node> then you can find up to
      <MathJax.Node inline>m</MathJax.Node> vectors, but they are not guaranteed to be linearly
      independent. Take for example the following matrix which shears only in the x direction:
    </p>
    <MathJaxMatrix matrix={[[1, 1, 0, 1]]} />
    <p>
      The characteristic equation for this Matrix is:
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
      Here we have a single Eigenvalue with algebraic multiplicity 2. If we were to
      solve for the Eigenvectors with this Eigenvalue, we would have:
    </p>
    <p>
      <MathJaxMatrix inline matrix={[['1 - 1', '1'], ['0', '1 - 1']]} />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[0, 1], [0, 0]]} />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </p>
    <MathJax.Node>
      v_2 = 0
    </MathJax.Node>
    <p>
      And so we would have a single vector, <MathJax.Node inline>(0, 1)</MathJax.Node>
    </p>
    <p>
      The dimension of the span of the corresponding linearly independent Eigenvectors
      for an Eigenvalue is called the <Strong>geometric multiplicity</Strong> of
      that Eigenvalue. If the sums of algebraic multiplicities and geometric multiplicities
      for all Eigenvalues of a matrix are equal to each other, then the matrix is
      said to be <Strong>Diagonalizable</Strong>.
    </p>
  </Section>
);

export default EigenvectorsSection;
