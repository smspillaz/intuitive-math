/*
 * CubeVectorsAnimatedERO
 *
 * A component that displays an animated cube
 * and associated transformation matrix.
 */

import React from 'react';

import PropTypes from 'prop-types';

import MathJaxMatrix from 'components/MathJaxMatrix';
import TweenedAffineTransformCube from 'components/TweenedAffineTransformCube';

const CubeVectorsAnimatedERO = ({ matrix }) => (
  <div>
    <MathJaxMatrix matrix={matrix} />
    <TweenedAffineTransformCube
      start={[[1, 0, 0], [0, 1, 0], [0, 0, 1]]}
      end={matrix}
    />
  </div>
);

CubeVectorsAnimatedERO.propTypes = {
  matrix: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  ).isRequired,
};

export default CubeVectorsAnimatedERO;
