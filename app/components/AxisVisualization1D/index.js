/*
 * AxisVisualization1D
 *
 * A visualization that shows a non-animated 1D axis, with the ability
 * to draw stuff within the visualization.
 */

import React from 'react';

import PropTypes from 'prop-types';

import { XAxis } from 'components/Axis';
import Visualization from 'components/Visualization';

// Need to disable propTypes checking here as this is an HOC
// eslint-disable-next-line react/prop-types
const AxisVisualization1D = ({ render, renderExtras, title = null }) => (
  <Visualization title={title} renderExtras={renderExtras}>
    <XAxis />
    {render ? render() : null}
  </Visualization>
);

AxisVisualization1D.propTypes = {
  render: PropTypes.func.isRequired,
  renderExtras: PropTypes.func,
};

export default AxisVisualization1D;
