/*
 * 3DAxisVisualization
 *
 * A visualization that shows a 3D axis that rotates around.
 */

import React from 'react';

import PropTypes from 'prop-types';

import { Euler } from 'three';

import Animation from 'components/Animation';
import { XAxis, YAxis, ZAxis } from 'components/Axis';
import Visualization from 'components/Visualization';

const AxisVisualization3D = ({ render, width = 320, height = 240, rotationRate = 0.001 }) => (
  <Animation
    initial={{ rotation: new Euler(0.5, 0.5, 0) }}
    update={(state) => ({
      rotation: new Euler(state.rotation.x,
                          state.rotation.y + rotationRate,
                          state.rotation.z),
    })}
    render={(state) => (
      <Visualization width={width} height={height} rotation={state.rotation}>
        <XAxis />
        <YAxis />
        <ZAxis />
        {render ? render() : null}
      </Visualization>
    )}
  />
);

AxisVisualization3D.propTypes = {
  render: PropTypes.func,
  rotationRate: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default AxisVisualization3D;
