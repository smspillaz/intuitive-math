/*
 * RowSpace
 *
 * A section on row space
 */

import React from 'react';

import MathJax from 'react-mathjax';

import { Vector3 } from 'three';

import AxisVisualization2D from 'components/AxisVisualization2D';
import AxisVisualization3D from 'components/AxisVisualization3D';
import EROVisualization from 'components/EROVisualization';
import MathJaxMatrix from 'components/MathJaxMatrix';
import Plane from 'components/Plane';
import Section from 'components/Section';
import Strong from 'components/Strong';
import Vector from 'components/Vector';

const RowSpaceSection = () => (
  <Section title="Row Space" anchor="row-space">
    <p>
      Given what we know about spans and matrices, the row space is just the{' '}
      <Strong>span</Strong> of each of the rows, if we are to consider each row
      to be a vector in a set.
    </p>
    <p>
      Recall that the <Strong>span</Strong> is just the set of all linear
      combinations of a set of vectors, which describes the space that is
      reachable by those linear combinations.
    </p>
    <p>So if you have a matrix defined like this:</p>
    <p>
      <MathJaxMatrix
        matrix={[
          [1, 1],
          [2, 2],
        ]}
      />
    </p>
    <AxisVisualization2D
      title="Vectors of a simple 2D system with linearly dependent rows"
      render={() => (
        <group>
          <Vector color={0xffff00} position={new Vector3(1, 1, 0)} />
          <Vector color={0xff00ff} position={new Vector3(1, 0, 1)} />
        </group>
      )}
    />
    <p>
      Then because the rows are not linearly independent, the row space is just
      going to be the line defined by <MathJax.Node>y = -x</MathJax.Node>
    </p>
    <p>
      However, if you have a matrix defined with two linearly independent
      vectors, then the row space is going to be all 2D space.
    </p>
    <p>
      <MathJaxMatrix
        matrix={[
          [1, 1],
          [1, -1],
        ]}
      />
    </p>
    <AxisVisualization2D
      title="Vectors of a simple 2D system with linearly independent rows"
      render={() => (
        <group>
          <Vector color={0xffff00} position={new Vector3(1, 1, 0)} />
          <Vector color={0xff00ff} position={new Vector3(1, -1, 1)} />
        </group>
      )}
    />
    <p>
      One thing which you might be interested in is finding the basis for a row
      space. Recall that since all the vectors in a basis must be linearly
      independent, the number of vectors in the basis is going to tell you, at
      most, how many dimensions the space which has the transformation applied
      to it, is going to have.
    </p>
    <p>
      Thankfully, you do not have to do too much work to compute the dimension
      of the row space. If you can immediately tell that the rows are all
      lineraly independent from each other, then you know that the row-space is
      n-dimensional, where n is the number of rows in the matrix. Visually, this
      would mean that if you visualized all the rows as planes with a solution
      of <MathJaxMatrix matrix={[[0], [0], [0]]} inline />, then there would be
      a single point where they all intersect.
    </p>
    <EROVisualization
      first={[1, 1, 0, 0]}
      second={[1, 0, -1, 0]}
      third={[0, 1, -1, 0]}
      title="3D system with linearly independent planes"
    />
    <p>
      If you want to more rigorously prove what the dimension of the row space
      is, you can use <Strong>Elementary Row Operations</Strong> as explained
      above. Recall that since we are only interested in finding the set of all
      possible vectors spanned by the rows and that either our row space
      consisted of linearly independent vectors or linearly dependent vectors
      and all <Strong>Elementary Row Operations</Strong> actually do is recover
      the standard basis vectors through linear combinations, it follows that
      performing such operations are safe, in that they will not change the
      dimension, which is what we are looking for.
    </p>
    <p>
      With that mouthful out of the way, recall that the matrix above
      row-reduced to:
    </p>
    <EROVisualization
      first={[1, 0, 0]}
      second={[0, 1, 0]}
      third={[0, 0, 1]}
      title="Row-reduced 3D system with linearly independent planes"
    />
    <p>
      So, given that we have three vectors that are linearly independent, our
      transformation has at most three dimensions.
    </p>
    <p>
      The row space might not always have as many dimensions as the number of
      rows in the matrix. For instance, consider the matrix:
    </p>
    <EROVisualization
      first={[1, 1, 0]}
      second={[2, 2, 0]}
      third={[0, 0, 1]}
      title="3D system with linearly dependent planes"
    />
    <p>
      With this matrix, we can immediately tell that the second row has a linear
      dependence on the first (it is just a scalar multiple of it). Indeed, it
      row-reduces to:
    </p>
    <EROVisualization
      first={[1, 1, 0]}
      second={[0, 0, 0]}
      third={[0, 0, 1]}
      title="Row-reduced 3D system with linearly dependent planes"
    />
    <p>
      So in reality, the dimension of the row-space of this matrix is is just 2.
      It makes more sense if you visualize the basis vectors
    </p>
    <AxisVisualization3D
      render={() => (
        <group>
          <Vector color={0xffff00} position={new Vector3(1, 1, 0)} />
          <Vector color={0xff00ff} position={new Vector3(2, 2, 0)} />
          <Vector color={0x00ffff} position={new Vector3(0, 1, 1)} />
        </group>
      )}
    />
    <p>
      The only part of space reachable by linear combinations of all three of
      those vectors is a plane.
    </p>
    <p>If we had a matrix with three linearly dependent rows:</p>
    <p>
      <MathJaxMatrix
        matrix={[
          [1, 1, 0],
          [2, 2, 0],
          [3, 3, 0],
        ]}
      />
    </p>
    <AxisVisualization3D
      title="3D system with overlapping lines"
      render={() => (
        <group>
          <Vector color={0xffff00} position={new Vector3(1, 1, 0)} />
          <Vector color={0xff00ff} position={new Vector3(2, 2, 0)} />
          <Vector color={0x00ffff} position={new Vector3(3, 3, 0)} />
        </group>
      )}
    />
    <p>
      Then the only thing reachable is a line, specifically the{' '}
      <MathJax.Node inline formula="x = -y" /> line.
    </p>
    <p>
      Sometimes you can get a linear dependence between the rows that is not as
      obvious as just one row being a scalar multiple of the other. For instance
      the following system has a dimension of 2. Look carefully at the diagram
      and you will see that there is not really a single point of intersection
      for all three planes. Instead, they all seem to intersect with each other
      along a line.
    </p>
    <EROVisualization
      first={[1, 2, 3]}
      second={[2, 2, 2]}
      third={[-1, 0, 1]}
      title="Elementary Row Operations setup for planes intersecting along a line"
    />
    <p>
      See what happens when we row-reduce it. First, add the first row to the
      third:
    </p>
    <EROVisualization
      first={[1, 2, 3]}
      second={[2, 2, 2]}
      third={[0, 2, 4]}
      title="Elementary Row Operations for linearly dependent planes (1)"
    />
    <p>Now subtract half the third row from the second:</p>
    <EROVisualization
      first={[1, 2, 3]}
      second={[2, 1, 0]}
      third={[0, 2, 4]}
      title="Elementary Row Operations for linearly dependent planes (2)"
    />
    <p>
      Then, multiply the first row by 4 and subtract 3 times the last row from
      it
    </p>
    <EROVisualization
      first={[4, 2, 0]}
      second={[2, 1, 0]}
      third={[0, 2, 4]}
      title="Elementary Row Operations for linearly dependent planes (3)"
    />
    <p>
      Finally, notice that the first row is twice the second. Subtract twice the
      second row from it.
    </p>
    <EROVisualization
      first={[0, 0, 0]}
      second={[2, 1, 0]}
      third={[0, 2, 4]}
      title="Elementary Row Operations for linearly dependent planes (4)"
    />
    <p>
      The final two rows are linearly independent of each other. We can
      represent them as basis vectors to show the basis of the row space.
    </p>
    <AxisVisualization3D
      title="Basis vectors for row space"
      render={() => (
        <group>
          <Vector color={0xff00ff} position={new Vector3(2, 1, 0)} />
          <Vector color={0x00ffff} position={new Vector3(0, 1, 2)} />
        </group>
      )}
    />
    <p>
      Which, you will notice, forms a plane, indicating that our mapping space
      is two dimensional.
    </p>
    <AxisVisualization3D
      title="Basis vectors for row space, with corresponding plane"
      render={() => (
        <group>
          <Vector color={0xff00ff} position={new Vector3(2, 1, 0)} />
          <Vector color={0x00ffff} position={new Vector3(0, 1, 2)} />
          <Plane
            extents={[-1, 1]}
            a={2}
            b={-4}
            c={2}
            d={0}
            color={0x00ffff}
            transparent
            opacity={0.8}
          />
        </group>
      )}
    />
  </Section>
);

export default RowSpaceSection;
