import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import React3 from 'react-three-renderer';
import { Euler, Vector3 } from 'three';

const Centered = styled.div`
  text-align: center;
`;

const Visualization = ({ width, height, rotation, position, children }) => (
  <Centered>
    <React3
      mainCamera="camera" // this points to the perspectiveCamera below
      width={width}
      height={height}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}
          position={position || new Vector3(0, 0, 5)}
        />
        <group rotation={rotation || new Euler(0, 0, 0)}>
          {children}
        </group>
      </scene>
    </React3>
  </Centered>
);

Visualization.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rotation: PropTypes.object,
  position: PropTypes.object,
  children: PropTypes.element,
};

export default Visualization;
