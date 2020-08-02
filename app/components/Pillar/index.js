/*
 * Pillar
 *
 * A component which is a single pillar, centered on the axis.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Vector3 } from 'three';

const Pillar = ({
  width,
  height,
  depth,
  x,
  y,
  z,
  color,
  opacity = 0.8,
  wireframe = false,
}) => {
  const volume = width * height * depth;

  if (volume === 0) {
    return <group />;
  }

  const xPosition = x + width / 2;
  const yPosition = y + height / 2;
  const zPosition = z + depth / 2;
  const position = new Vector3(xPosition, yPosition, zPosition);

  return (
    <group>
      <mesh position={position}>
        <boxGeometry attach="geometry" args={[width, height, depth]} />
        <meshBasicMaterial
          attach="material"
          color={color}
          opacity={opacity}
          transparent
          wireframe={wireframe}
        />
      </mesh>
    </group>
  );
};

Pillar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  z: PropTypes.number.isRequired,
  color: PropTypes.number.isRequired,
  opacity: PropTypes.number,
  wireframe: PropTypes.bool,
};

export default Pillar;
