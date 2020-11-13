import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Vector3 } from 'three';

import { useAnimationFrame } from 'components/AnimationController';

const Vector = ({ color, update }) => {
  const geometry = useRef();
  const mesh = useRef();

  const updateGeometry = useMemo(
    () => ({ base, position }) => {
      mesh.current.position.x = position.x;
      mesh.current.position.y = position.y;
      mesh.current.position.z = position.z;

      geometry.current.vertices[0].x = base.x;
      geometry.current.vertices[0].y = base.y;
      geometry.current.vertices[0].z = base.z;

      geometry.current.vertices[1].x = position.x;
      geometry.current.vertices[1].y = position.y;
      geometry.current.vertices[1].z = position.z;

      geometry.current.verticesNeedUpdate = true;
    },
    [],
  );
  const callWithPosition = useMemo(
    () => func => {
      const base = { x: 0, y: 0, z: 0 };
      const position = { x: 0, y: 0, z: 0 };

      if (update) {
        update({ base, position });
      }

      return func({ base, position });
    },
    [],
  );

  useAnimationFrame(() => callWithPosition(updateGeometry));

  const { base: firstBase, position: firstPosition } = callWithPosition(
    ({ base, position }) => ({
      base,
      position,
    }),
  );

  return (
    <group>
      <line>
        <geometry
          attach="geometry"
          ref={geometry}
          vertices={[
            new Vector3(firstBase.x, firstBase.y, firstBase.z),
            new Vector3(firstPosition.x, firstPosition.y, firstPosition.z),
          ]}
          onUpdate={self => {
            self.verticesNeedUpdate = true; // eslint-disable no-param-reassign
          }}
        />
        <lineBasicMaterial attach="material" color={color} />
      </line>
      <mesh
        ref={mesh}
        position={
          new Vector3(firstPosition.x, firstPosition.y, firstPosition.z)
        }
      >
        <boxGeometry attach="geometry" args={[0.125, 0.125, 0.125]} />
        <meshBasicMaterial attach="material" color={color} />
      </mesh>
    </group>
  );
};

Vector.propTypes = {
  update: PropTypes.func,
  color: PropTypes.number.isRequired,
};

export default Vector;
