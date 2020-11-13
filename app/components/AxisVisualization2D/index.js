/*
 * 2DAxisVisualization
 *
 * A visualization that shows a non-animated 2D axis, with the ability
 * to draw stuff within the visualization.
 */

import React from 'react';

import PropTypes from 'prop-types';

import { XAxis, YAxis } from 'components/Axis';
import Visualization from 'components/Visualization';

// Need to disable propTypes checking here as this is an HOC
// eslint-disable-next-line react/prop-types
const AxisVisualization2D = ({ render, renderExtras, title = null }) => (
  <Visualization title={title} renderExtras={renderExtras}>
    <XAxis />
    <YAxis />
    {render ? render() : null}
  </Visualization>
);

AxisVisualization2D.propTypes = {
  render: PropTypes.func.isRequired,
  renderExtras: PropTypes.func,
};

export default AxisVisualization2D;
