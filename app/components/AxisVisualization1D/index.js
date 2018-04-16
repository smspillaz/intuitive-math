/*
 * AxisVisualization1D
 *
 * A visualization that shows a non-animated 1D axis, with the ability
 * to draw stuff within the visualization.
 */

import React from 'react';

import PropTypes from 'prop-types';

import { XAxis } from 'components/Axis';
import Visualization, { BlankableVisualization } from 'components/Visualization';

// Need to disable propTypes checking here as this is an HOC
// eslint-disable-next-line react/prop-types
const AxisVisualization1D = (VisualizationComponent) => ({ render, title = null }) => (
  <VisualizationComponent title={title}>
    <XAxis />
    {render ? render() : null}
  </VisualizationComponent>
);

AxisVisualization1D.propTypes = {
  render: PropTypes.func.isRequired,
};

const AnimatedAxisVisualization1D = AxisVisualization1D(Visualization);
const BlankableAxisVisualization1D = AxisVisualization1D(BlankableVisualization);

const MaybeBlankableAxisVisualization1D = (props, context) => (
  <div>
    {context.withinAnimation ? (
      <AnimatedAxisVisualization1D {...props} />
     ) : (
       <BlankableAxisVisualization1D {...props} />
     )}
  </div>
);

MaybeBlankableAxisVisualization1D.contextTypes = {
  withinAnimation: PropTypes.bool,
};

export default MaybeBlankableAxisVisualization1D;
