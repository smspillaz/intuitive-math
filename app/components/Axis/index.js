import React from 'react';
import PropTypes from 'prop-types';
import { Vector3 } from 'three';

import Line from '../Line';

export const Axis = ({ basis, extents, color }) => (
  <group>
    <Line basis={basis} extents={extents} color={color} />
    {[...Array(Math.trunc(extents[1]) - Math.trunc(extents[0])).keys()].map((index) => {
      const tick = index + Math.trunc(extents[0]);
      return (
        <line key={tick}>
          <geometry
            vertices={[
              new Vector3((basis[0] * tick) - (0.125 * basis[1]),
                          (basis[1] * tick) - (0.125 * Math.max(basis[0], basis[2])),
                          basis[2] * tick),
              new Vector3((basis[0] * tick) + (0.125 * basis[1]),
                          (basis[1] * tick) + (0.125 * Math.max(basis[0], basis[2])),
                          basis[2] * tick),
            ]}
          />
          <lineBasicMaterial color={color} />
        </line>
      );
    })}
  </group>
);

Axis.propTypes = {
  basis: PropTypes.arrayOf(PropTypes.number).isRequired,
  extents: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.number.isRequired,
};

export const XAxis = ({ extents = [-10, 10] }) => (
  <Axis basis={[1, 0, 0]} extents={extents} color={0xff0000} />
);

XAxis.propTypes = {
  extents: PropTypes.arrayOf(PropTypes.number),
};

export const YAxis = ({ extents = [-10, 10] }) => (
  <Axis basis={[0, 1, 0]} extents={extents} color={0x00ff00} />
);

YAxis.propTypes = {
  extents: PropTypes.arrayOf(PropTypes.number),
};

export const ZAxis = ({ extents = [-10, 10] }) => (
  <Axis basis={[0, 0, 1]} extents={extents} color={0x0000ff} />
);

ZAxis.propTypes = {
  extents: PropTypes.arrayOf(PropTypes.number),
};
