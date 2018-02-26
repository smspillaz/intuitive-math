/*
 * LinearIndependence
 *
 * A section on linear independence
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import AxisVisualization2D from 'components/AxisVisualization2D';
import AxisVisualization3D from 'components/AxisVisualization3D';
import CenteredParagraph from 'components/CenteredParagraph';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Plane from 'components/Plane';
import Strong from 'components/Strong';
import Section from 'components/Section';
import Vector from 'components/Vector';

import { cross } from 'utils/math';

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
    <MathJaxMatrix matrix={[[1, 2], [2, 4]]} />
    <AxisVisualization2D
      title="Two vectors on the same line"
      render={() => (
        <group>
          <Vector position={new Vector3(1, 2, 0)} color={0xffff00} />
          <Vector position={new Vector3(2, 4, 0)} color={0xff00ff} />
        </group>
      )}
    />
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
    <CenteredParagraph>
      <MathJaxMatrix inline matrix={[[1], [2]]} />
      <MathJaxMatrix inline matrix={[[1], [1]]} />
      <MathJaxMatrix inline matrix={[[4], [5]]} />
    </CenteredParagraph>
    <AxisVisualization2D
      title="Three vectors on the same plane"
      render={() => (
        <group>
          <Vector position={new Vector3(1, 1, 0)} color={0xffff00} />
          <Vector position={new Vector3(1, 2, 0)} color={0xff00ff} />
          <Vector position={new Vector3(4, 5, 0)} color={0x00fff} />
        </group>
      )}
    />
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
    <CenteredParagraph>
      <MathJaxMatrix inline matrix={[[1], [2], [3]]} />
      <MathJaxMatrix inline matrix={[[2], [4], [6]]} />
      <MathJaxMatrix inline matrix={[[-1], [-2], [-3]]} />
    </CenteredParagraph>
    <AxisVisualization3D
      title="Three vectors on the same line"
      render={() => (
        <group>
          <Vector position={new Vector3(1, 2, 3)} color={0xffff00} />
          <Vector position={new Vector3(2, 4, 6)} color={0xff00ff} />
          <Vector position={new Vector3(-1, -2, -3)} color={0xffff} />
        </group>
      )}
    />
    <p>But you might also get a case where they, represent the same plane</p>
    <CenteredParagraph>
      <MathJaxMatrix inline matrix={[[1], [1], [1]]} />
      <MathJaxMatrix inline matrix={[[1], [0], [1]]} />
      <MathJaxMatrix inline matrix={[[2], [1], [2]]} />
    </CenteredParagraph>
    <AxisVisualization3D
      title="Three vectors on the same plane, one is a linear combination of the other two"
      render={() => {
        const first = new Vector3(1, 1, 1);
        const second = new Vector3(1, 0, 1);
        const normal = cross([first.x, first.y, first.z],
                             [second.x, second.y, second.z]);
        return (
          <group>
            <Vector position={first} color={0xffff00} />
            <Vector position={second} color={0xff00ff} />
            <Vector position={new Vector3(2, 1, 2)} color={0x00ffff} />
            <Plane
              extents={[-2, 2]}
              a={normal[0]}
              b={normal[1]}
              c={normal[2]}
              d={0}
              color={0x00ffff}
              transparent
              opacity={0.8}
            />
          </group>
        );
      }}
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
    <CenteredParagraph>
      <MathJaxMatrix inline matrix={[[1], [1], [1]]} />
      <MathJaxMatrix inline matrix={[[1], [0], [1]]} />
    </CenteredParagraph>
    <AxisVisualization3D
      title="Same plane, two vectors"
      render={() => {
        const first = new Vector3(1, 1, 1);
        const second = new Vector3(1, 0, 1);
        const normal = cross([first.x, first.y, first.z],
                             [second.x, second.y, second.z]);
        return (
          <group>
            <Vector position={first} color={0xffff00} />
            <Vector position={second} color={0xff00ff} />
            <Plane
              extents={[-1, 1]}
              a={normal[0]}
              b={normal[1]}
              c={normal[2]}
              d={0}
              color={0x00ffff}
              transparent
              opacity={0.8}
            />
          </group>
        );
      }}
    />
  </Section>
);

export default LinearIndependenceSection;
