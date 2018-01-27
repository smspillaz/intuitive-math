/*
 * Vectors
 *
 * A section on vectors.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Euler, Vector3 } from 'three';

import { XAxis, YAxis, ZAxis } from 'components/Axis';
import Animation from 'components/Animation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';
import Visualization from 'components/Visualization';

import { truncate } from 'utils/math';

const VectorsSection = () => (
  <Section title="Vectors" anchor="vectors">
    <p>The fundamental building block of linear systems is the humble <Strong>Vector</Strong></p>
    <Animation
      initial={{ rotation: new Euler(0.5, 0.5, 0) }}
      update={(state) => ({
        rotation: new Euler(state.rotation.x,
                            state.rotation.y + 0.001,
                            state.rotation.z),
      })}
      render={(state) => (
        <Visualization width={320} height={240} rotation={state.rotation}>
          <XAxis />
          <YAxis />
          <ZAxis />
          <Vector position={new Vector3(2, 2, 2)} color={0xff8800} />
        </Visualization>
      )}
    />
    <p>
      There is a few different ways to think about vectors. It is not quite right
      to call them a point, because vectors have a direction that is actually
      computable. But then they are not just a pure direction with no associated
      point.
    </p>
    <p>
      Personally, I find it best to think of them as a recipie to get to a point
      based on our understanding of dimensions above. When you plot the vector,
      it shows you the fastest way of getting to that point in space.
    </p>
    <p>
      For instance, the vector above is at the position <MathJax.Node inline>{'(5, 5, 5)'}</MathJax.Node>{' '}.
      Another way to think about it might be that it is <MathJax.Node inline>{'5'}</MathJax.Node>{' '}
      steps in the <MathJax.Node inline>{'x'}</MathJax.Node>{' '} direction,{' '}
      <MathJax.Node inline>{'5'}</MathJax.Node>{' '}
      steps in the <MathJax.Node inline>{'y'}</MathJax.Node>{' '} and{' '}
      <MathJax.Node inline>{'5'}</MathJax.Node>{' '}
      steps in the <MathJax.Node inline>{'z'}</MathJax.Node>{' '} direction.
    </p>
    <p>
      As a slight notational detour, we represent vectors using a kind of shorthand
      that takes away the <MathJax.Node inline>{'x'}</MathJax.Node>,{' '}
      <MathJax.Node inline>{'y'}</MathJax.Node>{' '}, <MathJax.Node inline>{'z'}</MathJax.Node>{' '}
      etc and just replaces them with a series of numbers in vertical square
      brackets, each slot representing a different dimension:
    </p>
    <MathJaxMatrix matrix={[[1], [2], [3]]} />
    <p>
      This makes more sense if you look at the most degenerate case and then
      build up. For instance, take a one-dimensional space, the number line,
      where we only have an <MathJax.Node inline>{'x'}</MathJax.Node> axis.
    </p>
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const xPosition = truncate(Math.sin(state.time * 0.05), 2);
        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <Vector position={new Vector3(2 * xPosition, 0, 0)} color={0xff8800} />
            </Visualization>
            <div>
              <MathJax.Node inline>{'x ='}</MathJax.Node>{' '}<span>{xPosition}</span>
            </div>
          </div>
        );
      }}
    />
    <p>
      Now let us have a look at a vector which ranges around a circle on the
      <MathJax.Node inline>{'x'}</MathJax.Node> and <MathJax.Node inline>{'y'}</MathJax.Node> axis.
      Notice that we are still doing the same thing along the x axis, but we are
      sort of translating the whole line up and down whilst the vector
      move along the same line.
    </p>
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const xPosition = truncate(Math.sin(state.time * 0.05), 2);
        const yPosition = truncate(Math.cos(state.time * 0.05), 2);
        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <Vector position={new Vector3(2 * xPosition, 2 * yPosition, 0)} color={0xff8800} />
              <Vector position={new Vector3(2 * xPosition, 2 * yPosition, 0)} color={0xff8800} base={new Vector3(0, 2 * yPosition, 0)} />
            </Visualization>
            <div>
              <MathJax.Node inline>{'x ='}</MathJax.Node>{' '}<span>{xPosition}</span>
            </div>
            <div>
              <MathJax.Node inline>{'y ='}</MathJax.Node>{' '}<span>{yPosition}</span>
            </div>
          </div>
        );
      }}
    />
    <p>
      Extending this to the third dimension is fairly straightforward. If we can
      imagine our 2D animation running on a flat surface, then in 3D all we are
      really doing is moving the plane which is that flat surface, around.
    </p>
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const xPosition = truncate(Math.sin(state.time * 0.05), 2);
        const yPosition = truncate(Math.cos(state.time * 0.05), 2);
        const zPosition = truncate(Math.sin(state.time * 0.005), 2);
        return (
          <div>
            <Visualization width={320} height={240} rotation={new Euler(0.5, 0.5, 0)}>
              <XAxis />
              <YAxis />
              <ZAxis />
              <Vector position={new Vector3(2 * xPosition, 2 * yPosition, 2 * zPosition)} color={0xff8800} base={new Vector3(2 * xPosition, 0, 2 * zPosition)} />
              <Vector position={new Vector3(2 * xPosition, 2 * yPosition, 2 * zPosition)} color={0xff8800} base={new Vector3(0, 2 * yPosition, 2 * zPosition)} />
              <Vector position={new Vector3(2 * xPosition, 2 * yPosition, 2 * zPosition)} color={0xff8800} />
            </Visualization>
            <div>
              <MathJax.Node inline>{'x ='}</MathJax.Node>{' '}<span>{xPosition}</span>
            </div>
            <div>
              <MathJax.Node inline>{'y ='}</MathJax.Node>{' '}<span>{yPosition}</span>
            </div>
            <div>
              <MathJax.Node inline>{'z ='}</MathJax.Node>{' '}<span>{zPosition}</span>
            </div>
          </div>
        );
      }}
    />
    <p>
      Addition and subtraction on vectors is defined in the usual sense. Analytically
      we just add each component and create a new vector.
    </p>
    <p>
      <MathJaxMatrix matrix={[[1], [2], [3]]} inline />{'+ '}
      <MathJaxMatrix matrix={[[1], [2], [3]]} inline />{'= '}
      <MathJaxMatrix matrix={[[2], [4], [6]]} inline />
    </p>
    <p>
      Geometrically you can think of this as adding head to tail, or following
      the steps indicated by the first vector, then following the steps
      indicated by the second
    </p>
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const a = new Vector3(1, 2, 0);
        const b = new Vector3(2 * lerp, 1 * lerp, 0);
        const c = new Vector3();

        c.addVectors(a, b);

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <Vector position={a} color={0xffff00} />
              <Vector position={c} color={0xff00ff} base={a} />
              <Vector position={c} color={0x00ffff} />
            </Visualization>
            <div>
              <MathJax.Node inline>{'x ='}</MathJax.Node>{' '}<span>{a.x}{' + '}{truncate(b.x, 2)}{' = '}{truncate(c.x, 2)}</span>
            </div>
            <div>
              <MathJax.Node inline>{'y ='}</MathJax.Node>{' '}<span>{a.y}{' + '}{truncate(b.y, 2)}{' = '}{truncate(c.y, 2)}</span>
            </div>
          </div>
        );
      }}
    />
    <p>
      Of course, note that this only works if the two vectors have the same
      number of dimensions.
    </p>
    <p>
      Also note that vector multiplication is not defined in the usual sense -
      you cannot just take the components of each vector and multiply them together.
      If you did that, you would lose directional information, because what you
      are really doing in that case is scaling each component by a different
      number.
    </p>
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;
        const a = new Vector3(1, 2, 0);
        const b = new Vector3(2 * lerp, 1 * lerp, 0);
        const c = new Vector3(a.x * b.x, a.y * b.y, 0);

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <Vector position={a} color={0xffff00} />
              <Vector position={b} color={0xff00ff} />
              <Vector position={c} color={0x00ffff} />
            </Visualization>
            <div>
              <MathJax.Node inline>{'x ='}</MathJax.Node>{' '}<span>{a.x}{' * '}{truncate(b.x, 2)}{' = '}{truncate(c.x, 2)}</span>
            </div>
            <div>
              <MathJax.Node inline>{'y ='}</MathJax.Node>{' '}<span>{a.y}{' * '}{truncate(b.y, 2)}{' = '}{truncate(c.y, 2)}</span>
            </div>
          </div>
        );
      }}
    />
  </Section>
);

export default VectorsSection;
