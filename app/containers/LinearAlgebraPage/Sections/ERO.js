/*
 * LinearAlgebraPage
 *
 * This is the first thing users see of our App, at the '/' route
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
import Visualization from 'components/Visualization';

const EROSection = () => (
  <Section title="Elementary Row Operations" anchor="elementary-row-operations">
    <p>
      If we think about a matrix as a system of equations, recall that there
      are certain things that we can do to solve for the variables in that
      system of equations. For instance, if we have a system of equations
      given by:
    </p>
    <MathJax.Node>x + y = 2</MathJax.Node>
    <MathJax.Node>x - z = 1</MathJax.Node>
    <MathJax.Node>y - z = 0</MathJax.Node>
    <p>
      We could try to solve those equations either by using substition or
      by adding and subtracting scalar multiples of entire equations
      to and from each other. Or we could express the entire system as a
      matrix-vector product and try to solve for the vector in the middle:
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 1, 0], [1, 0, -1], [0, 1, -1]]} />
      <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
      <MathJax.Node inline>=</MathJax.Node>
      <MathJaxMatrix inline matrix={[[2], [1], [0]]} />
    </p>
    <p>
      If you visualize the three planes in the system, you will notice that they
      intersect at a point.
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
          <Plane extents={[-2, 2]} a={1} b={1} c={0} d={2} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={1} b={0} c={-1} d={1} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={1} c={-1} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      Now, if we recall that any vector multiplied by the three standard basis
      vectors in matrix form, <MathJax.Node inline>\hat i, \hat j, \hat k</MathJax.Node>{' '}
      is just itself, it stands to reason that if add and subtract scalar multiples
      of each component to recover our basis vectors that we will eventually arrive
      at a point where we have the identity matrix multiplied by some vector
      which gives us a point, implying that the point is equal to the resultant
      vector.
    </p>
    <p>
      At every point where we apply these operations, observe what happens to
      the three planes and to the vectors defined by the columns of the matrix.
    </p>
    <p>
      First, subtract the first row from the second:
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 1, 0], [0, -1, -1], [0, 1, -1]]} />
      <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
      <MathJax.Node inline>=</MathJax.Node>
      <MathJaxMatrix inline matrix={[[2], [-1], [0]]} />
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
          <Plane extents={[-2, 2]} a={1} b={1} c={0} d={2} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={-1} c={-1} d={-1} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={1} c={-1} d={0} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>Then, add the second row to the third</p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 1, 0], [0, -1, -1], [0, 0, -2]]} />
      <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
      <MathJax.Node inline>=</MathJax.Node>
      <MathJaxMatrix inline matrix={[[2], [-1], [-1]]} />
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
          <Plane extents={[-2, 2]} a={1} b={1} c={0} d={2} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={-1} c={-1} d={-1} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={0} c={-2} d={-1} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>Now, subtract half of the third row from the second</p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 1, 0], [0, -1, 0], [0, 0, -2]]} />
      <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
      <MathJax.Node inline>=</MathJax.Node>
      <MathJaxMatrix inline matrix={[[2], ['-1 \\over 2'], [-1]]} />
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
          <Plane extents={[-2, 2]} a={1} b={1} c={0} d={2} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={-1} c={0} d={-0.5} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={0} c={-2} d={-1} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>Add the second row to the first</p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 0, 0], [0, -1, 0], [0, 0, -2]]} />
      <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
      <MathJax.Node inline>=</MathJax.Node>
      <MathJaxMatrix inline matrix={[['3 \\over 2'], ['-1 \\over 2'], [-1]]} />
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
          <Plane extents={[-2, 2]} a={1} b={0} c={0} d={1.5} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={-1} c={0} d={-0.5} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={0} c={-2} d={-1} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>Clean everything up by dividing the second row by -1 and the third row by -2</p>
    <p>
      <MathJaxMatrix inline matrix={[[1, 0, 0], [0, 1, 0], [0, 0, 1]]} />
      <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
      <MathJax.Node inline>=</MathJax.Node>
      <MathJaxMatrix inline matrix={[['3 \\over 2'], ['1 \\over 2'], ['1 \\over 2']]} />
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
          <Plane extents={[-2, 2]} a={1} b={0} c={0} d={1.5} color={0xffff00} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={1} c={0} d={0.5} color={0xff00ff} transparent opacity={0.8} />
          <Plane extents={[-2, 2]} a={0} b={0} c={1} d={0.5} color={0x00ffff} transparent opacity={0.8} />
        </Visualization>
      )}
    />
    <p>
      As you will have noticed, the intersection between the planes is the point
      of the solution, but now we can simply just express that as the vector{' '}
      <MathJaxMatrix inline matrix={[['3 \\over 2'], ['1 \\over 2'], ['1 \\over 2']]} />
    </p>
    <Animation
      initial={{
        rotation: new Euler(0.5, 0.5, 0),
        time: 0,
      }}
      update={(state) => ({
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.004,
                            state.rotation.z),
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const ilerp = 1 - lerp;

        return (
          <Visualization width={320} height={240} rotation={state.rotation}>
            <XAxis />
            <YAxis />
            <ZAxis />
            <Vector position={new Vector3(ilerp * 1.5, ilerp * 0.5, ilerp * 0.5)} color={0xffff00} />
            <Plane extents={[-2, 2]} a={1} b={0} c={0} d={1.5} color={0xffff00} transparent opacity={lerp} />
            <Plane extents={[-2, 2]} a={0} b={1} c={0} d={0.5} color={0xff00ff} transparent opacity={lerp} />
            <Plane extents={[-2, 2]} a={0} b={0} c={1} d={0.5} color={0x00ffff} transparent opacity={lerp} />
          </Visualization>
        );
      }}
    />
    <p>
      As we will see, <Strong>Elementary Row Operations</Strong> can help us solve
      all sorts of problems where we need to determine a vector that satisfies
      a given solution.
    </p>
  </Section>
);

export default EROSection;
