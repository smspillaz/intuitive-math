/*
 * Spans
 *
 * A section on spans.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import { XAxis, YAxis } from 'components/Axis';
import Animation from 'components/Animation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';
import Visualization, { BlankableVisualization } from 'components/Visualization';

import { truncate } from 'utils/math';

const SpansSection = () => (
  <Section title="Spans" anchor="spans">
    <p>
      Now that we have a better idea of what a <Strong>space</Strong> is and
      what <Strong>linear independence</Strong> is, we can expand our definition
      to a <Strong>span</Strong>.
    </p>
    <p>
      A <Strong>span</Strong> just describes the space reachable by{' '}
      <Strong>linear combinations</Strong>{' '} of some given vectors. In fact,
      it is the set of all vectors reachable by linear combinations of vectors
      in the span.
    </p>
    <p>
      What makes this slightly annoying to think about is that that a span
      describes an infinite set and infinite sets are a little hard to reason about.
    </p>
    <p>
      But if we think about it geometrically, it is actually a case that we
      have seen before. Say for instance we have the following vectors
      in 2D space:
    </p>
    <BlankableVisualization width={320} height={240}>
      <XAxis />
      <YAxis />
      <Vector position={new Vector3(1, 0, 0)} color={0xffff00} />
      <Vector position={new Vector3(0, 1, 0)} color={0xff00ff} />
    </BlankableVisualization>
    <p>
      <MathJaxMatrix matrix={[[1], [0]]} inline />{' '}
      <MathJaxMatrix matrix={[[0], [1]]} inline />
    </p>
    <p>
      The span of these two vectors is all of 2D space. The reason for that
      is that you can give me any 2D point and I can tell you two scalar multiples
      of these two vectors that will give you that point.
    </p>
    <p>
      For example, say you wanted the point <MathJax.Node inline>(4, 1)</MathJax.Node>;
      I could say, well, <MathJax.Node inline>(4, 1)</MathJax.Node> is really just{' '}
      <MathJax.Node inline>4 \times (1, 0) + 1 \times (0, 1)</MathJax.Node>
    </p>
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <Vector position={new Vector3(4 * lerp, 0, 0)} color={0xffff00} />
              <Vector position={new Vector3(0, lerp, 0)} color={0xff00ff} />
              <Vector position={new Vector3(4 * lerp, lerp, 0)} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      Now, what if you had the vectors <MathJaxMatrix inline matrix={[[1], [-1]]} />{' '}
      and <MathJaxMatrix inline matrix={[[-1], [-1]]} />. These two vectors are not
      linearly dependent. Can we reach any point in 2D space using just combinations
      of those two? What about <MathJax.Node inline>(4, 1)</MathJax.Node>?
    </p>
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;

        const xFirstInterp = 1 + (lerp * 0.5);
        const yFirstInterp = -1 + (lerp * -0.5);

        const xSecondInterp = -1 + (lerp * 3.5);
        const ySecondInterp = -1 + (lerp * 3.5);

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <Vector position={new Vector3(xFirstInterp, yFirstInterp, 0)} color={0xffff00} />
              <Vector position={new Vector3(xSecondInterp, ySecondInterp, 0)} color={0xff00ff} />
              <Vector
                position={new Vector3(xFirstInterp + xSecondInterp,
                                      yFirstInterp + ySecondInterp,
                                      0)}
                color={0x00ffff}
              />
            </Visualization>
            <p>
              {truncate((lerp * 0.5) + 1, 2).toFixed(2)}{' '}<MathJaxMatrix inline matrix={[[1], [-1]]} />{' '}
              {truncate((lerp * -3.5) + 1, 2).toFixed(2)}{' '}<MathJaxMatrix inline matrix={[[-1], [-1]]} />{' '}
            </p>
          </div>
        );
      }}
    />
    <p>
      The answer, if you look at the diagram is that, yes, you can. I can take
      <MathJax.Node inline>1.5</MathJax.Node><MathJaxMatrix inline matrix={[[1], [-1]]} />{' '}
      and <MathJax.Node inline>-2.5</MathJax.Node><MathJaxMatrix inline matrix={[[-1], [-1]]} />{' '};
      adding both gives me <MathJaxMatrix inline matrix={[[4], [4]]} />
    </p>
    <p>
      What if I have the vectors <MathJaxMatrix inline matrix={[[1], [-1]]} />{' '}
      and <MathJaxMatrix inline matrix={[[-1], [1]]} />?
    </p>
    <Animation
      initial={{ time: 0 }}
      update={(state) => ({
        time: state.time + 1,
      })}
      render={(state) => {
        const lerp = Math.max(Math.sin(state.time * 0.05) + 1, 0) / 2;

        return (
          <div>
            <Visualization width={320} height={240}>
              <XAxis />
              <YAxis />
              <Vector position={new Vector3(2 * lerp, -2 * lerp, 0)} color={0xffff00} />
              <Vector position={new Vector3(lerp * -1, lerp, 0)} color={0xff00ff} />
              <Vector position={new Vector3(4, 1, 0)} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
    <p>
      The answer by the diagram is that you cannot. The two vectors are parallel
      and so it is impossible to combine them in such a way to make{' '}
      <MathJax.Node inline>(4, 1)</MathJax.Node>
    </p>
    <p>
      In fact, because of the fact that we cannot reach that vector (or any
      other vector outside of that line), the we can only say that the span
      of those two vectors is the line defined by{' '}
      <MathJax.Node inline>{'(x, y): -x = y'}.</MathJax.Node>
    </p>
    <p>
      Of course, you can generalize to higher dimensions, for instance, the span
      of three vectors may be all of 3D space, or it might only be a plane
      if there was a linear dependence amongst the vectors.
    </p>
  </Section>
);

export default SpansSection;
