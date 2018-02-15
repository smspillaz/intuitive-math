/*
 * SpanningPlane2D
 *
 * A component which spans a plane transformed by a matrix
 */

import React from 'react';

import PropTypes from 'prop-types';

import { PlaneGeometry, DoubleSide } from 'three';

const SpanningPlane2D = ({ matrix }) => {
  const planeGeometry = new PlaneGeometry(1, 1);
  planeGeometry.translate(0.5, 0.5, 0.0);
  planeGeometry.applyMatrix(matrix);

  return (
    <mesh>
      <geometry
        vertices={planeGeometry.vertices}
        faces={planeGeometry.faces}
        colors={planeGeometry.colors}
        faceVertexUvs={planeGeometry.faceVertexUvs}
      />
      <meshBasicMaterial color={0xff00ff} opacity={0.8} side={DoubleSide} />
    </mesh>
  );
};

SpanningPlane2D.propTypes = {
  matrix: PropTypes.object.isRequired,
};

export default SpanningPlane2D;
