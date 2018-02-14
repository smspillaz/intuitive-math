import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import TrackVisibility from 'react-on-screen';
import React3 from 'react-three-renderer';
import { Vector3 } from 'three';

const Centered = styled.div`
  text-align: center;
`;

const Box = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: #000000;
  text-align: center;
  display: inline-block;
  border-radius: 1em;
`;

Box.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const Visualization = ({ width, height, rotation, position, matrix, children, animationIsRunning = false }) => (
  <Centered>
    {animationIsRunning ? (
      <React3
        mainCamera="camera" // this points to the perspectiveCamera below
        width={width}
        height={height}
        canvasStyle={{
          borderRadius: '1em',
        }}
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
          <group
            {...(rotation ? { rotation } : {})}
            {...(matrix ? { matrix } : {})}
          >
            {children}
          </group>
        </scene>
      </React3>
    ) : (
      <Box width={width} height={height} />
    )}
  </Centered>
);

Visualization.propTypes = {
  animationIsRunning: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rotation: PropTypes.object,
  matrix: PropTypes.object,
  position: PropTypes.object,
  children: PropTypes.element,
};

export const BlankableVisualization = (props) => (
  <TrackVisibility offset={100}>
    {({ isVisible }) => <Visualization {...props} animationIsRunning={isVisible} />}
  </TrackVisibility>
);

const BlankableByContextVisualization = (props, { animationIsRunning = true }) => (
  <Visualization animationIsRunning={animationIsRunning} {...props} />
);

BlankableByContextVisualization.contextTypes = {
  animationIsRunning: PropTypes.bool,
};

export default BlankableByContextVisualization;
