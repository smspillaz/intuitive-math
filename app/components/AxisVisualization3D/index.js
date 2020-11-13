/*
 * 3DAxisVisualization
 *
 * A visualization that shows a 3D axis that rotates around.
 */

import React from 'react';

import PropTypes from 'prop-types';

import { Euler } from 'three';

import { XAxis, YAxis, ZAxis } from 'components/Axis';
import Visualization from 'components/Visualization';

const AxisVisualization3D = ({
  rotationRate = 0.001,
  render,
  renderExtras,
  title = null,
}) => (
  <Visualization
    isAnimated
    renderExtras={renderExtras}
    title={title}
    rotation={new Euler(0.5, 0.5, 0)}
    update={({ mesh }) => {
      mesh.current.rotation.y += rotationRate;
    }}
  >
    <XAxis />
    <YAxis />
    <ZAxis />
    {render ? render() : null}
  </Visualization>
);

AxisVisualization3D.propTypes = {
  render: PropTypes.func,
  renderExtras: PropTypes.func,
  rotationRate: PropTypes.number,
  title: PropTypes.string,
};

export default AxisVisualization3D;
