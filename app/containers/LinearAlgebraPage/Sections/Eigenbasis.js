/*
 * Eigenbasis
 *
 * A section describing the Eigenbasis of a matrix and the
 * significance of Diagonalization.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import AxisVisualization3D from 'components/AxisVisualization3D';
import CenteredParagraph from 'components/CenteredParagraph';
import InterpolatedAnimation from 'components/InterpolatedAnimation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import Strong from 'components/Strong';
import TweenedAffineTransformCube from 'components/TweenedAffineTransformCube';
import Vector from 'components/Vector';

const EigenbasisSection = () => (
  <Section title="Eigenbasis and Diagonalization" anchor="eigenbasis">
    <p>
      Given that we know that a transformation can have up to{' '}
      <MathJax.Node inline formula="n" /> Eigenvectors, where{' '}
      <MathJax.Node inline formula="n" /> is the number of rows, what happens if
      we use the Eigenvectors as a <Strong>change of basis</Strong>, by
      multiplying the transformation by the matrix of the Eigenvectors?
    </p>
    <p>
      As it turns out, converting the transformation to an Eigenbasis, if
      possible, (a conversion otherwise known as{' '}
      <Strong>Eigendecomposition</Strong>) is an incredibly useful conversion
      because of what happens to the transformation when it is converted in such
      a way.
    </p>
    <p>
      Take for example, the matrix{' '}
      <MathJaxMatrix
        inline
        matrix={[
          [1, 0, 0],
          [0, 2, 1],
          [0, 0, 1],
        ]}
      />
      . This matrix scales by a factor of 2 along the y-axis, shears along the{' '}
      <MathJax.Node inline formula="xz" /> axis by a factor of 1.
    </p>
    <TweenedAffineTransformCube
      start={[
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]}
      end={[
        [1, 0, 0],
        [0, 2, 1],
        [0, 0, 1],
      ]}
      title="Matrix scaling on y axis and shearing on xz axis"
    />
    <p>
      This transformation has Eigenvalues{' '}
      <MathJax.Node inline formula="\lambda = 2" /> and{' '}
      <MathJax.Node inline formula="\lambda = 1" /> with algebraic multiplicity
      2.
    </p>
    <p>
      It also has Eigenvectors <MathJaxMatrix inline matrix={[[0], [1], [0]]} />
      , for <MathJax.Node inline formula="\lambda = 2" />, and{' '}
      <MathJaxMatrix inline matrix={[[0], [-1], [1]]} />, and{' '}
      <MathJaxMatrix inline matrix={[[1], [0], [0]]} />, for{' '}
      <MathJax.Node inline formula="\lambda = 1" /> visualized below:
    </p>
    <AxisVisualization3D
      title="Eigenvectors of matrix"
      render={() => (
        <group>
          <Vector position={new Vector3(0, 1, 0)} color={0xffff00} />
          <Vector position={new Vector3(0, -1, 0)} color={0xff00ff} />
          <Vector position={new Vector3(1, 0, 0)} color={0x00ffff} />
        </group>
      )}
    />
    <p>
      These Eigenvectors can be arranged into a new matrix called an Eigenbasis:
    </p>
    <MathJaxMatrix
      matrix={[
        [0, 1, 0],
        [-1, 0, 1],
        [1, 0, 0],
      ]}
    />
    <p>And the inverse of the Eigenbasis can be found too:</p>
    <MathJaxMatrix
      matrix={[
        [0, 0, 1],
        [1, 0, 0],
        [0, 1, 1],
      ]}
    />
    <p>
      Consider what happens if we change the basis of our matrix by
      premultiplying by the inverse of the Eigenbasis, then postmultiplying by
      the Eigenbasis (a transformation also known as an{' '}
      <Strong>Eigendecomposition</Strong>)
    </p>
    <CenteredParagraph>
      <MathJaxMatrix
        inline
        matrix={[
          [0, 0, 1],
          [1, 0, 0],
          [0, 1, 1],
        ]}
      />
      <MathJaxMatrix
        inline
        matrix={[
          [1, 0, 0],
          [0, 2, 1],
          [0, 0, 1],
        ]}
      />
      <MathJaxMatrix
        inline
        matrix={[
          [0, 1, 0],
          [-1, 0, 1],
          [1, 0, 0],
        ]}
      />
      ={' '}
      <MathJaxMatrix
        inline
        matrix={[
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 2],
        ]}
      />
    </CenteredParagraph>
    <InterpolatedAnimation
      values={{
        yScale: { begin: 2, end: 1 },
        yzShear: { begin: 1, end: 0 },
        zScale: { begin: 1, end: 2 },
      }}
      render={({ yScale, yzShear, zScale }) => (
        <AxisVisualization3D
          title="Diagonalized and orthogonalized matrix"
          render={() => (
            <group>
              <Vector position={new Vector3(1, 0, 0)} color={0xffff00} />
              <Vector
                position={new Vector3(0, yScale.value, yzShear.value)}
                color={0xff00ff}
              />
              <Vector
                position={new Vector3(0, 0, zScale.value)}
                color={0x00ffff}
              />
            </group>
          )}
        />
      )}
    />
    <p>
      Notice anything familiar? The result of changing the basis to a matrix to
      its Eigenbasis is that the matrix is put into a Diagonalized form. This is
      extremely useful, because while the matrix is in a diagonalized form, we
      can represent it like this
    </p>
    <MathJax.Node formula="\begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix} \cdot I" />
    <p>
      Thus, if we want to apply any matrix multiplication operation to the
      matrix in its diagonalized form, it is the same as applying a
      matrix-vector optimization. Computer Scientists will recognize this as a
      huge performance win, since an <MathJax.Node inline formula="O(N^2)" />{' '}
      operation just became <MathJax.Node inline formula="O(N)" />. Say for
      example we wanted to calcalculate the 16th power of the matrix:
    </p>
    <MathJaxMatrix
      matrix={[
        [1, 0, 0],
        [0, 2, 1],
        [0, 0, 1],
      ]}
    />
    <p>
      Conventionally, this would take{' '}
      <MathJax.Node inline formula="9^2 \times 16 = 1296" /> operations. If we
      did the same thing on the diagonal, we can exploit the fact that we are
      exponentiating by powers of two and same thing would take just three
      barrel-shift operations, preceded by and followed by a normal matrix
      multiplication to undo the diagonalization.
    </p>
    <p>
      Given a set of eigenvectors and eigenvalues for a matrix, we can
      re-construct the original matrix. Why is this the case? Notice that when
      we decomposed the matrix, we did the following:
    </p>
    <MathJax.Node formula="AP = PD" />
    <MathJax.Node formula="P^{-1}AP = D" />
    <p>
      Where <MathJax.Node inline formula="P" /> was our matrix of eigenvectors,{' '}
      <MathJax.Node inline formula="A" /> was our original matrix that underwent
      eigendecomposition and <MathJax.Node inline formula="D" /> is the
      eigendecomposed matrix.
    </p>
    <p>
      Now, a property of eigenvalues is that multiplying the original matrix{' '}
      <MathJax.Node inline formula="A" /> by an eigenvector{' '}
      <MathJax.Node inline formula="V" /> is the same as multiplying that
      eigenvector by its eigenvalue <MathJax.Node inline formula="\lambda" />.
      All the multiplication does in both cases is scale the vector.
    </p>
    <p>
      This is the same thing if you multiply by a matrix that only has elements
      on the diagonal - the effect is scaling, regardless of whether the
      multiplication was a premultiplication or a postmultiplication. So it
      stands to reason that if you were to arrange the eigenvalues into a
      diagonal matrix <MathJax.Node inline formula="E" /> with their columns
      corresponding to each eigenvector in the matrix{' '}
      <MathJax.Node inline formula="P" />, then the following, just like above
      with <MathJax.Node inline formula="AP = PD" />, holds true:
    </p>
    <MathJax.Node formula="AP = PE" />
    <p>Lets see if this checks out:</p>
    <p>
      <MathJax.Node inline formula="AP = " />
      <MathJaxMatrix
        inline
        matrix={[
          [1, 0, 0],
          [0, 2, 1],
          [0, 0, 1],
        ]}
      />
      <MathJaxMatrix
        inline
        matrix={[
          [0, 1, 0],
          [-1, 0, 1],
          [1, 0, 0],
        ]}
      />
      =
      <MathJaxMatrix
        inline
        matrix={[
          [0, 1, 0],
          [-1, 0, 2],
          [1, 0, 0],
        ]}
      />
    </p>
    <p>
      <MathJax.Node inline formula="PE = " />
      <MathJaxMatrix
        inline
        matrix={[
          [0, 1, 0],
          [-1, 0, 1],
          [1, 0, 0],
        ]}
      />
      <MathJaxMatrix
        inline
        matrix={[
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 2],
        ]}
      />
      =
      <MathJaxMatrix
        inline
        matrix={[
          [0, 1, 0],
          [-1, 0, 2],
          [1, 0, 0],
        ]}
      />
    </p>
    <p>
      Same thing! So now we can do the same thing as before - postmultiply both
      sides by <MathJax.Node inline formula="P^{-1}" /> and it should be the
      case that we recover <MathJax.Node inline formula="A" />, eg:
    </p>
    <MathJax.Node formula="APP^{-1} = PEP^{-1}" />
    <MathJax.Node formula="A = PEP^{-1}" />
    <p>
      <MathJax.Node inline formula="A = " />
      <MathJaxMatrix
        inline
        matrix={[
          [0, 1, 0],
          [-1, 0, 1],
          [1, 0, 0],
        ]}
      />
      <MathJaxMatrix
        inline
        matrix={[
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 2],
        ]}
      />
      <MathJaxMatrix
        inline
        matrix={[
          [0, 0, 1],
          [1, 0, 0],
          [0, 1, 1],
        ]}
      />
      <MathJax.Node inline formula=" = " />
      <MathJaxMatrix
        inline
        matrix={[
          [1, 0, 0],
          [0, 2, 1],
          [0, 0, 1],
        ]}
      />
    </p>
  </Section>
);

export default EigenbasisSection;
