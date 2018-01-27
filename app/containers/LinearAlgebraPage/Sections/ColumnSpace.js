/*
 * ColumnSpace
 *
 * A section describing column space
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Euler, Matrix3, Vector3 } from 'three';

import { XAxis, YAxis, ZAxis } from 'components/Axis';
import Animation from 'components/Animation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Plane from 'components/Plane';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';
import Visualization from 'components/Visualization';

const ColumnSpaceSection = () => (
  <Section title="Column Space" anchor="column-space">
    <p>
      Like <Strong>Row Space</Strong>, we can also read off the columns of our
      matrix and try and work out the span of that set of vectors. That span is
      called the <Strong>Column Space</Strong>, since it is the space accessible
      by the span of all the columns of the matrix.
    </p>
    <p>
      The column space of a matrix tells us about the output space of the transformation -
      since each column tells us where the standard basis vectors in a similar identity matrix
      would land if they were transformed by that matrix.
    </p>
    <MathJaxMatrix matrix={[[3, 1], [1, 1]]} />
    <p>
      For instance in this matrix, the standard basis vector <MathJaxMatrix inline matrix={[[1], [0]]} />, or{' '}
      <MathJax.Node inline>\hat i</MathJax.Node> lands on <MathJaxMatrix inline matrix={[[3], [1]]} />. Similarly,
      the standard basis vector <MathJax.Node inline>\hat j</MathJax.Node> lands on{' '}
      <MathJaxMatrix inline matrix={[[1], [1]]} />.
    </p>
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const mat = new Matrix3();
        const iHat = new Vector3(1, 0, 0);
        const jHat = new Vector3(0, 1, 0);

        mat.set(1 + (2 * lerp), (1 * lerp), 0,
                lerp, 1, 0,
                0, 0, 0);

        const transformedIHat = iHat.clone().applyMatrix3(mat);
        const transformedJHat = jHat.clone().applyMatrix3(mat);

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <Vector position={transformedIHat} color={0xffff00} />
              <Vector position={transformedJHat} color={0xffff00} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      Now, just like the row space, we might want to work out a basis for the column
      space. We can either do that by looking at the columns themselves to see
      if there are obvious dependencies, or we can try and recover a set of vectors
      each having their own leading entry.
    </p>
    <p>
      However, we <Strong>cannot</Strong> do this with row operations. We are examining
      the set of column vectors for linear dependence, so applying row operations will
      effectively change a single component of each column, as opposed to all components
      of that column. Such an operation will fundamentally change the nature of the resultant
      space.
    </p>
    <p>
      As a trick, we can use row-reduction if we find a way to express the columns of the
      matrix as rows, temporarily. We can do that with the transpose, <MathJax.Node inline>A^T</MathJax.Node>
    </p>
    <p>
      In general, the transpose rearranges the matrix such that the first row becomes
      the first column, the second row becomes the second column and so on. As such, transpose
      of an <MathJax.Node inline>m \times n</MathJax.Node> matrix will be an{' '}
      <MathJax.Node inline>n \times m</MathJax.Node> matrix.
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 2, 3], [1, 1, 3], [2, 1, 6]]} />
      <MathJax.Node inline>\rightarrow</MathJax.Node>
      <MathJaxMatrix inline matrix={[[1, 1, 2], [2, 1, 1], [3, 3, 6]]} />
    </p>
    <Animation
      initial={{
        rotation: new Euler(0.5, 0.5, 0),
      }}
      update={(state) => ({
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
      })}
      render={(state) => (
        <Visualization width={320} height={240} rotation={state.rotation}>
          <XAxis />
          <YAxis />
          <ZAxis />
          <Plane extents={[-1, 1]} a={1} b={1} c={2} d={0} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={1} b={1} c={3} d={0} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={2} b={1} c={6} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      Now we can row-reduce as usual:
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 1, 2], [2, 1, 1], [3, 3, 6]]} />
      {'~'}
      <MathJaxMatrix inline matrix={[[-1, 0, 1], [0, 1, 3], [0, 0, 0]]} />
    </p>
    <Animation
      initial={{
        rotation: new Euler(0.5, 0.5, 0),
      }}
      update={(state) => ({
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
      })}
      render={(state) => (
        <Visualization width={320} height={240} rotation={state.rotation}>
          <XAxis />
          <YAxis />
          <ZAxis />
          <Plane extents={[-1, 1]} a={-1} b={0} c={1} d={0} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={0} b={1} c={3} d={0} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={0} b={0} c={0} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      Transposing our row-reduced matrix, we get a new matrix with our column space.
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[-1, 0, 1], [0, 1, 3], [0, 0, 0]]} />
      <MathJax.Node inline>\rightarrow</MathJax.Node>
      <MathJaxMatrix inline matrix={[[-1, 0, 0], [0, 1, 0], [1, 3, 0]]} />
    </p>
    <p>
      So our column space here comprises of the vectors <MathJaxMatrix inline matrix={[[-1], [0], [1]]} />{' '}
      and <MathJaxMatrix inline matrix={[[0], [1], [3]]} />{' '}
    </p>
    <Animation
      initial={{
        rotation: new Euler(0.5, 0.5, 0),
      }}
      update={(state) => ({
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
      })}
      render={(state) => (
        <Visualization width={320} height={240} rotation={state.rotation}>
          <XAxis />
          <YAxis />
          <ZAxis />
          <Vector position={new Vector3(-1, 0, 0)} color={0xff00ff} />
          <Vector position={new Vector3(0, 1, 3)} color={0xffff00} />
        </Visualization>
      )}
    />
    <p>
      Which, you will notice, forms a plane, indicating that our output space is two dimensional.
    </p>
    <Animation
      initial={{
        rotation: new Euler(0.5, 0.5, 0),
      }}
      update={(state) => ({
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
      })}
      render={(state) => (
        <Visualization width={320} height={240} rotation={state.rotation}>
          <XAxis />
          <YAxis />
          <ZAxis />
          <Vector position={new Vector3(-1, 0, 0)} color={0xffff00} />
          <Vector position={new Vector3(0, 1, 3)} color={0xff00ff} />
          <Plane extents={[-1, 1]} a={0} b={-3} c={1} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
  </Section>
);

export default ColumnSpaceSection;
