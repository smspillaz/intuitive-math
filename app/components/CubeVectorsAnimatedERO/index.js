/*
 * CubeVectorsAnimatedERO
 *
 * A component that displays an animated cube
 * and associated transformation matrix.
 */

import React from 'react';

import PropTypes from 'prop-types';

import { Matrix4 } from 'three';

import AxisVisualization3D from 'components/AxisVisualization3D';
import CubeVectors3D from 'components/CubeVectors3D';
import InterpolatedAnimation from 'components/InterpolatedAnimation';
import MathJaxMatrix from 'components/MathJaxMatrix';

const CubeVectorsAnimatedERO = ({ matrix }) => (
  <div>
    <MathJaxMatrix matrix={matrix} />
    <InterpolatedAnimation
      values={{
        xScale: { begin: 1, end: matrix[0][0] },
        xyShear: { begin: 0, end: matrix[0][1] },
        xzShear: { begin: 0, end: matrix[0][2] },
        yxShear: { begin: 0, end: matrix[1][0] },
        yScale: { begin: 1, end: matrix[1][1] },
        yzShear: { begin: 0, end: matrix[1][2] },
        zxShear: { begin: 0, end: matrix[2][0] },
        zyShear: { begin: 0, end: matrix[2][1] },
        zScale: { begin: 1, end: matrix[2][2] },
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
