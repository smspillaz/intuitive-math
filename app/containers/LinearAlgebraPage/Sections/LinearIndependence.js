/*
 * LinearIndependence
 *
 * A section on linear independence
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { DoubleSide, Euler, Vector3 } from 'three';

import { XAxis, YAxis, ZAxis } from 'components/Axis';
import Animation from 'components/Animation';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Strong from 'components/Strong';
import Section from 'components/Section';
import Vector from 'components/Vector';
import Visualization, { BlankableVisualization } from 'components/Visualization';

const LinearIndependenceSection = () => (
  <Section title="Linear Independence" anchor="linear-independence">
    <p>
      Much ado gets made about linear independence, probably because it makes up
      quite a few questions where the answer is not immediately obvious. It is
      also a bit of terminology that gets in the way of understanding. Its hard
      to imagine vectors being dependent on each other, surely they can be
      manipulated independently?
    </p>
    <p>
      When we talk about linear independence what we are actually talking about
      is whether a vector in a set of vectors actually gives us the freedom
      to move in another dimension or whether it is trapped in the same dimension
      already described by other vectors.
    </p>
    <p>
      Of course, even that is a little misleading. You could have vectors with
      non-zero numbers in every dimension but they still may be linearly
      dependent. So what we are actually talking about is whether that vector
      in combination with other vectors gives us access to more space. This is
      best illustrated in the two dimensional case with a visual explanation.
    </p>
    <MathJaxMatrix inline matrix={[[1, 2], [2, 4]]} />
    <BlankableVisualization width={320} height={240}>
      <XAxis />
      <YAxis />
      <Vector position={new Vector3(1, 2, 0)} color={0xffff00} />
      <Vector position={new Vector3(2, 4, 0)} color={0xff00ff} />
    </BlankableVisualization>
    <p>
      These two vectors are not linearly independent. The reason why is that
      the first vector describes the line <MathJax.Node inline>{'y = 2x'}</MathJax.Node>{' '}
      and the second vector describes the line <MathJax.Node inline>{'2y = 4x'}</MathJax.Node>.
    </p>
    <p>
      But that is the exact same line! If we were to add any scalar multiple
      of these two vectors, you would still get another vector that describes the
      line <MathJax.Node inline>{'y = 2x'}</MathJax.Node>. So we say that they
      are <Strong>Linearly Dependent</Strong>
    </p>
    <p>
      Linear dependence is kind of obvious in the 2-vectors, 2-dimensions case, because
      it basically only comes up when the set of vectors are just scalar multiples
      of each other.  But what happens if you have 3 vectors in a two dimensional space?
    </p>
    <MathJaxMatrix inline matrix={[[1], [2]]} />
    <MathJaxMatrix inline matrix={[[1], [1]]} />
    <MathJaxMatrix inline matrix={[[4], [5]]} />
    <BlankableVisualization width={320} height={240}>
      <XAxis />
      <YAxis />
      <Vector position={new Vector3(1, 1, 0)} color={0xffff00} />
      <Vector position={new Vector3(1, 2, 0)} color={0xff00ff} />
      <Vector position={new Vector3(4, 5, 0)} color={0x00fff} />
    </BlankableVisualization>
    <p>
      These vectors are still linearly dependent, even though none of them
      line on the same line. The reason is that now instead of lying on the
      same line, they all line on the same <Strong>plane</Strong>, which by
      definition, is the entire 2D co-ordinate space. By scaling the lines
      describes by <MathJax.Node inline>{'y = x'}</MathJax.Node> and
      <MathJax.Node inline>{'2y = x'}</MathJax.Node>, adding them together
      and so on. I can reach any point in 2D space already. I do not need{' '}
      <MathJax.Node inline>{'5y = 4x'}</MathJax.Node> in order to get access
      to any more space.
    </p>
    <p>
      For example, lets make the vector <MathJax.Node inline>{'(4, 5)'}</MathJax.Node>{' '}
      using <Strong>only</Strong> <MathJax.Node inline>{'(1, 1)'}</MathJax.Node>{' '}
      and <MathJax.Node inline>{'(1, 2)'}</MathJax.Node>.
    </p>
    <MathJax.Node inline>{'1 \\times ((1, 2) - (1, 1)) + 4 \\times (1, 1) = 1 \\times (0, 1) + 4 \\times (1, 1) = (4, 5)'}</MathJax.Node>
    <p>
      This is a little more subtle when we move into three dimensions. Just because
      you have three vectors, it doesnt mean that they are all linearly independent.
    </p>
    <p>Obviously, you can get a case where they represent the same line</p>
    <p>
      <MathJaxMatrix inline matrix={[[1], [2], [3]]} />
      <MathJaxMatrix inline matrix={[[2], [4], [6]]} />
      <MathJaxMatrix inline matrix={[[-1], [-2], [-3]]} />
    </p>
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
          <Vector position={new Vector3(1, 2, 3)} color={0xffff00} />
          <Vector position={new Vector3(2, 4, 6)} color={0xff00ff} />
          <Vector position={new Vector3(-1, -2, -3)} color={0xffff} />
        </Visualization>
      )}
    />
    <p>But you might also get a case where they, represent the same plane</p>
    <p>
      <MathJaxMatrix inline matrix={[[1], [1], [1]]} />
      <MathJaxMatrix inline matrix={[[1], [0], [1]]} />
      <MathJaxMatrix inline matrix={[[2], [1], [2]]} />
    </p>
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
          <Vector position={new Vector3(1, 1, 1)} color={0xffff00} />
          <Vector position={new Vector3(1, 0, 1)} color={0xff00ff} />
          <Vector position={new Vector3(2, 1, 2)} color={0x00ffff} />
          <mesh>
            <parametricGeometry
              parametricFunction={(u, v) =>
                new Vector3(u + v,
                            u,
                            u + v)}
              slices={1}
              stacks={1}
            />
            <meshBasicMaterial color={0x009900} side={DoubleSide} />
          </mesh>
        </Visualization>
      )}
    />
    <p>
      It is not immediately obvious, but adding the third vector to the
      other two does not get you outside of the plane that the other
      two are describing. So they are linearly dependent.
    </p>
    <p>
      So we can get rid of the third vector and still be describing the same
      plane.
    </p>
    <p>
      <MathJaxMatrix inline matrix={[[1], [1], [1]]} />
      <MathJaxMatrix inline matrix={[[1], [0], [1]]} />
    </p>
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
          <Vector position={new Vector3(1, 1, 1)} color={0xffff00} />
          <Vector position={new Vector3(1, 0, 1)} color={0xff00ff} />
          <mesh>
            <parametricGeometry
              parametricFunction={(u, v) =>
                new Vector3(u + v,
                            u,
                            u + v)}
              slices={1}
              stacks={1}
            />
            <meshBasicMaterial color={0x009900} side={DoubleSide} />
          </mesh>
        </Visualization>
      )}
    />
  </Section>
);

export default LinearIndependenceSection;
