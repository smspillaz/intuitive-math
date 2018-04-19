/*
 * Vectors
 *
 * A section on vectors.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import { XAxis, YAxis } from 'components/Axis';
import AxisVisualization1D from 'components/AxisVisualization1D';
import AxisVisualization2D from 'components/AxisVisualization2D';
import AxisVisualization3D from 'components/AxisVisualization3D';
import CenteredParagraph from 'components/CenteredParagraph';
import MathJaxMatrix from 'components/MathJaxMatrix';
import InterpolatedAnimation, { cosineInterpolator, sineInterpolator } from 'components/InterpolatedAnimation';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Tweakable from 'components/Tweakable';
import Vector from 'components/Vector';
import Visualization, { TweakablesBox } from 'components/Visualization';

const VectorsSection = () => (
  <Section title="Vectors" anchor="vectors">
    <p>The fundamental building block of linear systems is the humble <Strong>Vector</Strong></p>
    <AxisVisualization3D
      title="A single vector in 3D space"
      render={() =>
        <Vector position={new Vector3(2, 2, 2)} color={0xff8800} />
      }
    />
    <p>
      There is a few different ways to think about vectors. It is not quite right
      to call them a point, because vectors have a direction that is actually
      computable. But then they are also not just a pure direction with no associated
      point.
    </p>
    <p>
      Personally, I find it best to think of them as a recipe to get to a point
      based on our understanding of dimensions above. When you plot the vector,
      it shows you the fastest way of getting to that point in space, which is
      incidentally, a straight line.
    </p>
    <p>
      For instance, the vector above is at the position <MathJax.Node inline>{'(2, 2, 2)'}</MathJax.Node>{' '}.
      Another way to think about it might be that it is <MathJax.Node inline>{'2'}</MathJax.Node>{' '}
      steps in the <MathJax.Node inline>{'x'}</MathJax.Node>{' '} direction,{' '}
      <MathJax.Node inline>{'2'}</MathJax.Node>{' '}
      steps in the <MathJax.Node inline>{'y'}</MathJax.Node>{' '} and{' '}
      <MathJax.Node inline>{'2'}</MathJax.Node>{' '}
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
    <InterpolatedAnimation
      values={{
        xPosition: { begin: -1, end: 1 },
      }}
      render={({ xPosition }) => (
        <div>
          <AxisVisualization1D
            title="A vector in 1D space"
            render={() => (
              <Vector position={new Vector3(xPosition.value, 0, 0)} color={0xff8800} />
            )}
            renderExtras={({ width }) => (
              <TweakablesBox width={width}>
                <div>
                  <Tweakable {...xPosition}>
                    <MathJax.Node inline>{'x ='}</MathJax.Node>{' '}
                  </Tweakable>
                </div>
              </TweakablesBox>
            )}
          />
        </div>
      )}
    />
    <p>
      Now let us have a look at a vector which ranges around a circle on the
      <MathJax.Node inline>{'x'}</MathJax.Node> and <MathJax.Node inline>{'y'}</MathJax.Node> axis.
      Notice that we are still doing the same thing along the x axis, but we are
      sort of translating the whole line up and down whilst the vector
      move along the same line.
    </p>
    <InterpolatedAnimation
      values={{
        xPosition: { begin: -1, end: 1, interpolator: sineInterpolator },
        yPosition: { begin: -1, end: 1, interpolator: cosineInterpolator },
      }}
      render={({ xPosition, yPosition }) => (
        <div>
          <AxisVisualization2D
            title="A vector ranging around a circle"
            render={() => (
              <group>
                <Vector position={new Vector3(xPosition.value, yPosition.value, 0)} color={0xff8800} />
                <Vector
                  position={new Vector3(xPosition.value, yPosition.value, 0)}
                  base={new Vector3(0, yPosition.value, 0)}
                  color={0xff8800}
                />
                <Vector
                  position={new Vector3(xPosition.value, yPosition.value, 0)}
                  base={new Vector3(xPosition.value, 0, 0)}
                  color={0xff8800}
                />
              </group>
            )}
            renderExtras={({ width }) => (
              <TweakablesBox width={width}>
                <div>
                  <Tweakable {...xPosition}>
                    <MathJax.Node inline>{'x ='}</MathJax.Node>{' '}
                  </Tweakable>
                </div>
                <div>
                  <Tweakable {...yPosition}>
                    <MathJax.Node inline>{'y ='}</MathJax.Node>{' '}
                  </Tweakable>
                </div>
              </TweakablesBox>
            )}
          />
        </div>
      )}
    />
    <p>
      Extending this to the third dimension is fairly straightforward. If we can
      imagine our 2D animation running on a flat surface, then in 3D all we are
      really doing is moving the plane which is that flat surface, around.
    </p>
    <InterpolatedAnimation
      values={{
        xPosition: { begin: -1, end: 1, interpolator: sineInterpolator },
        yPosition: { begin: -1, end: 1, interpolator: cosineInterpolator },
        zPosition: { begin: -1, end: 1, interpolator: sineInterpolator },
      }}
      render={({ xPosition, yPosition, zPosition }) => (
        <div>
          <AxisVisualization3D
            title="A vector ranging around a circle in 3D space"
            render={() => (
              <group>
                <Vector
                  position={new Vector3(xPosition.value, yPosition.value, zPosition.value)}
                  color={0xff8800}
                />
                <Vector
                  position={new Vector3(xPosition.value, yPosition.value, zPosition.value)}
                  base={new Vector3(0, yPosition.value, zPosition.value)}
                  color={0xff8800}
                />
                <Vector
                  position={new Vector3(xPosition.value, yPosition.value, zPosition.value)}
                  base={new Vector3(xPosition.value, 0, zPosition.value)}
                  color={0xff8800}
                />
                <Vector
                  position={new Vector3(xPosition.value, yPosition.value, zPosition.value)}
                  base={new Vector3(0, yPosition.value, zPosition.value)}
                  color={0xff8800}
                />
              </group>
            )}
            renderExtras={({ width }) => (
              <TweakablesBox width={width}>
                <div>
                  <Tweakable {...xPosition}>
                    <MathJax.Node inline>{'x ='}</MathJax.Node>{' '}
                  </Tweakable>
                </div>
                <div>
                  <Tweakable {...yPosition}>
                    <MathJax.Node inline>{'y ='}</MathJax.Node>{' '}
                  </Tweakable>
                </div>
                <div>
                  <Tweakable {...zPosition}>
                    <MathJax.Node inline>{'z ='}</MathJax.Node>{' '}
                  </Tweakable>
                </div>
              </TweakablesBox>
            )}
          />
        </div>
      )}
    />
    <p>
      Addition and subtraction on vectors is defined in the usual sense. Analytically
      we just add each component and create a new vector.
    </p>
    <CenteredParagraph>
      <MathJaxMatrix matrix={[[1], [2], [3]]} inline />{'+ '}
      <MathJaxMatrix matrix={[[1], [2], [3]]} inline />{'= '}
      <MathJaxMatrix matrix={[[2], [4], [6]]} inline />
    </CenteredParagraph>
    <p>
      Geometrically you can think of this as adding head to tail, or following
      the steps indicated by the first vector, then following the steps
      indicated by the second
    </p>
    <InterpolatedAnimation
      values={{
        xAdd: { begin: 0, end: 2 },
        yAdd: { begin: 0, end: 1 },
      }}
      render={({ xAdd, yAdd }) => {
        const a = new Vector3(1, 2, 0);
        const b = new Vector3(xAdd.value, yAdd.value, 0);
        const c = new Vector3();

        c.addVectors(a, b);

        return (
          <div>
            <Visualization
              title="Adding two vectors"
              renderExtras={({ width }) => (
                <TweakablesBox width={width}>
                  <div>
                    <Tweakable {...xAdd}>
                      <MathJax.Node inline>{'x ='}</MathJax.Node>{' '}<span>{a.x}{' + '}</span>
                    </Tweakable>{' = '}{c.x.toFixed(2)}
                  </div>
                  <div>
                    <Tweakable {...yAdd}>
                      <MathJax.Node inline>{'y ='}</MathJax.Node>{' '}<span>{a.y}{' + '}</span>
                    </Tweakable>{' = '}{c.y.toFixed(2)}
                  </div>
                </TweakablesBox>
              )}
            >
              <XAxis />
              <YAxis />
              <Vector position={a} color={0xffff00} />
              <Vector position={c} color={0xff00ff} base={a} />
              <Vector position={c} color={0x00ffff} />
            </Visualization>
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
    <InterpolatedAnimation
      values={{
        xMul: { begin: 0, end: 2 },
        yMul: { begin: 0, end: 1 },
      }}
      render={({ xMul, yMul }) => {
        const a = new Vector3(1, 2, 0);
        const b = new Vector3(xMul.value, yMul.value, 0);
        const c = new Vector3(a.x * b.x, a.y * b.y, 0);

        return (
          <div>
            <Visualization
              title="Component-wise multiplication, scaling information is lost"
              renderExtras={({ width }) => (
                <TweakablesBox width={width}>
                  <div>
                    <Tweakable {...xMul}>
                      <MathJax.Node inline>{'x ='}</MathJax.Node>{' '}<span>{a.x}<MathJax.Node inline>\times</MathJax.Node></span>
                    </Tweakable>{' = '}{c.x.toFixed(2)}
                  </div>
                  <div>
                    <Tweakable {...yMul}>
                      <MathJax.Node inline>{'y ='}</MathJax.Node>{' '}<span>{a.y}<MathJax.Node inline>\times</MathJax.Node></span>
                    </Tweakable>{' = '}{c.y.toFixed(2)}
                  </div>
                </TweakablesBox>
              )}
            >
              <XAxis />
              <YAxis />
              <Vector position={a} color={0xffff00} />
              <Vector position={b} color={0xff00ff} />
              <Vector position={c} color={0x00ffff} />
            </Visualization>
          </div>
        );
      }}
    />
  </Section>
);

export default VectorsSection;
