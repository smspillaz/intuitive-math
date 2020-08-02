/*
 * SingleIntegralVisualization
 *
 * A visualization for a single integral (usually 2D space).
 */

import React from 'react';
import PropTypes from 'prop-types';

import AxisVisualization2D from 'components/AxisVisualization2D';
import InterpolatedAnimation from 'components/InterpolatedAnimation';
import Pillar from 'components/Pillar';

import { segment1D } from 'utils/math';

const SingleIntegralVisualization = ({
  xMin,
  xMax,
  yMin,
  yMax,
  func,
  segments,
  opacityFunc = () => 0.8,
}) => (
  <AxisVisualization2D
    render={() => (
      <group>
        {segment1D(xMin, xMax, segments).map(([begin, end]) => {
          const xCenter = begin + (end - begin) / 2;
          const value = func(xCenter);
          const height = Math.max(
            Math.min(yMax + Math.min(0, value), value) - yMin,
            0,
          );
          const opacity = opacityFunc(xCenter);
          return (
            <Pillar
              key={xCenter}
              width={end - begin}
              height={height}
              depth={0.0001}
              x={begin}
              y={yMin}
              z={0}
              color={0xff00ff}
              opacity={opacity}
            />
          );
        })}
      </group>
    )}
  />
);

SingleIntegralVisualization.propTypes = {
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
  opacityFunc: PropTypes.func,
  segments: PropTypes.number.isRequired,
};

export const SpreadingSingleIntegralVisualization = ({
  startSegments,
  endSegments,
  ...props
}) => (
  <InterpolatedAnimation
    values={{
      segments: { begin: startSegments, end: endSegments },
    }}
    render={({ segments }) => (
      <SingleIntegralVisualization
        func={x => -(1 / 2) * x ** 2 + 3}
        segments={segments.value}
        {...props}
      />
    )}
  />
);

SpreadingSingleIntegralVisualization.propTypes = {
  startSegments: PropTypes.number.isRequired,
  endSegments: PropTypes.number.isRequired,
};

export const RollingSingleIntegralVisualization = ({
  xMin,
  xMax,
  ...props
}) => (
  <InterpolatedAnimation
    values={{
      complete: { begin: 0.0, end: 1.0 },
    }}
    render={({ complete }) => (
      <SingleIntegralVisualization
        func={x => -(1 / 2) * x ** 2 + 3}
        opacityFunc={x =>
          (x - xMin) / (xMax - xMin) < complete.value ? 0.8 : 0.0
        }
        xMin={xMin}
        xMax={xMax}
        {...props}
      />
    )}
  />
);

RollingSingleIntegralVisualization.propTypes = {
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
};

export default SingleIntegralVisualization;
