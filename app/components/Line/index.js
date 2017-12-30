import React from 'react';
import PropTypes from 'prop-types';
import { Vector3 } from 'three';

const Line = ({ basis, extents, color, offset = [0, 0, 0] }) => (
  <line>
    <geometry
      vertices={[
        new Vector3((basis[0] * extents[0]) + offset[0],
                    (basis[1] * extents[0]) + offset[1],
                    (basis[2] * extents[0]) + offset[2]),
        new Vector3((basis[0] * extents[1]) + offset[0],
                    (basis[1] * extents[1]) + offset[1],
                    (basis[2] * extents[1]) + offset[2]),
      ]}
    />
    <lineBasicMaterial color={color} />
  </line>
);

Line.propTypes = {
  basis: PropTypes.arrayOf(PropTypes.number).isRequired,
  extents: PropTypes.arrayOf(PropTypes.number).isRequired,
  offset: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.number.isRequired,
};

export default Line;
