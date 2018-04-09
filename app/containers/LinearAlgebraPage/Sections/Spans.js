/*
 * Spans
 *
 * A section on spans.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import AxisVisualization2D from 'components/AxisVisualization2D';
import CenteredParagraph from 'components/CenteredParagraph';
import InterpolatedAnimation from 'components/InterpolatedAnimation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Tweakable from 'components/Tweakable';
import Vector from 'components/Vector';

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
    <AxisVisualization2D
      title="Linearly independent 2D vectors"
      render={() => (
        <group>
          <Vector position={new Vector3(1, 0, 0)} color={0xffff00} />
          <Vector position={new Vector3(0, 1, 0)} color={0xff00ff} />
        </group>
      )}
    />
    <CenteredParagraph>
      <MathJaxMatrix matrix={[[1], [0]]} inline />{' '}
      <MathJaxMatrix matrix={[[0], [1]]} inline />
    </CenteredParagraph>
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
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 0, end: 4 },
        yyInterp: { begin: 0, end: 1 },
        zxInterp: { begin: 0, end: 4 },
        zyInterp: { begin: 0, end: 1 },
      }}
      render={({ xxInterp, yyInterp, zxInterp, zyInterp }) => (
        <AxisVisualization2D
          title="Three linearly dependent 2D vectors"
          render={() => (
            <group>
              <Vector position={new Vector3(xxInterp.value, 0, 0)} color={0xffff00} />
              <Vector position={new Vector3(0, yyInterp.value, 0)} color={0xff00ff} />
              <Vector position={new Vector3(zxInterp.value, zyInterp.value, 0)} color={0x00ffff} />
            </group>
          )}
        />
      )}
    />
    <p>
      Now, what if you had the vectors <MathJaxMatrix inline matrix={[[1], [-1]]} />{' '}
      and <MathJaxMatrix inline matrix={[[-1], [-1]]} />. These two vectors are not
      linearly dependent. Can we reach any point in 2D space using just combinations
      of those two? What about <MathJax.Node inline>(4, 1)</MathJax.Node>?
    </p>
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 1, end: 1.5 },
        xyInterp: { begin: -1, end: -1.5 },
        yxInterp: { begin: -1, end: 2.5 },
        yyInterp: { begin: -1, end: 2.5 },
      }}
      render={({ xxInterp, xyInterp, yxInterp, yyInterp }) => (
        <div>
          <AxisVisualization2D
            title="Reaching another vector using a combination of two"
            render={() => (
              <group>
                <Vector position={new Vector3(xxInterp.value, xyInterp.value, 0)} color={0xffff00} />
                <Vector position={new Vector3(yxInterp.value, yyInterp.value, 0)} color={0xff00ff} />
                <Vector
                  position={new Vector3(xxInterp.value + xyInterp.value,
                                        yxInterp.value + yyInterp.value,
                                        0)}
                  color={0x00ffff}
                />
              </group>
            )}
          />
          <div>
            <div>
              <Tweakable {...xxInterp} /><MathJaxMatrix inline matrix={[[1], [-1]]} />
            </div>
            <div>
              <Tweakable {...yxInterp} /><MathJaxMatrix inline matrix={[[-1], [-1]]} />
            </div>
          </div>
        </div>
      )}
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
    <InterpolatedAnimation
      values={{
        xxInterp: { begin: 0, end: 2 },
        xyInterp: { begin: 0, end: -2 },
        yxInterp: { begin: 0, end: -1 },
        yyInterp: { begin: 0, end: 1 },
      }}
      render={({ xxInterp, xyInterp, yxInterp, yyInterp }) => (
        <div>
          <AxisVisualization2D
            title="Two linearly dependent vectors, and a linearly independent one"
            render={() => (
              <group>
                <Vector position={new Vector3(xxInterp.value, xyInterp.value, 0)} color={0xffff00} />
                <Vector position={new Vector3(yxInterp.value, yyInterp.value, 0)} color={0xff00ff} />
                <Vector position={new Vector3(4, 1, 0)} color={0x00ffff} />
              </group>
            )}
          />
          <div>
            <div>
              <Tweakable {...xxInterp} /><MathJaxMatrix inline matrix={[[1], [-1]]} />
            </div>
            <div>
              <Tweakable {...yxInterp} /><MathJaxMatrix inline matrix={[[-1], [-1]]} />
            </div>
          </div>
        </div>
      )}
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
