/*
 * Homeogenous3DCoordinateVisualization
 *
 * Visualize homogenous co-ordinate transforms
 */

import React from 'react';
import PropTypes from 'prop-types';

import AxisVisualization3D from 'components/AxisVisualization3D';
import CubeVectors3D from 'components/CubeVectors3D';
import InterpolatedAnimation from 'components/InterpolatedAnimation';

import { interpolateHomogenousMatrixFunc } from 'utils/math';

export const Homeogenous3DCoordinateVisualization = ({
  initialTransform,
  destinationTransform,
  title,
}) => {
  const func = interpolateHomogenousMatrixFunc(initialTransform, destinationTransform);
  return (
    <InterpolatedAnimation
      values={{
        time: { begin: 0, end: 1 },
      }}
      render={({ time }) => (
        <AxisVisualization3D
          title={title}
          render={() => (
            <CubeVectors3D
              matrix={func(time.value)}
            />
            )}
        />
        )}
    />
  );
};

Homeogenous3DCoordinateVisualization.propTypes = {
  title: PropTypes.string,
  initialTransform: PropTypes.object.isRequired,
  destinationTransform: PropTypes.object.isRequired,
};

