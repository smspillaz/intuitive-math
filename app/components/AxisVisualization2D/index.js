/*
 * 2DAxisVisualization
 *
 * A visualization that shows a non-animated 2D axis, with the ability
 * to draw stuff within the visualization.
 */

import React from 'react';

import PropTypes from 'prop-types';

import { XAxis, YAxis } from 'components/Axis';
import Visualization, { BlankableVisualization } from 'components/Visualization';

const AxisVisualization2D = ({ render, visualizationComponent, width = 320, height = 240 }) => (
  <visualizationComponent width={width} height={height}>
    <XAxis />
    <YAxis />
    {render ? render() : null}
  </visualizationComponent>
);

AxisVisualization2D.propTypes = {
  render: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  visualizationComponent: PropTypes.func.isRequired,
};

const MaybeBlankableAxisVisualization2D = (props, context) => (
  <div>
    {context.withinAnimation ? (
      <AxisVisualization2D visualizationComponent={Visualization} {...props} />
     ) : (
       <AxisVisualization2D visualizationComponent={BlankableVisualization} {...props} />
     )}
  </div>
);

export default MaybeBlankableAxisVisualization2D;
