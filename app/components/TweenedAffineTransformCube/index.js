/*
 * TweenedAffineTransformCube
 *
 * A component that displays an animated cube tweened between two
 * matrix states.
 */

import React from 'react';

import PropTypes from 'prop-types';

import { Matrix4 } from 'three';

import AxisVisualization3D from 'components/AxisVisualization3D';
import CubeVectors3D from 'components/CubeVectors3D';
import InterpolatedAnimation from 'components/InterpolatedAnimation';

const TweenedAffineTransformCube = ({ start, end }) => (
  <InterpolatedAnimation
    values={{
      xScale: { begin: start[0][0], end: end[0][0] },
      xyShear: { begin: start[0][1], end: end[0][1] },
      xzShear: { begin: start[0][2], end: end[0][2] },
      yxShear: { begin: start[1][0], end: end[1][0] },
      yScale: { begin: start[1][1], end: end[1][1] },
      yzShear: { begin: start[1][2], end: end[1][2] },
      zxShear: { begin: start[2][0], end: end[2][0] },
      zyShear: { begin: start[2][1], end: end[2][1] },
      zScale: { begin: start[2][2], end: end[2][2] },
    }}
    render={({
      xScale,
      xyShear,
      xzShear,
      yxShear,
      yScale,
      yzShear,
      zxShear,
      zyShear,
      zScale,
    }) => {
      const mat = new Matrix4();
      mat.set(xScale.value, xyShear.value, xzShear.value, 0,
              yxShear.value, yScale.value, yzShear.value, 0,
              zxShear.value, zyShear.value, zScale.value, 0,
              0, 0, 0, 1);

      return (
        <div>
          <AxisVisualization3D
            render={() => (
              <CubeVectors3D matrix={mat} />
            )}
          />
        </div>
      );
    }}
  />
);

TweenedAffineTransformCube.propTypes = {
  start: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  ).isRequired,
  end: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  ).isRequired,
};

export default TweenedAffineTransformCube;
