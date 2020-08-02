/*
 * CubeVectors3D
 *
 * A component that displays a cube and associated edge vectors
 */

import React from 'react';

import PropTypes from 'prop-types';

import { BoxGeometry, Vector3 } from 'three';

import Vector from 'components/Vector';

const CubeVectors3D = ({ matrix, opacity = 0.8, wireframe = false }) => {
  const iHat = new Vector3(1, 0, 0);
  const jHat = new Vector3(0, 1, 0);
  const kHat = new Vector3(0, 0, 1);

  const cubeGeometry = new BoxGeometry(1, 1, 1);
  cubeGeometry.translate(0.5, 0.5, 0.5);
  cubeGeometry.applyMatrix(matrix);

  iHat.applyMatrix4(matrix);
  jHat.applyMatrix4(matrix);
  kHat.applyMatrix4(matrix);

  return (
    <group>
      <mesh>
        <geometry
          vertices={cubeGeometry.vertices}
          faces={cubeGeometry.faces}
          colors={cubeGeometry.colors}
          faceVertexUvs={cubeGeometry.faceVertexUvs}
        />
        <meshBasicMaterial
          color={0xff00ff}
          opacity={opacity}
          wireframe={wireframe}
        />
      </mesh>
      <Vector position={iHat} color={0xffff00} />
      <Vector position={jHat} color={0xff00ff} />
      <Vector position={kHat} color={0x00ffff} />
    </group>
  );
};

CubeVectors3D.propTypes = {
  opacity: PropTypes.number,
  matrix: PropTypes.object.isRequired,
  wireframe: PropTypes.bool,
};

export default CubeVectors3D;
