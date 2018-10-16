import React from 'react';
import PropTypes from 'prop-types';
import THREE, { Geometry, LineBasicMaterial, Vector3 } from 'three';

import { Group, asSceneElement, constructConstructorlessThreeObject } from 'components/Visualization';

const Line = asSceneElement(
  {
    material: PropTypes.object.isRequired,
    geometry: PropTypes.object.isRequired,
  },
  props => constructConstructorlessThreeObject(THREE.Line, props)
);

export const Axis = ({ basis, extents, color }) => (
  <Group>
    <Line
      material={new LineBasicMaterial({ color })}
      geometry={(() => {
        const geometry = new Geometry();

        geometry.vertices.push(
          new Vector3(
            basis[0] * extents[0],
            basis[1] * extents[0],
            basis[2] * extents[0]),
          new Vector3(
            basis[0] * extents[1],
            basis[1] * extents[1],
            basis[2] * extents[1]
          ),
        );
      })()}
    />
    {[...Array(Math.trunc(extents[1]) - Math.trunc(extents[0])).keys()].map(
      index => {
        const tick = index + Math.trunc(extents[0]);

        return (
          <Line
            material={new LineBasicMaterial({ color })}
            geometry={(() => {
              const geometry = new Geometry();

              geometry.vertices.push(
                new Vector3(
                  (basis[0] * tick) - (0.125 * basis[1]),
                  (basis[1] * tick) - (0.125 * Math.max(basis[0], basis[2])),
                  basis[2] * tick
                ),
                new Vector3(
                  (basis[0] * tick) + (0.125 * basis[1]),
                  (basis[1] * tick) + (0.125 * Math.max(basis[0], basis[2])),
                  basis[2] * tick
                ),
              );
              return geometry;
            })()}
          />
        );
      },
    )}
  </Group>
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
