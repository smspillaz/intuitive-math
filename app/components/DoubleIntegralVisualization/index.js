/*
 * SingleIntegralVisualization
 *
 * A visualization for a double integral (usually 3D space).
 */

import React from 'react';
import PropTypes from 'prop-types';

import AxisVisualization3D from 'components/AxisVisualization3D';
import Pillar from 'components/Pillar';

import { segment1D } from 'utils/math';

export const DoubleIntegral = ({
  xMin,
  xMax,
  yMin,
  yMax,
  zMin,
  zMax,
  func,
  segments,
  opacityFunc = () => 0.8,
  wireframe = true,
}) => (
  <group>
    {segment1D(xMin, xMax, segments).map(([xBegin, xEnd]) => {
      const xCenter = xBegin + ((xEnd - xBegin) / 2);
      return segment1D(yMin, yMax, segments).map(([yBegin, yEnd]) => {
        const yCenter = yBegin + ((yEnd - yBegin) / 2);
        const value = func(xCenter, yCenter);
        const depth = Math.max(Math.max(Math.min(zMax, 0) + Math.min(0, value), value) - zMin, 0);
        const opacity = opacityFunc(xCenter, yCenter);
        return (
          <Pillar
            key={`${xCenter}-${yCenter}`}
            width={(xEnd - xBegin)}
            height={yEnd - yBegin}
            depth={depth}
            x={xBegin}
            y={yBegin}
            z={zMin}
            color={0xff00ff}
            opacity={opacity}
            wireframe={wireframe}
          />
        );
      });
    })}
  </group>
);

DoubleIntegral.propTypes = {
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  zMin: PropTypes.number.isRequired,
  zMax: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
  opacityFunc: PropTypes.func,
  segments: PropTypes.number.isRequired,
  wireframe: PropTypes.bool,
};

const DoubleIntegralVisualization = (props) => (
  <AxisVisualization3D
    render={() => (
      <DoubleIntegral {...props} />
    )}
  />
);

DoubleIntegralVisualization.propTypes = {
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  zMin: PropTypes.number.isRequired,
  zMax: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
  opacityFunc: PropTypes.func,
  segments: PropTypes.number.isRequired,
  wireframe: PropTypes.bool,
};

export default DoubleIntegralVisualization;
