/*
 * SurfaceNormalsIntegral
 *
 * Show the distribution of normals along a surface to show how they
 * can be used to calculate surface area.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Vector3 } from 'three';

import Vector from 'components/Vector';

import { cross, segment1D } from 'utils/math';

const SurfaceNormalsIntegral = ({
  uMin,
  uMax,
  vMin,
  vMax,
  segments,
  func,
  uGradientVecFunc,
  vGradientVecFunc,
  visualizationBias = 3,
}) => (
  <group>
    {segment1D(uMin, uMax, segments).map(([uBegin, uEnd]) => {
      const uCenter = uBegin + ((uEnd - uBegin) / 2);
      return segment1D(vMin, vMax, segments).map(([vBegin, vEnd]) => {
        const vCenter = vBegin + ((vEnd - vBegin) / 2);
        const baseVector = func(uCenter, vCenter);
        const uGradientVec = uGradientVecFunc(uCenter, vCenter).multiplyScalar((uEnd - uBegin) * visualizationBias);
        const vGradientVec = vGradientVecFunc(uCenter, vCenter).multiplyScalar((vEnd - vBegin) * visualizationBias);
        const normalVec = cross([uGradientVec.x, uGradientVec.y, uGradientVec.z],
                                [vGradientVec.x, vGradientVec.y, vGradientVec.z]);
        return (
          <Vector
            base={baseVector}
            position={new Vector3(...normalVec).add(baseVector)}
            color={0xff00ff}
          />
        );
      });
    })}
  </group>
);

SurfaceNormalsIntegral.propTypes = {
  uMin: PropTypes.number.isRequired,
  uMax: PropTypes.number.isRequired,
  vMin: PropTypes.number.isRequired,
  vMax: PropTypes.number.isRequired,
  segments: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
  uGradientVecFunc: PropTypes.func.isRequired,
  vGradientVecFunc: PropTypes.func.isRequired,
  visualizationBias: PropTypes.number,
};

export default SurfaceNormalsIntegral;
