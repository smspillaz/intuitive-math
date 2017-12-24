import React from 'react';
import PropTypes from 'prop-types';
import { Vector3 } from 'three';

const Vector = ({ position, base = new Vector3(0, 0, 0), color }) => (
  <group>
    <line>
      <geometry
        vertices={[
          base,
          position,
        ]}
      />
      <lineBasicMaterial color={color} />
    </line>
    <mesh position={position}>
      <boxGeometry width={0.125} height={0.125} depth={0.125} />
      <meshBasicMaterial color={color} />
    </mesh>
  </group>
);

Vector.propTypes = {
  base: PropTypes.object,
  position: PropTypes.object.isRequired,
  color: PropTypes.number.isRequired,
};

export default Vector;
