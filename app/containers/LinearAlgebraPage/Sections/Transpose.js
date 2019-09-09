/*
 * Transpose
 *
 * A section on computing matrix transposes
 */

import React from 'react';

import styled from 'styled-components';

import MathJax from 'react-mathjax';

import { Matrix3, Vector3 } from 'three';

import AxisVisualization2D from 'components/AxisVisualization2D';
import InterpolatedAnimation from 'components/InterpolatedAnimation';
import MathJaxMatrix, { renderMatrix } from 'components/MathJaxMatrix';
import Section from 'components/Section';
import Strong from 'components/Strong';
import TweenedAffineTransformCube from 'components/TweenedAffineTransformCube';
import Vector from 'components/Vector';

import {
  all,
  degreesToRadians,
  matmul,
  rotate3D,
  round,
  scale3D,
  transpose,
} from 'utils/math';

const CenteredParagraph = styled.p`
  text-align: center;
`;

const rotate30Scale2 = all((x) => x.map((y) => round(y, 2)), scale3D([0, 2, 1], rotate3D([0, 1, 0], degreesToRadians(90))));

const TransposeSection = () => (
  <Section title="Transposes" anchor="transpose">
    <p>
      Another common operation applied to a matrix is known as the
      transpose of the matrix, or in mathematical terms,{' '}
      <MathJax.Node inline>A^T</MathJax.Node>.
    </p>
    <p>
      The transpose is defined for matrices of any size and
      flips all elements along the main diagonal,
      inverting the columns and rows. For instance, a{' '}
      <MathJax.Node inline>{'4 \\times 3'}</MathJax.Node> matrix would
      become a <MathJax.Node inline>{'3 \\times 4'}</MathJax.Node> matrix.
    </p>
    <MathJax.Node inline>
      {(() => {
        const matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 11]];
        return `${renderMatrix(matrix)}^T = ${renderMatrix(transpose(matrix))}`;
      })()}
    </MathJax.Node>
    <p>
      A few things to notice here. First, the elements on the diagonal
      stay the same. Second, the elements maintain their order relative
      to each other. The first column reads <MathJaxMatrix inline matrix={[[1], [5], [9]]} />
      and the first row of the transposed matrix also reads <MathJax.Node inline>{'(1, 5, 9)'}</MathJax.Node>.
    </p>
    <p>
      Third, the transpose of a transpose is itself:
    </p>
    <MathJax.Node inline>
      {(() => {
        const matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 11]];
        return `${renderMatrix(transpose(matrix))}^T = ${renderMatrix(matrix)}`;
      })()}
    </MathJax.Node>
    <p>
      Consider the case of a square matrix that is transposed. What would the
      resulting transformation look like? Take for instance, this transformation
      which rotates and scales an area.
    </p>
    <CenteredParagraph>
      <MathJaxMatrix matrix={[[0, 2], [-2, 0]]} inline />
    </CenteredParagraph>
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 1, end: 0 },
        xyInterp: { begin: 0, end: 2 },
        yxInterp: { begin: 0, end: -2 },
        yyInterp: { begin: 1, end: 0 },
      }}
      render={({ xxInterp, xyInterp, yxInterp, yyInterp }) => {
        const mat = new Matrix3();

        mat.set(xxInterp.value, xyInterp.value, 0,
                yxInterp.value, yyInterp.value, 0,
                0, 0, 0);

        return (
          <AxisVisualization2D
            title="Rotation transformation"
            render={() => (
              <group>
                <Vector position={new Vector3(mat.elements[0], mat.elements[1], 0)} color={0xffff00} />
                <Vector position={new Vector3(mat.elements[3], mat.elements[4], 0)} color={0xffff00} />
              </group>
            )}
          />
        );
      }}
    />
    <p>
      When we flip along the diagonal, we still get a rotation
      (we do not get a transformation that <Strong>undoes</Strong> the rotation), but it
      is curiously in the opposite direction.
    </p>
    <CenteredParagraph>
      <MathJaxMatrix matrix={[[0, -2], [2, 0]]} inline />
    </CenteredParagraph>
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 1, end: 0 },
        xyInterp: { begin: 0, end: -2 },
        yxInterp: { begin: 0, end: 2 },
        yyInterp: { begin: 1, end: 0 },
      }}
      render={({ xxInterp, xyInterp, yxInterp, yyInterp }) => {
        const mat = new Matrix3();

        mat.set(xxInterp.value, xyInterp.value, 0,
                yxInterp.value, yyInterp.value, 0,
                0, 0, 0);

        return (
          <AxisVisualization2D
            title="Rotation transformation"
            render={() => (
              <group>
                <Vector position={new Vector3(mat.elements[0], mat.elements[1], 0)} color={0xffff00} />
                <Vector position={new Vector3(mat.elements[3], mat.elements[4], 0)} color={0xffff00} />
              </group>
            )}
          />
        );
      }}
    />
    <p>
      The same sort of effect happens in three dimensions too. Take this matrix
      which rotates around the y axis by about thirty degrees and scales on the y
      axis by 2.
    </p>
    <TweenedAffineTransformCube
      start={[[1, 0, 0], [0, 1, 0], [0, 0, 1]]}
      end={scale3D([1, 2, 1], rotate3D([0, 1, 0], degreesToRadians(90)))}
      title="Rotation by thirty degrees and scaled on y-axis"
    />
    <p>
      The transpose of this matrix rotates around the y axis by
      negative thirty degrees, but still scales on the y axis by 2.
    </p>
    <TweenedAffineTransformCube
      start={[[1, 0, 0], [0, 1, 0], [0, 0, 1]]}
      end={transpose(scale3D([0, 2, 1], rotate3D([0, 1, 0], degreesToRadians(90))))}
      title="Rotation by thirty degrees and scaled on y-axis, transposed"
    />
    <p>
      We say that then that the transpose is the <Strong>contravariant</Strong>{' '}
      transformation. Instead of vectors transforming with the matrix, they
      are transformed against it.
    </p>
    <p>
      What happens if we premultiply a matrix by its own transpose?
    </p>
    <div>
      <MathJaxMatrix
        inline
        matrix={transpose(rotate30Scale2)}
      />
      <MathJaxMatrix
        inline
        matrix={rotate30Scale2}
      />
      =
      <MathJaxMatrix
        inline
        matrix={matmul(transpose(rotate30Scale2), rotate30Scale2)}
      />
    </div>
    <TweenedAffineTransformCube
      start={[[1, 0, 0], [0, 1, 0], [0, 0, 1]]}
      end={matmul(transpose(rotate30Scale2), rotate30Scale2)}
      title="Matrix transpose times matrix"
    />
    <p>
      You will notice that space gets flattened into a line. This is called
      the covariance matrix and specifies a vector where the two matrices
      transform with each other.
    </p>
  </Section>
);

export default TransposeSection;
