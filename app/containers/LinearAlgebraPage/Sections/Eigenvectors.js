/*
 * Eigenvectors
 *
 * A section describing Eigenvectors
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Matrix4, Vector3, Vector4 } from 'three';

import AxisVisualization2D from 'components/AxisVisualization2D';
import CenteredParagraph from 'components/CenteredParagraph';
import InterpolatedAnimation from 'components/InterpolatedAnimation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import SpanningPlane2D from 'components/SpanningPlane2D';
import Strong from 'components/Strong';
import Vector from 'components/Vector';

const EigenvectorsSection = () => (
  <Section title="Eigenvectors" anchor="eigenvectors">
    <p>
      Now that we know about Eigenvalues, we can talk about Eigenvectors and
      what they mean for Eigenvalues.
    </p>
    <p>
      Like Eigenvalues, <Strong>Eigenvectors</Strong> translate to{' '}
      <Strong>own vectors</Strong>. Unlike Eigenvalues, it is far easier to give
      a geometric interpretation of what they Eigenvectors are. They are the
      vectors forming a basis for all vectors that do not have their direction
      changed when a transformation is applied to them.
    </p>
    <p>
      For instance, when we consider the transformation{' '}
      <MathJaxMatrix
        inline
        matrix={[
          [2, 0],
          [0, 2],
        ]}
      />
      , which just scales everything by a factor of two, we can pretty easily
      say that
      <MathJaxMatrix inline matrix={[[1, 0]]} /> and{' '}
      <MathJaxMatrix inline matrix={[[0, 1]]} /> are the Eigenvectors, because
      the transformation as a whole does not change the direction of space. It
      only scales it. And of course, those two vectors are the basis for all of
      2D space.
    </p>
    <InterpolatedAnimation
      values={{
        xScale: { begin: 1, end: 2 },
        yScale: { begin: 1, end: 2 },
      }}
      render={({ xScale, yScale }) => {
        const mat = new Matrix4();
        mat.set(
          xScale.value,
          0,
          0,
          0,
          0,
          yScale.value,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
        );

        return (
          <AxisVisualization2D
            title="Simple x-y scalar system"
            render={() => (
              <group>
                <SpanningPlane2D matrix={mat} />
                <Vector
                  position={new Vector3(xScale.value, 0, 0)}
                  color={0xffff00}
                />
                <Vector
                  position={new Vector3(0, yScale.value, 0)}
                  color={0xffff00}
                />
              </group>
            )}
          />
        );
      }}
    />
    <p>
      In other cases, it is not so obvious what the Eigenvectors might be. For
      instance, the transformation{' '}
      <MathJaxMatrix
        inline
        matrix={[
          [1, 2],
          [0, 2],
        ]}
      />
      has two Eigenvectors, but we would not immediately be able to say what
      they were:
    </p>
    <InterpolatedAnimation
      values={{
        xyShear: { begin: 0, end: 2 },
        yScale: { begin: 1, end: 2 },
      }}
      render={({ xyShear, yScale }) => {
        const mat = new Matrix4();
        mat.set(
          1,
          xyShear.value,
          0,
          0,
          0,
          yScale.value,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
        );

        const eigenvector1 = new Vector4(1, 0, 0, 0);
        const eigenvector2 = new Vector4(2, 1, 0, 0);

        eigenvector1.applyMatrix4(mat);
        eigenvector2.applyMatrix4(mat);

        return (
          <AxisVisualization2D
            title="x-y shearing system"
            render={() => (
              <group>
                <SpanningPlane2D matrix={mat} />
                <Vector position={eigenvector1} color={0xffff00} />
                <Vector position={eigenvector2} color={0xffff00} />
              </group>
            )}
          />
        );
      }}
    />
    <p>
      Unsurprisingly, Eigenvectors and Eigenvalues are linked. Remember when we
      were computing the Eigenvalues, we were using an equation like this:
    </p>
    <MathJax.Node formula="\det \begin{pmatrix} x_1 - \lambda & x_2 \\ y_1 & y_2 - \lambda \end{pmatrix} = 0" />
    <p>
      If we zoom out a little and call our matrix{' '}
      <MathJax.Node inline formula="A" /> and recall the Identity Matrix{' '}
      <MathJax.Node inline formula="I" />, then what we were really doing was
      this:
    </p>
    <MathJax.Node formula="\det (A - \lambda \cdot I)" />
    <p>
      Like solving for a zero-determinant, if we solve for vectors in the{' '}
      <Strong>null space</Strong> of{' '}
      <MathJax.Node inline formula="A - \lambda \cdot I" />, i.e, the vector{' '}
      <MathJax.Node inline formula="v" /> in:{' '}
      <MathJax.Node inline formula="(A - \lambda \cdot I)v = 0" />, then we will
      find the Eigenvectors. Remember how we said the Eigenvectors are those
      vectors which do not change their direction? Here is proof of that.
    </p>
    <MathJax.Node formula="(A - \lambda \cdot I)v = 0" />
    <MathJax.Node formula="Av - \lambda \cdot Iv = 0" />
    <MathJax.Node formula="Av = \lambda \cdot Iv" />
    <p>
      From here it can be observed that{' '}
      <MathJax.Node inline formula="\lambda \cdot I" />
      is just a uniform scaling transformation. So what we are saying is that
      whatever
      <MathJax.Node inline formula="A" /> does to{' '}
      <MathJax.Node inline formula="v" />, is the same as what{' '}
      <MathJax.Node inline formula="\lambda \cdot I" /> does to the vector{' '}
      <MathJax.Node inline formula="v" />.
    </p>
    <p>
      Solving for vector <MathJax.Node inline formula="v" /> is not anything we
      have not seen before. In essence, we are just solving for the null space
      of
      <MathJaxMatrix
        inline
        matrix={[
          ['x_1 - \\lambda', 'y_1'],
          ['x_2', 'y_2 - \\lambda'],
        ]}
      />
      , for some <MathJax.Node inline formula="\lambda" /> that we already
      worked out as an Eigenvalue before.
    </p>
    <p>
      Suppose we have the matrix{' '}
      <MathJaxMatrix
        inline
        matrix={[
          [1, 2],
          [0, 2],
        ]}
      />
      , with the Eigenvalues <MathJax.Node inline formula="\lambda = 1" /> and{' '}
      <MathJax.Node inline formula="\lambda = 2" />. That gives us two possible
      Eigenvectors to solve for.
    </p>
    <p>
      First, solve for <MathJax.Node inline formula="\lambda = 1" />
    </p>
    <CenteredParagraph>
      <MathJaxMatrix
        inline
        matrix={[
          ['1 - 1', '2'],
          ['0', '2 - 1'],
        ]}
      />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </CenteredParagraph>
    <CenteredParagraph>
      <MathJaxMatrix
        inline
        matrix={[
          [0, 2],
          [0, 1],
        ]}
      />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </CenteredParagraph>
    <p>
      This matrix cannot be reduced any further by elementary row operations.
      Multiplying out the first row, we have{' '}
      <MathJax.Node inline formula="0 \cdot v_1 + 2 \cdot v_2 = 0" />. This
      means that <MathJax.Node inline formula="v_1" /> is a free variable and we
      express
      <MathJax.Node inline formula="v_2" /> in terms of it, eg:
    </p>
    <MathJax.Node formula="0 \cdot v_1 = -2 \cdot v_2" />
    <p>
      which means that <MathJax.Node inline formula="v_2" /> is just zero, so we
      can express a vector like so:
    </p>
    <MathJax.Node formula="v_1 \cdot (1, 0)" />
    <p>
      The span of which is just <MathJax.Node inline formula="(1, 0)" /> which
      is our first Eigenvector, for Eigenvalue{' '}
      <MathJax.Node inline formula="\lambda = 1" />. Lets now have a look at{' '}
      <MathJax.Node inline formula="\lambda = 2" />
    </p>
    <CenteredParagraph>
      <MathJaxMatrix
        inline
        matrix={[
          ['1 - 2', '2'],
          ['0', '2 - 2'],
        ]}
      />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </CenteredParagraph>
    <CenteredParagraph>
      <MathJaxMatrix
        inline
        matrix={[
          [-1, 2],
          [0, 0],
        ]}
      />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </CenteredParagraph>
    <p>
      In this case we have no free variables and an equation by examining the
      first row again:
    </p>
    <MathJax.Node formula="-1 \cdot v_1 + 2 \cdot v_2 = 0" />
    <MathJax.Node formula="-1 \cdot v_1 = -2 \cdot v_2" />
    <MathJax.Node formula="v_1 = 2 \cdot v_2" />
    <p>
      So, we can express another vector in terms of{' '}
      <MathJax.Node inline formula="v_2" />, that is,{' '}
      <MathJax.Node inline formula="v_2(2, 1)" />, which is our second
      Eigenvector.
    </p>
    <p>
      Recall that for some transformations, we had less than{' '}
      <MathJax.Node inline formula="n" /> solutions for Eigenvalues, but those
      solutions had higher multiplicity, <MathJax.Node inline formula="m" />. In
      such cases, there may be up to <MathJax.Node inline formula="m" />{' '}
      linearly independent vectors in the span of solutions for the Eigenvectors
      for that Eigenvalue. In general, where an Eigenvalue has multiplicity{' '}
      <MathJax.Node inline formula="m" /> then you can find up to
      <MathJax.Node inline formula="m" /> vectors, but they are not guaranteed
      to be linearly independent. Take for example the following matrix which
      shears only in the x direction:
    </p>
    <MathJaxMatrix matrix={[[1, 1, 0, 1]]} />
    <p>The characteristic equation for this Matrix is:</p>
    <MathJax.Node formula="\det \begin{pmatrix} 1 - \lambda & 2 \\ 0 & 1 - \lambda \end{pmatrix} = 0" />
    <MathJax.Node formula="(1 - \lambda)^2 - 2 \cdot 0 = 0" />
    <MathJax.Node formula="(-\lambda + 1)^2 = 0" />
    <MathJax.Node formula="\lambda^2 - 2\lambda + 1 = 0" />
    <MathJax.Node formula="(\lambda - 1)^2 = 0" />
    <MathJax.Node formula="\lambda = 1" />
    <p>
      Here we have a single Eigenvalue with algebraic multiplicity 2. If we were
      to solve for the Eigenvectors with this Eigenvalue, we would have:
    </p>
    <CenteredParagraph>
      <MathJaxMatrix
        inline
        matrix={[
          ['1 - 1', '1'],
          ['0', '1 - 1'],
        ]}
      />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </CenteredParagraph>
    <CenteredParagraph>
      <MathJaxMatrix
        inline
        matrix={[
          [0, 1],
          [0, 0],
        ]}
      />
      <MathJaxMatrix inline matrix={[['v_1'], ['v_2']]} />
      = <MathJaxMatrix inline matrix={[[0], [0]]} />
    </CenteredParagraph>
    <MathJax.Node formula="v_2 = 0" />
    <p>
      And so we would have a single vector,{' '}
      <MathJax.Node inline formula="(0, 1)" />
    </p>
    <p>
      The dimension of the span of the corresponding linearly independent
      Eigenvectors for an Eigenvalue is called the{' '}
      <Strong>geometric multiplicity</Strong> of that Eigenvalue. If the sums of
      algebraic multiplicities and geometric multiplicities for all Eigenvalues
      of a matrix are equal to each other, then the matrix is said to be{' '}
      <Strong>Diagonalizable</Strong>.
    </p>
  </Section>
);

export default EigenvectorsSection;
