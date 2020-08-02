/*
 * EROVisualization
 *
 * A component to visualize elementary row operations on planes.
 */

import React from 'react';

import PropTypes from 'prop-types';

import MathJax from 'react-mathjax';

import CenteredParagraph from 'components/CenteredParagraph';
import MathJaxMatrix from 'components/MathJaxMatrix';
import TriplePlanes from 'components/TriplePlanes';

/* Planes need to have four components to represent a solution - in case
 * we are using the null-solution shorthand, just append an extra zero */
const adjust3PointPlane = planeDefinition =>
  planeDefinition.length === 4 ? planeDefinition : [...planeDefinition, 0];

const EROVisualization = ({ first, second, third, ...props }) => (
  <div>
    <CenteredParagraph>
      <MathJaxMatrix
        inline
        matrix={[
          [first[0], first[1], first[2]],
          [second[0], second[1], second[2]],
          [third[0], third[1], third[2]],
        ]}
      />
      {first.length === 4 ? (
        <span>
          <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
          <MathJax.Node inline formula="=" />
          <MathJaxMatrix
            inline
            matrix={[[first[3]], [second[3]], [third[3]]]}
          />
        </span>
      ) : (
        <span />
      )}
    </CenteredParagraph>
    <TriplePlanes
      first={adjust3PointPlane(first)}
      second={adjust3PointPlane(second)}
      third={adjust3PointPlane(third)}
      {...props}
    />
  </div>
);

EROVisualization.propTypes = {
  first: PropTypes.arrayOf(PropTypes.number).isRequired,
  second: PropTypes.arrayOf(PropTypes.number).isRequired,
  third: PropTypes.arrayOf(PropTypes.number).isRequired,
  extents: PropTypes.arrayOf(PropTypes.number),
};

export default EROVisualization;
