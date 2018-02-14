/*
 * TriplePlanes
 *
 * A component to visualize three planes on a rotating
 * axis.
 */

import React from 'react';

import PropTypes from 'prop-types';

import AxisVisualization3D from 'components/AxisVisualization3D';
import Plane from 'components/Plane';

const TriplePlanes = ({ first, second, third, extents = [-1, 1] }) => (
  <AxisVisualization3D
    render={() => (
      <group>
        <Plane extents={extents} a={first[0]} b={first[1]} c={first[2]} d={first[3]} color={0xffff00} transparent opacity={0.8} />
        <Plane extents={extents} a={second[0]} b={second[1]} c={second[2]} d={second[3]} color={0xff00ff} transparent opacity={0.8} />
        <Plane extents={extents} a={third[0]} b={third[1]} c={third[2]} d={third[3]} color={0x00ffff} transparent opacity={0.8} />
      </group>
    )}
  />
);

TriplePlanes.propTypes = {
  first: PropTypes.arrayOf(PropTypes.number).isRequired,
  second: PropTypes.arrayOf(PropTypes.number).isRequired,
  third: PropTypes.arrayOf(PropTypes.number).isRequired,
  extents: PropTypes.arrayOf(PropTypes.number),
};

export default TriplePlanes;
