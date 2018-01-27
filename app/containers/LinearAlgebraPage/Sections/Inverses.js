/*
 * Inverses
 *
 * A section on computing matrix inverses
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { BoxGeometry, Euler, Matrix3, Matrix4, Vector3 } from 'three';

import { XAxis, YAxis, ZAxis } from 'components/Axis';
import Animation from 'components/Animation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';
import Visualization from 'components/Visualization';

const InversesSection = () => (
  <Section title="Inverses" anchor="inverses">
    <p>
      We saw earlier that products of matrices and vectors have a definition
      that can be understood through the lens of transformation. But what about
      division by a matrix? The only intuitive definition we can think of might
      be dividing every coefficient in an <MathJax.Node inline>m \times n</MathJax.Node>{' '}
      matrix, but that would run counter to our understanding of multiplication, which
      is defined on matrices of size <MathJax.Node inline>m \times n</MathJax.Node>{' '}
      and <MathJax.Node inline>n \times m</MathJax.Node>, where each component becomes
      a dot product of its corresponding row and column.
    </p>
    <p>
      Instead, we might want to think about division in terms of multiplication. Remember
      that multiplying any number by a fraction with numerator 1 is a division by the
      denominator of that fraction. And also recall that any fraction with numerator 1
      is the <Strong>inverse</Strong> of multiplication by the denominator, in the sense
      that if we multiply 1 by the denominator, multiplying by the fraction will undo
      the multiplication and yield 1 again.
    </p>
    <MathJax.Node>
      {'1 \\times a \\times \\frac{1}{a} = 1'}
    </MathJax.Node>
    <p>
      For the sake of notational convenience, we usually refer to such fractions as negative
      exponents, since we can exploit the fact that multiplying two numbers together
      adds their powers and the sum of 1 and -1 is zero.
    </p>
    <MathJax.Node>
      1 \times a^1 \times a^-1 = a^0 = 1
    </MathJax.Node>
    <p>
      Note that not every number has an inverse. In particular, if what we are multiplying
      by is zero then there is no way that you can use a function to get the number back, since
      zero times anything is zero. Expressed as fractional notation, it would not make much sense
      either:
    </p>
    <MathJax.Node>
      {'1 \\times 0 \\times \\frac{1}{0} = ?'}
    </MathJax.Node>
    <p>
      In those cases, we say that the number has no inverse, since it would be the same thing
      as dividing by zero.
    </p>
    <p>
      We can express the same thing for matrices as well - the product of any matrix
      and its inverse (if the inverse exists) will always be the indentity matrix,
      <MathJax.Node inline>I</MathJax.Node>
    </p>
    <MathJax.Node>
      A^-1 \times A = I
    </MathJax.Node>
    <p>
      So if we can find <MathJax.Node inline>A^-1</MathJax.Node> then by premultiplying a
      matrix by it, we are effectively dividing by <MathJax.Node inline>A</MathJax.Node>.
    </p>
    <p>
      Again, note that not every matrix has an inverse. Recall that some transformations
      squash all of space on to a line or a plane:
    </p>
    <Animation
      initial={{
        time: 0,
        rotation: new Euler(0.5, 0.5, 0),
      }}
      update={(state) => ({
        time: state.time + 1,
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const iHat = new Vector3(1, lerp, 0);
        const jHat = new Vector3(lerp, 1, 0);
        const kHat = new Vector3(0, 0, 1);

        const mat = new Matrix4();
        mat.set(1, lerp, 0, 0,
                lerp, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        const cubeGeometry = new BoxGeometry(1, 1, 1);
        cubeGeometry.translate(0.5, 0.5, 0.5);
        cubeGeometry.applyMatrix(mat);

        return (
          <div>
            <Visualization width={320} height={240} rotation={state.rotation}>
              <XAxis />
              <YAxis />
              <ZAxis />
              <mesh>
                <geometry
                  vertices={cubeGeometry.vertices}
                  faces={cubeGeometry.faces}
                  colors={cubeGeometry.colors}
                  faceVertexUvs={cubeGeometry.faceVertexUvs}
                />
                <meshBasicMaterial color={0xff00ff} opacity={0.8} transparent wireframe />
              </mesh>
              <Vector position={iHat} color={0xffff00} />
              <Vector position={jHat} color={0xff00ff} />
              <Vector position={kHat} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      In this case, it would be impossible to find a matrix that would go back to
      our original space, since multiple points within the space all could have ended
      up in the same position on the plane. We also said that at least for this
      3x3 transformation that it had an overall volume of zero and thus the determinant
      was zero. We will see shortly why a zero determinant means that an inverse cannot
      exist formally.
    </p>
    <p>
      Now for computing inverses. We will start with the 2x2 case. In this instance, I
      am just going to throw down a formula, but be aware that the formula is not
      a general or even recursive definition for how an inverse is calculated, but is
      really just a shortcut for the 2x2 case:
    </p>
    <MathJax.Node>
      {'\\frac{1}{\\det A} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}'}
    </MathJax.Node>
    <p>
      You would be forgiven for thinking that formula had been pulled out of nowhere,
      so lets break it down into its components by focusing on an example: a matrix
      that scales by 2 in both directions and rotates counterclockwise.
    </p>
    <MathJaxMatrix matrix={[[0, 2], [-2, 0]]} />
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const mat = new Matrix3();

        mat.set(1 - (1 * lerp), (2 * lerp), 0,
                (-2 * lerp), 1 - (1 * lerp), 0,
                0, 0, 0);

        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);

        iHat.applyMatrix3(mat);
        jHat.applyMatrix3(mat);

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <Vector position={iHat} color={0xffff00} />
              <Vector position={jHat} color={0xff00ff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      Now, consider just multiplying the transforemd basis vectors by
      the rearranged matrix we saw earlier. Does this get us back to
      the standard basis vectors?
    </p>
    <MathJaxMatrix matrix={[[0, -2], [2, 0]]} />
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const mat = new Matrix3();

        mat.set(0, 2, 0,
                -2, 0, 0,
                0, 0, 0);

        const inverse = new Matrix3();
        inverse.set(1 - lerp, -2 * lerp, 0,
                    2 * lerp, 1 - lerp, 0,
                    0, 0, 0);

        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);

        iHat.applyMatrix3(mat);
        jHat.applyMatrix3(mat);

        iHat.applyMatrix3(inverse);
        jHat.applyMatrix3(inverse);

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <Vector position={iHat} color={0xffff00} />
              <Vector position={jHat} color={0xff00ff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      Unfortunately that did not quite do what we wanted. We rotated
      back to our basis vectors, but now they are four times as big! The
      problem with just rearranging the matrix like this is that it did not
      undo the change in the area, in fact, the determinant of the transformation
      was preserved so by multiplying by the new matrix, we just made space
      twice more expanded.
    </p>
    <p>
      This is the reason why in order to find the inverse, we also
      need to undo the change in the determinant by scaling by
      the inverse of the determinant.
    </p>
    <MathJax.Node>
      {'\\frac{1}{0 \\times 0 - 2 \\times -2} \\times \\begin{pmatrix} 0 & -2 \\\\ 2 & 0 \\end{pmatrix}'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\frac{1}{4} \\times \\begin{pmatrix} 0 & -2 \\\\ 2 & 0 \\end{pmatrix}'}
    </MathJax.Node>
    <p>
      Now, if we do that, the transformation takes us back to our basis vectors. Note that
      the fact that we multiply by the inverse of the determinant means that some
      matrices are by definition non-invertable, because we cannot multiply by the
      inverse of zero.
    </p>
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const mat = new Matrix3();

        mat.set(0, 2, 0,
                -2, 0, 0,
                0, 0, 0);

        const inverse = new Matrix3();
        inverse.set(1 - lerp, -2 * lerp, 0,
                    2 * lerp, 1 - lerp, 0,
                    0, 0, 0);
        inverse.multiplyScalar(1 - ((1 - 0.25) * lerp));

        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);

        iHat.applyMatrix3(mat);
        jHat.applyMatrix3(mat);

        iHat.applyMatrix3(inverse);
        jHat.applyMatrix3(inverse);

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <Vector position={iHat} color={0xffff00} />
              <Vector position={jHat} color={0xff00ff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      Now if this section followed the others, it would give a generalized
      technique for extending this knowledge into multiple dimensions. Unfortunately,
      there is no general mechanism for computing inverses of
      <MathJax.Node inline>n \times m</MathJax.Node> matrices. Instead, we will
      explore a more algorithmic approach using <Strong>Elementary Row Operations</Strong>.
    </p>
    <p>
      Recall that by using <Strong>Elementary Row Operations</Strong> that we were able
      to take a complex looking transformation and reduce it down to the identity matrix. If
      we were able to represent those operations as a matrix, that matrix would be the
      inverse of the original matrix.
    </p>
    <p>
      Consider the same 3x3 transformation we row-reduced above:
    </p>
    <MathJaxMatrix matrix={[[1, -1, 0], [-1, -1, 0], [2, 1, 2]]} />
    <p>
      We will row-reduce it again, but this time, we will apply the same
      operations to the identity matrix and observe how that transformation
      affects an already transformed unit cube. So, side by side:
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[1, -1, 0], [-1, -1, 0], [2, 1, 2]]} />
      <MathJaxMatrix inline matrix={[[1, 0, 0], [0, 1, 0], [0, 0, 1]]} />
    </p>
    <Animation
      initial={{
        time: 0,
        rotation: new Euler(0.5, 0.5, 0),
      }}
      update={(state) => ({
        time: state.time + 1,
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
      })}
      render={(state) => {
        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);
        const kHat = new Vector3(0, 0, 1);

        const mat = new Matrix4();
        mat.set(1, -1, 0, 0,
                -1, -1, 0, 0,
                2, 1, 2, 0,
                0, 0, 0, 1);

        const candidateInverse = new Matrix4();
        candidateInverse.set(1, 0, 0, 0,
                             0, 1, 0, 0,
                             0, 0, 1, 0,
                             0, 0, 0, 1);

        iHat.applyMatrix4(mat);
        iHat.applyMatrix4(candidateInverse);
        jHat.applyMatrix4(mat);
        jHat.applyMatrix4(candidateInverse);
        kHat.applyMatrix4(mat);
        kHat.applyMatrix4(candidateInverse);

        const cubeGeometry = new BoxGeometry(1, 1, 1);
        cubeGeometry.translate(0.5, 0.5, 0.5);
        cubeGeometry.applyMatrix(mat);
        cubeGeometry.applyMatrix(candidateInverse);

        return (
          <div>
            <Visualization width={320} height={240} rotation={state.rotation}>
              <XAxis />
              <YAxis />
              <ZAxis />
              <mesh>
                <geometry
                  vertices={cubeGeometry.vertices}
                  faces={cubeGeometry.faces}
                  colors={cubeGeometry.colors}
                  faceVertexUvs={cubeGeometry.faceVertexUvs}
                />
                <meshBasicMaterial color={0xff00ff} opacity={0.8} />
              </mesh>
              <Vector position={iHat} color={0xffff00} />
              <Vector position={jHat} color={0xff00ff} />
              <Vector position={kHat} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      First, subtract 2 times the first row from the third.
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[1, -1, 0], [-1, -1, 0], [0, 3, 2]]} />
      <MathJaxMatrix inline matrix={[[1, 0, 0], [0, 1, 0], [-2, 0, 1]]} />
    </p>
    <Animation
      initial={{
        time: 0,
        rotation: new Euler(0.5, 0.5, 0),
      }}
      update={(state) => ({
        time: state.time + 1,
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
      })}
      render={(state) => {
        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);
        const kHat = new Vector3(0, 0, 1);

        const mat = new Matrix4();
        mat.set(1, -1, 0, 0,
                -1, -1, 0, 0,
                2, 1, 2, 0,
                0, 0, 0, 1);

        const candidateInverse = new Matrix4();
        candidateInverse.set(1, 0, 0, 0,
                             0, 1, 0, 0,
                             -2, 0, 1, 0,
                             0, 0, 0, 1);

        iHat.applyMatrix4(mat);
        iHat.applyMatrix4(candidateInverse);
        jHat.applyMatrix4(mat);
        jHat.applyMatrix4(candidateInverse);
        kHat.applyMatrix4(mat);
        kHat.applyMatrix4(candidateInverse);

        const cubeGeometry = new BoxGeometry(1, 1, 1);
        cubeGeometry.translate(0.5, 0.5, 0.5);
        cubeGeometry.applyMatrix(mat);
        cubeGeometry.applyMatrix(candidateInverse);

        return (
          <div>
            <Visualization width={320} height={240} rotation={state.rotation}>
              <XAxis />
              <YAxis />
              <ZAxis />
              <mesh>
                <geometry
                  vertices={cubeGeometry.vertices}
                  faces={cubeGeometry.faces}
                  colors={cubeGeometry.colors}
                  faceVertexUvs={cubeGeometry.faceVertexUvs}
                />
                <meshBasicMaterial color={0xff00ff} opacity={0.8} />
              </mesh>
              <Vector position={iHat} color={0xffff00} />
              <Vector position={jHat} color={0xff00ff} />
              <Vector position={kHat} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      Now subtract the second row from the first.
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[2, 0, 0], [-1, -1, 0], [0, 3, 2]]} />
      <MathJaxMatrix inline matrix={[[1, -1, 0], [0, 1, 0], [-2, 0, 1]]} />
    </p>
    <Animation
      initial={{
        time: 0,
        rotation: new Euler(0.5, 0.5, 0),
      }}
      update={(state) => ({
        time: state.time + 1,
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
      })}
      render={(state) => {
        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);
        const kHat = new Vector3(0, 0, 1);

        const mat = new Matrix4();
        mat.set(1, -1, 0, 0,
                -1, -1, 0, 0,
                2, 1, 2, 0,
                0, 0, 0, 1);

        const candidateInverse = new Matrix4();
        candidateInverse.set(1, -1, 0, 0,
                             0, 1, 0, 0,
                             -2, 0, 1, 0,
                             0, 0, 0, 1);

        iHat.applyMatrix4(mat);
        iHat.applyMatrix4(candidateInverse);
        jHat.applyMatrix4(mat);
        jHat.applyMatrix4(candidateInverse);
        kHat.applyMatrix4(mat);
        kHat.applyMatrix4(candidateInverse);

        const cubeGeometry = new BoxGeometry(1, 1, 1);
        cubeGeometry.translate(0.5, 0.5, 0.5);
        cubeGeometry.applyMatrix(mat);
        cubeGeometry.applyMatrix(candidateInverse);

        return (
          <div>
            <Visualization width={320} height={240} rotation={state.rotation}>
              <XAxis />
              <YAxis />
              <ZAxis />
              <mesh>
                <geometry
                  vertices={cubeGeometry.vertices}
                  faces={cubeGeometry.faces}
                  colors={cubeGeometry.colors}
                  faceVertexUvs={cubeGeometry.faceVertexUvs}
                />
                <meshBasicMaterial color={0xff00ff} opacity={0.8} />
              </mesh>
              <Vector position={iHat} color={0xffff00} />
              <Vector position={jHat} color={0xff00ff} />
              <Vector position={kHat} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      Then add half of the first row to the second.
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[2, 0, 0], [0, -1, 0], [0, 3, 2]]} />
      <MathJaxMatrix inline matrix={[[1, -1, 0], ['1 \\over 2', '1 \\over 2', 0], [-2, 0, 1]]} />
    </p>
    <Animation
      initial={{
        time: 0,
        rotation: new Euler(0.5, 0.5, 0),
      }}
      update={(state) => ({
        time: state.time + 1,
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
      })}
      render={(state) => {
        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);
        const kHat = new Vector3(0, 0, 1);

        const mat = new Matrix4();
        mat.set(1, -1, 0, 0,
                -1, -1, 0, 0,
                2, 1, 2, 0,
                0, 0, 0, 1);

        const candidateInverse = new Matrix4();
        candidateInverse.set(1, -1, 0, 0,
                             0.5, 0.5, 0, 0,
                             -2, 0, 1, 0,
                             0, 0, 0, 1);

        iHat.applyMatrix4(mat);
        iHat.applyMatrix4(candidateInverse);
        jHat.applyMatrix4(mat);
        jHat.applyMatrix4(candidateInverse);
        kHat.applyMatrix4(mat);
        kHat.applyMatrix4(candidateInverse);

        const cubeGeometry = new BoxGeometry(1, 1, 1);
        cubeGeometry.translate(0.5, 0.5, 0.5);
        cubeGeometry.applyMatrix(mat);
        cubeGeometry.applyMatrix(candidateInverse);

        return (
          <div>
            <Visualization width={320} height={240} rotation={state.rotation}>
              <XAxis />
              <YAxis />
              <ZAxis />
              <mesh>
                <geometry
                  vertices={cubeGeometry.vertices}
                  faces={cubeGeometry.faces}
                  colors={cubeGeometry.colors}
                  faceVertexUvs={cubeGeometry.faceVertexUvs}
                />
                <meshBasicMaterial color={0xff00ff} opacity={0.8} />
              </mesh>
              <Vector position={iHat} color={0xffff00} />
              <Vector position={jHat} color={0xff00ff} />
              <Vector position={kHat} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      Add three times the second row to the third
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[2, 0, 0], [0, -1, 0], [0, 0, 2]]} />
      <MathJaxMatrix inline matrix={[[1, -1, 0], ['1 \\over 2', '1 \\over 2', 0], ['-1 \\over 2', '3 \\over 2', 1]]} />
    </p>
    <Animation
      initial={{
        time: 0,
        rotation: new Euler(0.5, 0.5, 0),
      }}
      update={(state) => ({
        time: state.time + 1,
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
      })}
      render={(state) => {
        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);
        const kHat = new Vector3(0, 0, 1);

        const mat = new Matrix4();
        mat.set(1, -1, 0, 0,
                -1, -1, 0, 0,
                2, 1, 2, 0,
                0, 0, 0, 1);

        const candidateInverse = new Matrix4();
        candidateInverse.set(1, -1, 0, 0,
                             0.5, 0.5, 0, 0,
                             -0.5, 1.5, 1, 0,
                             0, 0, 0, 1);

        iHat.applyMatrix4(mat);
        iHat.applyMatrix4(candidateInverse);
        jHat.applyMatrix4(mat);
        jHat.applyMatrix4(candidateInverse);
        kHat.applyMatrix4(mat);
        kHat.applyMatrix4(candidateInverse);

        const cubeGeometry = new BoxGeometry(1, 1, 1);
        cubeGeometry.translate(0.5, 0.5, 0.5);
        cubeGeometry.applyMatrix(mat);
        cubeGeometry.applyMatrix(candidateInverse);

        return (
          <div>
            <Visualization width={320} height={240} rotation={state.rotation}>
              <XAxis />
              <YAxis />
              <ZAxis />
              <mesh>
                <geometry
                  vertices={cubeGeometry.vertices}
                  faces={cubeGeometry.faces}
                  colors={cubeGeometry.colors}
                  faceVertexUvs={cubeGeometry.faceVertexUvs}
                />
                <meshBasicMaterial color={0xff00ff} opacity={0.8} />
              </mesh>
              <Vector position={iHat} color={0xffff00} />
              <Vector position={jHat} color={0xff00ff} />
              <Vector position={kHat} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      Clean up the matrix by multipying the first
      row by <MathJax.Node inline>1 \over 2</MathJax.Node>, the second row by -1 and
      the third row by <MathJax.Node inline>1 \over 2</MathJax.Node>.
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 0, 0], [0, 1, 0], [0, 0, 1]]} />
      <MathJaxMatrix
        inline
        matrix={[['1 \\over 2', '-1 \\over 2', 0],
                ['-1 \\over 2', '-1 \\over 2', 0],
                ['-1 \\over 4', '3 \\over 4', '1 \\over 2']]}
      />
    </p>
    <Animation
      initial={{
        time: 0,
        rotation: new Euler(0.5, 0.5, 0),
      }}
      update={(state) => ({
        time: state.time + 1,
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
      })}
      render={(state) => {
        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);
        const kHat = new Vector3(0, 0, 1);

        const mat = new Matrix4();
        mat.set(1, -1, 0, 0,
                -1, -1, 0, 0,
                2, 1, 2, 0,
                0, 0, 0, 1);

        const candidateInverse = new Matrix4();
        candidateInverse.set(0.5, -0.5, 0, 0,
                             -0.5, -0.5, 0, 0,
                             -0.25, 0.75, 0.5, 0,
                             0, 0, 0, 1);

        iHat.applyMatrix4(mat);
        iHat.applyMatrix4(candidateInverse);
        jHat.applyMatrix4(mat);
        jHat.applyMatrix4(candidateInverse);
        kHat.applyMatrix4(mat);
        kHat.applyMatrix4(candidateInverse);

        const cubeGeometry = new BoxGeometry(1, 1, 1);
        cubeGeometry.translate(0.5, 0.5, 0.5);
        cubeGeometry.applyMatrix(mat);
        cubeGeometry.applyMatrix(candidateInverse);

        return (
          <div>
            <Visualization width={320} height={240} rotation={state.rotation}>
              <XAxis />
              <YAxis />
              <ZAxis />
              <mesh>
                <geometry
                  vertices={cubeGeometry.vertices}
                  faces={cubeGeometry.faces}
                  colors={cubeGeometry.colors}
                  faceVertexUvs={cubeGeometry.faceVertexUvs}
                />
                <meshBasicMaterial color={0xff00ff} opacity={0.8} />
              </mesh>
              <Vector position={iHat} color={0xffff00} />
              <Vector position={jHat} color={0xff00ff} />
              <Vector position={kHat} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      And with that, we have found the inverse
    </p>
  </Section>
);

export default InversesSection;
