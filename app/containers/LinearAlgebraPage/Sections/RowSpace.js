/*
 * RowSpace
 *
 * A section on row space
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Euler, Vector3 } from 'three';

import { XAxis, YAxis, ZAxis } from 'components/Axis';
import Animation from 'components/Animation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Plane from 'components/Plane';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';
import Visualization, { BlankableVisualization } from 'components/Visualization';

const RowSpaceSection = () => (
  <Section title="Row Space" anchor="row-space">
    <p>
      Given what we know about spans and matrices, the row space is just the{' '}
      <Strong>span</Strong> of each of the rows, if we are to consider each
      row to be a vector in a set.
    </p>
    <p>
      Recall that the <Strong>span</Strong> is just the set of all linear
      combinations of a set of vectors, which describes the space that is
      reachable by those linear combinations.
    </p>
    <p>
      So if you have a matrix defined like this:
    </p>
    <MathJaxMatrix matrix={[[1, 1], [2, 2]]} />
    <BlankableVisualization width={320} height={240}>
      <XAxis />
      <YAxis />
      <Vector color={0xffff00} position={new Vector3(1, 1, 0)} />
      <Vector color={0xff00ff} position={new Vector3(1, 0, 1)} />
    </BlankableVisualization>
    <p>
      Then because the rows are not linearly independent, the row space is
      just going to be the line defined by <MathJax.Node>y = -x</MathJax.Node>
    </p>
    <p>
      However, if you have a matrix defined with two linearly
      independent vectors, then the row space is going to be all 2D space.
    </p>
    <MathJaxMatrix matrix={[[1, 1], [1, -1]]} />
    <BlankableVisualization width={320} height={240}>
      <XAxis />
      <YAxis />
      <Vector color={0xffff00} position={new Vector3(1, 1, 0)} />
      <Vector color={0xff00ff} position={new Vector3(1, -1, 1)} />
    </BlankableVisualization>
    <p>
      One thing which you might be interested in is finding the basis
      for a row space. Recall that since all the vectors in a basis
      must be linearly independent, the number of vectors in the basis
      is going to tell you, at most, how many dimensions the space which
      has the transformation applied to it, is going to have.
    </p>
    <p>
      Thankfully, you do not have to do too much work to compute the
      dimension of the row space. If you can immediately tell that the
      rows are all lineraly independent from each other, then you know
      that the row-space is n-dimensional, where n is the number of
      rows in the matrix. Visually, this would mean that if you visualized
      all the rows as planes with a solution of <MathJaxMatrix matrix={[[0], [0], [0]]} inline />,
      then there would be a single point where they all intersect.
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 1, 0], [1, 0, -1], [0, 1, -1]]} />
      <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
      <MathJax.Node inline>=</MathJax.Node>
      <MathJaxMatrix inline matrix={[[0], [0], [0]]} />
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
          <Plane extents={[-2, 2]} a={1} b={1} c={0} d={0} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={1} b={0} c={-1} d={0} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={1} c={-1} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      If you want to more rigorously prove what the dimension of the row space is,
      you can use <Strong>Elementary Row Operations</Strong> as explained above. Recall
      that since we are only interested in finding the set of all possible vectors
      spanned by the rows and that either our row space consisted of linearly independent
      vectors or linearly dependent vectors and all <Strong>Elementary Row Operations</Strong>{' '}
      actually do is recover the standard basis vectors through linear combinations, it follows
      that performing such operations are safe, in that they will not change the dimension,
      which is what we are looking for.
    </p>
    <p>
      With that mouthful out of the way, recall that the matrix above
      row-reduced to:
    </p>
    <MathJaxMatrix matrix={[[1, 0, 0], [0, 1, 0], [0, 0, 1]]} />
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
          <Plane extents={[-2, 2]} a={1} b={0} c={0} d={0} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={1} c={0} d={0} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={0} c={1} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      So, given that we have three vectors that are linearly independent, our
      transformation has at most three dimensions.
    </p>
    <p>
      The row space might not always have as many dimensions as the number of
      rows in the matrix. For instance, consider the matrix:
    </p>
    <MathJaxMatrix matrix={[[1, 1, 0], [2, 2, 0], [0, 0, 1]]} />
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
          <Plane extents={[-2, 2]} a={1} b={1} c={0} d={0} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={2} b={2} c={0} d={0} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={0} c={1} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      With this matrix, we can immediately tell that the second row has a
      linear dependence on the first (it is just a scalar multiple of it). Indeed,
      it row-reduces to:
    </p>
    <MathJaxMatrix matrix={[[1, 1, 0], [0, 0, 0], [0, 0, 1]]} />
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
          <Plane extents={[-2, 2]} a={1} b={1} c={0} d={0} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={0} c={0} d={0} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={0} c={1} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      So in reality, the dimension of the row-space of this matrix is is just 2. It makes more sense
      if you visualize the basis vectors
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
          <Vector color={0xffff00} position={new Vector3(1, 1, 0)} />
          <Vector color={0xff00ff} position={new Vector3(2, 2, 0)} />
          <Vector color={0x00ffff} position={new Vector3(0, 1, 1)} />
        </Visualization>
      )}
    />
    <p>
      The only part of space reachable by linear combinations of all three of those
      vectors is a plane.
    </p>
    <p>
      If we had a matrix with three linearly dependent rows:
    </p>
    <MathJaxMatrix matrix={[[1, 1, 0], [2, 2, 0], [3, 3, 0]]} />
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
          <Vector color={0xffff00} position={new Vector3(1, 1, 0)} />
          <Vector color={0xff00ff} position={new Vector3(2, 2, 0)} />
          <Vector color={0x00ffff} position={new Vector3(3, 3, 0)} />
        </Visualization>
      )}
    />
    <p>
      Then the only thing reachable is a line, specifically the <MathJax.Node inline>x = -y</MathJax.Node>{' '}
      line.
    </p>
    <p>
      Sometimes you can get a linear dependence between the rows that is not
      as obvious as just one row being a scalar multiple of the other. For instance
      the following system has a dimension of 2. Look carefully at the diagram and
      you will see that there is not really a single point of intersection for all three
      planes. Instead, they all seem to intersect with each other along a line.
    </p>
    <MathJaxMatrix matrix={[[1, 2, 3], [2, 2, 2], [-1, 0, 1]]} />
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
          <Plane extents={[-1, 1]} a={1} b={2} c={3} d={0} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={2} b={2} c={2} d={0} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={-1} b={0} c={1} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      See what happens when we row-reduce it. First, add the first row
      to the third:
    </p>
    <MathJaxMatrix matrix={[[1, 2, 3], [2, 2, 2], [0, 2, 4]]} />
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
          <Plane extents={[-1, 1]} a={1} b={2} c={3} d={0} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={2} b={2} c={2} d={0} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={0} b={2} c={4} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      Now subtract half the third row from the second:
    </p>
    <MathJaxMatrix matrix={[[1, 2, 3], [2, 1, 0], [0, 2, 4]]} />
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
          <Plane extents={[-1, 1]} a={1} b={2} c={3} d={0} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={2} b={1} c={0} d={0} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={0} b={2} c={4} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      Then, multiply the first row by 4 and subtract 3 times the last row from it
    </p>
    <MathJaxMatrix matrix={[[4, 2, 0], [2, 1, 0], [0, 2, 4]]} />
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
          <Plane extents={[-1, 1]} a={4} b={2} c={0} d={0} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={2} b={1} c={0} d={0} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={0} b={2} c={4} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      Finally, notice that the first row is twice the second. Subtract twice the second row from it.
    </p>
    <MathJaxMatrix matrix={[[0, 0, 0], [2, 1, 0], [0, 2, 4]]} />
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
          <Plane extents={[-1, 1]} a={0} b={0} c={0} d={0} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={2} b={1} c={0} d={0} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-1, 1]} a={0} b={2} c={4} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      The final two rows are linearly independent of each other. We can represent them
      as basis vectors to show the basis of the row space.
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
          <Vector color={0xff00ff} position={new Vector3(2, 1, 0)} />
          <Vector color={0x00ffff} position={new Vector3(0, 1, 2)} />
        </Visualization>
      )}
    />
    <p>
      Which, you will notice, forms a plane, indicating that our mapping space is two dimensional.
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
          <Vector position={new Vector3(2, 1, 0)} color={0xffff00} />
          <Vector position={new Vector3(0, 1, 2)} color={0xff00ff} />
          <Plane extents={[-1, 1]} a={2} b={-4} c={2} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
  </Section>
);

export default RowSpaceSection;
