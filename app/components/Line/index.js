import React from 'react';
import PropTypes from 'prop-types';
import THREE, { Geometry, LineBasicMaterial, Vector3 } from 'three';

import { Group, asSceneElement, constructConstructorlessThreeObject } from 'components/Visualization';

const ThreeLine = asSceneElement(
  {
    material: PropTypes.object.isRequired,
    geometry: PropTypes.object.isRequired,
  },
  props => constructConstructorlessThreeObject(THREE.Line, props)
);

const Line = ({ basis, extents, color, offset = [0, 0, 0] }) => (
  <Group>
    <ThreeLine
      material={new LineBasicMaterial({ color })}
      geometry={(() => {
        const geometry = new Geometry();

        geometry.vertices.push(
          new Vector3(
            basis[0] * extents[0] + offset[0],
            basis[1] * extents[0] + offset[1],
            basis[2] * extents[0] + offset[2]),
          new Vector3(
            basis[0] * extents[1] + offset[0],
            basis[1] * extents[1] + offset[1],
            basis[2] * extents[1] + offset[2]
          ),
        );
      })()}
    />
  </Group>
);

Line.propTypes = {
  basis: PropTypes.arrayOf(PropTypes.number).isRequired,
  extents: PropTypes.arrayOf(PropTypes.number).isRequired,
  offset: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.number.isRequired,
};

export default Line;
