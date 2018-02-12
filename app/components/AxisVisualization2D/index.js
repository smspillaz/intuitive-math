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

// Need to disable propTypes checking here as this is an HOC
// eslint-disable-next-line react/prop-types
const AxisVisualization2D = (VisualizationComponent) => ({ render, width = 320, height = 240 }) => (
  <VisualizationComponent width={width} height={height}>
    <XAxis />
    <YAxis />
    {render ? render() : null}
  </VisualizationComponent>
);

AxisVisualization2D.propTypes = {
  render: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

const AnimatedAxisVisualization2D = AxisVisualization2D(Visualization);
const BlankableAxisVisualization2D = AxisVisualization2D(BlankableVisualization);

const MaybeBlankableAxisVisualization2D = (props, context) => (
  <div>
    {context.withinAnimation ? (
      <AnimatedAxisVisualization2D {...props} />
     ) : (
       <BlankableAxisVisualization2D {...props} />
     )}
  </div>
);

export default MaybeBlankableAxisVisualization2D;
