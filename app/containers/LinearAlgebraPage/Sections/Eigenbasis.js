/*
 * Eigenbasis
 *
 * A section describing the Eigenbasis of a matrix and the
 * significance of Diagonalization.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { BoxGeometry, Euler, Matrix4, Vector3 } from 'three';

import { XAxis, YAxis, ZAxis } from 'components/Axis';
import Animation from 'components/Animation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';
import Visualization from 'components/Visualization';

const EigenbasisSection = () => (
  <Section title="Eigenbasis and Diagonalization" anchor="eigenbasis">
    <p>
      Given that we know that a transformation can have up to
      <MathJax.Node inline>n</MathJax.Node> Eigenvectors, where
      <MathJax.Node inline>n</MathJax.Node> is the number of rows, what
      happens if we use the Eigenvectors as a <Strong>change of basis</Strong>,
      by multiplying the transformation by the matrix of the Eigenvectors?
    </p>
    <p>
      As it turns out, converting the transformation to an Eigenbasis,
      if possible, is an incredibly useful conversion because of what
      happens to the transformation when it is converted in such a way.
    </p>
    <p>
      Take for example, the matrix <MathJaxMatrix inline matrix={[[1, 0, 0], [0, 2, 1], [0, 0, 1]]} />. This
      matrix scales by a factor of 2 along the y-axis, shears along the
      <MathJax.Node inline>xz</MathJax.Node> axis by a factor of 1.
    </p>
    <Animation
      initial={{
        rotation: new Euler(0.5, 0.5, 0),
        time: 0,
      }}
      update={(state) => ({
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.001,
                            state.rotation.z),
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);
        const kHat = new Vector3(0, 0, 1);

        const mat = new Matrix4();
        mat.set(1, 0, 0, 0,
                0, 1 + lerp, lerp, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);

        const cubeGeometry = new BoxGeometry(1, 1, 1);
        cubeGeometry.translate(0.5, 0.5, 0.5);
        cubeGeometry.applyMatrix(mat);

        iHat.applyMatrix4(mat);
        jHat.applyMatrix4(mat);
        kHat.applyMatrix4(mat);

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
      This transformation has Eigenvalues <MathJax.Node inline>\lambda = 2</MathJax.Node>
      and <MathJax.Node inline>\lambda = 1</MathJax.Node> with algebraic multiplicity
      2.
    </p>
    <p>
      It also has Eigenvectors <MathJaxMatrix inline matrix={[[0], [1], [0]]}/>,{' '}
      for <MathJax.Node inline>\lambda = 2</MathJax.Node>, and{' '}
      <MathJaxMatrix inline matrix={[[0], [-1], [1]]}/>, and <MathJaxMatrix inline matrix={[[1], [0], [0]]} />,
      for <MathJax.Node inline>\lambda = 1</MathJax.Node>{' '}
      visualized below:
    </p>
    <Animation
      initial={{
        rotation: new Euler(0.5, 0.5, 0),
        time: 0,
      }}
      update={(state) => ({
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.001,
                            state.rotation.z),
        time: state.time + 1,
      })}
      render={(state) => {
        const v1 = new Vector3(0, 1, 0);
        const v2 = new Vector3(0, -1, 0);
        const v3 = new Vector3(1, 0, 0);

        return (
          <div>
            <Visualization width={320} height={240} rotation={state.rotation}>
              <XAxis />
              <YAxis />
              <ZAxis />
              <Vector position={v1} color={0xffff00} />
              <Vector position={v2} color={0xff00ff} />
              <Vector position={v3} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      These Eigenvectors can be arranged into a new matrix called an Eigenbasis:
    </p>
    <MathJaxMatrix inline matrix={[[0, 1, 0], [-1, 0, 1], [1, 0, 0]]} />
    <p>
      And the inverse of the Eigenbasis can be found too:
    </p>
    <MathJaxMatrix inline matrix={[[0, 0, 1], [1, 0, 0], [0, 1, 1]]} />
    <p>
      Consider what happens if we change the basis of our matrix by premultiplying
      by the inverse of the Eigenbasis, then postmultiplying by the Eigenbasis
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[0, 0, 1], [1, 0, 0], [0, 1, 1]]} />
      <MathJaxMatrix inline matrix={[[1, 0, 0], [0, 2, 1], [0, 0, 1]]} />
      <MathJaxMatrix inline matrix={[[0, 1, 0], [-1, 0, 1], [1, 0, 0]]} />
      = <MathJaxMatrix inline matrix={[[1, 0, 0], [0, 1, 0], [0, 0, 2]]} />
    </p>
    <Animation
      initial={{
        rotation: new Euler(0.5, 0.5, 0),
        time: 0,
      }}
      update={(state) => ({
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.001,
                            state.rotation.z),
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const v1 = new Vector3(1, 0, 0);
        const v2 = new Vector3(0, 2 - lerp, 1 - lerp);
        const v3 = new Vector3(0, 0, 1 + lerp);

        return (
          <div>
            <Visualization width={320} height={240} rotation={state.rotation}>
              <XAxis />
              <YAxis />
              <ZAxis />
              <Vector position={v1} color={0xffff00} />
              <Vector position={v2} color={0xff00ff} />
              <Vector position={v3} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      Notice anything familiar? The result of changing the basis
      to a matrix to its Eigenbasis is that the matrix is put into
      a Diagonalized form. This is extremely useful, because while
      the matrix is in a diagonalized form, we can represent it
      like this
    </p>
    <MathJax.Node>
      {'\\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix} \\cdot I'}
    </MathJax.Node>
    <p>
      Thus, if we want to apply any matrix multiplication operation
      to the matrix in its diagonalized form, it is the same as applying
      a matrix-vector optimization. Computer Scientists will recognize
      this as a huge performance win, since an <MathJax.Node inline>O(N^2)</MathJax.Node>
      operation just became <MathJax.Node inline>O(N)</MathJax.Node>. Say
      for example we wanted to calcalculate the 16th power of
      the matrix <MathJaxMatrix inline matrix={[[1, 0, 0], [0, 2, 1], [0, 0, 1]]} />. Conventionally,
      this would take <MathJax.Node inline>9^2 \times 16 = 1296</MathJax.Node> operations. If
      we did the same thing on the diagonal, we can exploit the fact that we are
      exponentiating by powers of two and same thing would take just three
      barrel-shift operations, preceded by and followed by a normal matrix multiplication
      to undo the diagonalization.
    </p>
  </Section>
);

export default EigenbasisSection;
