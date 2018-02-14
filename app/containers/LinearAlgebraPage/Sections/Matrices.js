/*
 * Matrices
 *
 * A section on Matrices
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Matrix3, Vector3 } from 'three';

import AxisVisualization2D from 'components/AxisVisualization2D';
import InterpolatedAnimation from 'components/InterpolatedAnimation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';

const MatricesSection = () => (
  <Section title="Matrices" anchor="matrices">
    <p>
      The traditional way of thinking about matrices is as systems of linear
      equations. For instance, you might have the following two equations:
    </p>
    <MathJax.Node>{'2x + 3y = 4'}</MathJax.Node>
    <MathJax.Node>{'6x + 2y = 1'}</MathJax.Node>
    <p>
      Those two equations are telling you about two relationships between
      the variables <MathJax.Node inline>{'x'}</MathJax.Node> and{' '}
      <MathJax.Node inline>{'y'}</MathJax.Node>. With those two relationships, you
      can solve for what those variables are.
    </p>
    <p>
      If you only had one equation, you do not have enough information to
      solve for both <MathJax.Node inline>{'x'}</MathJax.Node> and{' '}
      <MathJax.Node inline>{'y'}</MathJax.Node>. In fact, they could be anything
      that satisfies the relationship, or anything on the line{' '}
      <MathJax.Node inline>{'2x + 3y = 4'}</MathJax.Node>, which after
      a little bit of algebra, we can represent like this:
    </p>
    <MathJax.Node>{'2x + 3y = 4'}</MathJax.Node>
    <MathJax.Node>{'3y = 4 - 2x'}</MathJax.Node>
    <MathJax.Node>{'y = \\frac{4 - 2x}{3}'}</MathJax.Node>
    <p>
      And if you graphed that line, you would see that valid solution that
      satisfies that relationship exists anywhere on that line
    </p>
    <AxisVisualization2D
      render={() => <Vector position={new Vector3(100, -65.3, 0)} color={0xffff00} />}
    />
    <p>
      However, once we add the other line, as long as they are not parallel,
      then the two will intersect in one place and we will have a single
      solution for both <MathJax.Node inline>{'x'}</MathJax.Node> and{' '}
      <MathJax.Node inline>{'y'}</MathJax.Node>.
    </p>
    <MathJax.Node>{'6x + 2y = 1'}</MathJax.Node>
    <MathJax.Node>{'2y = 1 - 6x'}</MathJax.Node>
    <MathJax.Node>{'y = \\frac{1 - 6x}{2}'}</MathJax.Node>
    <AxisVisualization2D
      render={() => (
        <group>
          <Vector position={new Vector3(100, -65.3, 0)} color={0xff00ff} />
          <Vector position={new Vector3(100, -299.5, 0)} color={0xffff00} />
        </group>
      )}
    />
    <p>
      A matrix is just a shorthand way of expressing such a system of equations
      where we take away the variables and put the entire system in square
      brackets.
    </p>
    <MathJaxMatrix matrix={[[2, 3], [6, 2]]} />
    <p>
      Comparing this matrix to the system of equations above, it is now possible
      to see what is being represented here. Since each row contains
      an <MathJax.Node inline>{'x'}</MathJax.Node> and a{' '}
      <MathJax.Node inline>{'y'}</MathJax.Node>, you could say that each row
      itself is a vector. But then, like with the number of equations above, the
      number of rows tells you at most how many variables you can solve for. In
      some cases you will not always be able to solve for a variable, despite
      there being enough rows to be able to solve for it, but that actually
      tells you something about the underlying equations themselves.
    </p>
    <p>
      Generalizing a little bit further, the each row gives you a piece of
      information about the input space and each column gives you a piece
      of information about the output space.
    </p>
    <p>
      If we were to visualize the rows of that matrix, we have these vectors:
    </p>
    <AxisVisualization2D
      render={() => (
        <group>
          <Vector position={new Vector3(2, 3, 0)} color={0xff00ff} />
          <Vector position={new Vector3(6, 2, 0)} color={0xffff00} />
        </group>
      )}
    />
    <p>
      And if we were to visualize the columns of that matrix, we have these vectors:
    </p>
    <AxisVisualization2D
      render={() => (
        <group>
          <Vector position={new Vector3(2, 6, 0)} color={0xff00ff} />
          <Vector position={new Vector3(3, 2, 0)} color={0xffff00} />
        </group>
      )}
    />
    <p>
      Matrix-matrix addition and subtraction is not very interesting - you just
      add up all the components. Again, the two matrices need to be the same
      size in order for this to work. So for instance, if we wanted to add
      the following matrices:
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 1], [2, 0]]} />{' + '}
      <MathJaxMatrix inline matrix={[[2, 1], [1, 1]]} />
    </p>
    <p>
      You would end up adding each separate vector component together, which
      we would visualize like so:
    </p>
    <InterpolatedAnimation
      values={{
        xxAdd: { begin: 0, end: 2 },
        xyAdd: { begin: 0, end: 1 },
        yxAdd: { begin: 0, end: 1 },
        yyAdd: { begin: 0, end: 1 },
      }}
      render={({ xxAdd, xyAdd, yxAdd, yyAdd }) => {
        const a1 = new Vector3(1, 1, 0);
        const b1 = new Vector3(xxAdd.value, xyAdd.value, 0);
        const c1 = new Vector3(a1.x + b1.x, a1.y + b1.y, 0);

        const a2 = new Vector3(2, 0, 0);
        const b2 = new Vector3(yxAdd.value, yyAdd.value, 0);
        const c2 = new Vector3(a2.x + b2.x, a2.y + b2.y, 0);

        return (
          <div>
            <AxisVisualization2D
              render={() => (
                <group>
                  <Vector position={a1} color={0xffff00} />
                  <Vector position={c1} color={0xffff00} base={a1} />
                  <Vector position={c1} color={0xffff00} />
                  <Vector position={a2} color={0x00ff00} />
                  <Vector position={c2} color={0x00ff00} base={a2} />
                  <Vector position={c2} color={0x00ff00} />
                </group>
              )}
            />
          </div>
        );
      }}
    />
    <p>
      Matrix-vector multiplication is where things get a little more interesting
      since what we are doing here is transforming the vector by putting it
      into the output space described by the vectors in the matrix.
    </p>
    <p>
      This is defined by, for each row, multiplying each entry in each column
      by each entry in each row of the vector and then adding up the result
      into the output row. Remember that the output space is described by
      the number of rows in the matrix, so you will end up with a vector that
      has as many dimensions as the matrix has rows. In order for the operation
      to work, you need to have as many as you have rows in the vector
      you will be multiplying by. For instance, this transformation is going
      to scale the existing vector by 2 units in the <MathJax.Node inline>{'x'}</MathJax.Node>
      direction and 2 units in the <MathJax.Node inline>{'y'}</MathJax.Node> direction:
    </p>
    <p>
      <MathJaxMatrix matrix={[[2, 0], [0, 2]]} inline />
      <MathJaxMatrix matrix={[[3], [1]]} inline />
      {' = '}<MathJaxMatrix matrix={[[6 + 0], [0 + 2]]} inline />
    </p>
    <InterpolatedAnimation
      values={{
        xxAdd: { begin: 0, end: 1 },
        yyAdd: { begin: 0, end: 1 },
      }}
      render={({ xxAdd, yyAdd }) => {
        const mat = new Matrix3();
        const input = new Vector3(3, 1, 0);

        mat.set(1 + xxAdd.value, 0, 0,
                0, 1 + yyAdd.value, 0,
                0, 0, 0);

        const output = input.clone().applyMatrix3(mat);

        return (
          <AxisVisualization2D
            render={() => (
              <group>
                <Vector position={new Vector3(mat.elements[0], mat.elements[1], 0)} color={0xffff00} />
                <Vector position={new Vector3(mat.elements[3], mat.elements[4], 0)} color={0xffff00} />
                <Vector position={output} color={0xff00ff} />
              </group>
            )}
          />
        );
      }}
    />
    <p>
      What is more interesting is when you have transformations that are not
      purely scalar. For instance, this transformation is going to move
      the vector 1 unit in the <MathJax.Node inline>{'x'}</MathJax.Node> direction
      for every unit that it has in the <MathJax.Node inline>{'y'}</MathJax.Node>{' '}
      direction. Such a transformation is called a <Strong>shear</Strong>.
    </p>
    <p>
      <MathJaxMatrix matrix={[[1, 1], [0, 1]]} inline />
      <MathJaxMatrix matrix={[[2], [3]]} inline />
      {' = '}<MathJaxMatrix matrix={[[5 + 0], [0 + 3]]} inline />
    </p>
    <InterpolatedAnimation
      values={{
        xyInterp: { begin: 0, end: 1 },
      }}
      render={({ xyInterp }) => {
        const mat = new Matrix3();
        const input = new Vector3(2, 3, 0);

        mat.set(1, xyInterp.value, 0,
                0, 1, 0,
                0, 0, 0);

        const output = input.clone().applyMatrix3(mat);

        return (
          <div>
            <AxisVisualization2D
              render={() => (
                <group>
                  <Vector position={new Vector3(mat.elements[0], mat.elements[1], 0)} color={0xffff00} />
                  <Vector position={new Vector3(mat.elements[3], mat.elements[4], 0)} color={0xffff00} />
                  <Vector position={output} color={0xff00ff} />
                </group>
              )}
            />
          </div>
        );
      }}
    />
    <p>
      As we do these transformations, pay attention to the two yellow vectors
      and their relationship with the magenta vector. The two yellow vectors
      are something called a <Strong>basis</Strong> for the 2D space, something
      we will revisit later. They are being interpolated from their default
      position to the position specified in the matrix.
    </p>
    <p>
      This one just takes every step in the x direction and translates
      the vector that much in the y direction and vice versa. As such, it is
      a reflection.
    </p>
    <p>
      <MathJaxMatrix matrix={[[0, 1], [1, 0]]} inline />
      <MathJaxMatrix matrix={[[2], [3]]} inline />
      {' = '}<MathJaxMatrix matrix={[[3], [2]]} inline />
    </p>
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 1, end: 0 },
        xyInterp: { begin: 0, end: 1 },
        yxInterp: { begin: 0, end: 1 },
        yyInterp: { begin: 1, end: 0 },
      }}
      render={({ xxInterp, xyInterp, yxInterp, yyInterp }) => {
        const mat = new Matrix3();
        const input = new Vector3(2, 3, 0);

        mat.set(xxInterp.value, xyInterp.value, 0,
                yxInterp.value, yyInterp.value, 0,
                0, 0, 0);

        const output = input.clone().applyMatrix3(mat);

        return (
          <div>
            <AxisVisualization2D
              render={() => (
                <group>
                  <Vector position={new Vector3(mat.elements[0], mat.elements[1], 0)} color={0xffff00} />
                  <Vector position={new Vector3(mat.elements[3], mat.elements[4], 0)} color={0xffff00} />
                  <Vector position={output} color={0xff00ff} />
                </group>
              )}
            />
          </div>
        );
      }}
    />
    <p>
      This one actually rotates the whole system around by about
      90 degrees, by moving down in the y direction for every step
      in the x direction and moving right in the x direction for every
      step in the y direction.
    </p>
    <p>
      <MathJaxMatrix matrix={[[0, 1], [-1, 0]]} inline />
      <MathJaxMatrix matrix={[[2], [3]]} inline />
      {' = '}<MathJaxMatrix matrix={[[3], [-2]]} inline />
    </p>
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 1, end: 0 },
        xyInterp: { begin: 0, end: 1 },
        yxInterp: { begin: 0, end: -1 },
        yyInterp: { begin: 1, end: 0 },
      }}
      render={({ xxInterp, xyInterp, yxInterp, yyInterp }) => {
        const mat = new Matrix3();
        const input = new Vector3(2, 3, 0);

        mat.set(xxInterp.value, xyInterp.value, 0,
                yxInterp.value, yyInterp.value, 0,
                0, 0, 0);

        const output = input.clone().applyMatrix3(mat);

        return (
          <AxisVisualization2D
            render={() => (
              <group>
                <Vector position={new Vector3(mat.elements[0], mat.elements[1], 0)} color={0xffff00} />
                <Vector position={new Vector3(mat.elements[3], mat.elements[4], 0)} color={0xffff00} />
                <Vector position={output} color={0xff00ff} />
              </group>
            )}
          />
        );
      }}
    />
    <p>
      What about multiplying two matrices? Well, we can take what we know about
      matrices - the fact that they are sets of vectors, the rows represent
      the input space and the columsn represent the output space and our
      definition of matrix-vector multiplication to multiply two matricies by{' '}
      ...multiplying each column vector in the right hand
      matrix by the left hand side matrix.
    </p>
    <p>
      To make things a little simpler, I have color-coded the the vectors
      in the right hand matrix. The yellow vector represents
      first column and the magenta vector represents the second column.
    </p>
    <p>
      <MathJaxMatrix matrix={[[2, 0], [0, 2]]} inline />
      <MathJaxMatrix matrix={[[3, 1], [1, 1]]} inline />
      {' = '}<MathJaxMatrix matrix={[[6, 2], [2, 2]]} inline />
    </p>
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 1, end: 2 },
        yyInterp: { begin: 1, end: 2 },
      }}
      render={({ xxInterp, yyInterp }) => {
        const mat = new Matrix3();
        const input = new Matrix3();

        input.set(3, 1, 0,
                  1, 1, 0,
                  0, 0, 0);
        mat.set(xxInterp.value, 0, 0,
                0, yyInterp.value, 0,
                0, 0, 0);

        const output = input.clone().multiply(mat);

        return (
          <AxisVisualization2D
            render={() => (
              <group>
                <Vector position={new Vector3(mat.elements[0], mat.elements[1], 0)} color={0x00ffff} />
                <Vector position={new Vector3(mat.elements[3], mat.elements[4], 0)} color={0x00ffff} />
                <Vector position={new Vector3(output.elements[0], output.elements[1], 0)} color={0xff00ff} />
                <Vector position={new Vector3(output.elements[3], output.elements[4], 0)} color={0xffff00} />
              </group>
            )}
          />
        );
      }}
    />
    <p>
      Again, notice what happens to each vector in the second matrix as the
      transformation in the first is applied to it. In the second matrix,
      we had the vector <MathJax.Node inline>{'(1, 1)'}</MathJax.Node>, which got scaled
      2 in the x-direction for every component of its x-direction and 2 in
      the y-direction for every component in the y direction. So it ended
      up on <MathJax.Node inline>{'(2, 2)'}</MathJax.Node>.
    </p>
    <p>
      Similarly, for the vector <MathJax.Node inline>{'(3, 1)'}</MathJax.Node>, it was also scaled
      2 in the x-direction for every component of its x-direction and 2 in
      the y-direction for every component in the y direction. So it ended
      up on <MathJax.Node inline>{'(6, 2)'}</MathJax.Node>.
    </p>
    <p>
      Here is something a little more complicated - we will apply the same
      rotation that we did earlier.
    </p>
    <p>
      <MathJaxMatrix matrix={[[0, 1], [-1, 0]]} inline />
      <MathJaxMatrix matrix={[[3, 1], [1, 1]]} inline />
      {' = '}<MathJaxMatrix matrix={[[1, 1], [-3, -1]]} inline />
    </p>
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 1, end: 0 },
        xyInterp: { begin: 0, end: 1 },
        yxInterp: { begin: 0, end: -1 },
        yyInterp: { begin: 1, end: 0 },
      }}
      render={({ xxInterp, xyInterp, yxInterp, yyInterp }) => {
        const mat = new Matrix3();
        const input = new Matrix3();

        input.set(3, 1, 0,
                  1, 1, 0,
                  0, 0, 0);
        mat.set(xxInterp.value, xyInterp.value, 0,
                yxInterp.value, yyInterp.value, 0,
                0, 0, 0);

        const output = mat.clone().multiply(input);

        return (
          <AxisVisualization2D
            render={() => (
              <group>
                <Vector position={new Vector3(mat.elements[0], mat.elements[1], 0)} color={0x00ffff} />
                <Vector position={new Vector3(mat.elements[3], mat.elements[4], 0)} color={0x00ffff} />
                <Vector position={new Vector3(output.elements[0], output.elements[1], 0)} color={0xff00ff} />
                <Vector position={new Vector3(output.elements[3], output.elements[4], 0)} color={0xffff00} />
              </group>
            )}
          />
        );
      }}
    />
  </Section>
);

export default MatricesSection;
