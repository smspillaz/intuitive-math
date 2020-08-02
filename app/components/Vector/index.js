import React from 'react';
import PropTypes from 'prop-types';
import { Vector3 } from 'three';

const Vector = ({ position, base = new Vector3(0, 0, 0), color }) => (
  <group>
    <line>
      <geometry
        attach="geometry"
        vertices={[base, position]}
        onUpdate={self => {
          self.verticesNeedUpdate = true; // eslint-disable no-param-reassign
        }}
      />
      <lineBasicMaterial attach="material" color={color} />
    </line>
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[0.125, 0.125, 0.125]} />
      <meshBasicMaterial attach="material" color={color} />
    </mesh>
  </group>
);

Vector.propTypes = {
  base: PropTypes.object,
  position: PropTypes.object.isRequired,
  color: PropTypes.number.isRequired,
};

export default Vector;
