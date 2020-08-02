/*
 * Homogeneous.js
 *
 * A demonstration of homogenous co-ordinates, frequently
 * used in computer graphics.
 */

import React from 'react';
import MathJax from 'react-mathjax';

import { Matrix4 } from 'three';

import Section from 'components/Section';
import Strong from 'components/Strong';
import MathJaxMatrix from 'components/MathJaxMatrix';
import { Homeogenous3DCoordinateVisualization } from 'components/HomogenousCoordinateVisualization';

const HomogeneousSection = () => (
  <Section title="Homogeneous Co-ordinates" anchor="homogenous">
    <p>
      For now we have been looking at co-ordinate systems in two and three
      dimensions but these co-ordinate systems have an annoying problem when it
      comes to describing certain kinds of transformations. This comes down to
      the fact that the systems of equations represent transformations which are
      fundamentally multiplicative in nature.
    </p>
    <p>
      So how can we represent something like a translation, for example? Well,
      we can add an additional dimension, <MathJax.Node inline formula="w" /> to
      deal with this problem. In this dimension, we follow a few important
      conventions. For any vector that represents a co-ordinate, we specify the{' '}
      <MathJax.Node inline formula="w" /> as 1. Lets see what impact this has,
      when we set the <MathJax.Node inline formula="w" /> co-ordinate for all
      the other dimensions in the column
    </p>
    <MathJaxMatrix
      matrix={[
        [1.5, -1, -1, 1],
        [0, 1.5, 0, 1],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ]}
    />
    <Homeogenous3DCoordinateVisualization
      initialTransform={new Matrix4().set(
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
      )}
      destinationTransform={new Matrix4().set(
        1.5,
        -1,
        -1,
        1,
        0,
        1.5,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
      )}
    />
    <p>
      Notice that unlike all the transformations we have looked at so far, this
      transformation <Strong>translated</Strong> us away from the origin?
    </p>
    <p>
      To a sharp mind, this might appear perplexing, because transforms done by
      multiplication can only really scale space on either dimension. How can we
      do a translation when that is fundamentally additive in nature?
    </p>
    <p>
      It all comes down to the fact that matrix multiplications are a
      multidimensional generalization of the vector dot product, which involves{' '}
      <Strong>both multiplication and addition</Strong>.
    </p>
    <p>
      Remember how we set the final co-ordinate{' '}
      <MathJax.Node inline formula="w" /> in our 4-dimensional vectors and the
      last entry in the 4-dimensional matrix to 1, with all the{' '}
      <MathJax.Node inline formula="wx, wy, wz" /> co-ordinates in the last row
      set to zero? Lets see how this pans out in a matrix multiplication
    </p>
    <MathJax.Node
      formula={`
        \\begin{bmatrix}
          1 && 0 && 0 && 1 \\\\
          0 && 1 && 0 && 1 \\\\
          0 && 0 && 1 && 0 \\\\
          0 && 0 && 0 && 1
        \\end{bmatrix} \\cdot
        \\begin{bmatrix}
          0 \\ 0 \\ 0 \\ 1
        \\end{bmatrix} =
        \\begin{bmatrix}
          0 \\times 0 + 0 \\times 0 + 0 \\times 0 + 1 \\times 1 \\\\
          0 \\times 0 + 0 \\times 0 + 0 \\times 0 + 1 \\times 1 \\\\
          0 \\times 0 + 0 \\times 0 + 0 \\times 0 + 0 \\times 1 \\\\
          0 \\times 0 + 0 \\times 0 + 0 \\times 0 + 1 \\times 1 \\\\
        \\end{bmatrix} =
        \\begin{bmatrix}
          1 \\\\ 1 \\\\ 0 \\\\ 1
        \\end{bmatrix}
        `}
    />
  </Section>
);

export default HomogeneousSection;
