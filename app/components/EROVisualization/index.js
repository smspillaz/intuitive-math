/*
 * EROVisualization
 *
 * A component to visualize elementary row operations on planes.
 */

import React from 'react';

import PropTypes from 'prop-types';

import MathJax from 'react-mathjax';

import MathJaxMatrix from 'components/MathJaxMatrix';
import TriplePlanes from 'components/TriplePlanes';

const EROVisualization = ({ first, second, third, ...props }) => (
  <div>
    <p style={{ textAlign: 'center' }}>
      <MathJaxMatrix
        inline
        matrix={[
          [[first[0]], [first[1]], [first[2]]],
          [[second[0]], [second[1]], [second[2]]],
          [[third[0]], [third[1]], [third[2]]],
        ]}
      />
      <MathJaxMatrix inline matrix={[['x'], ['y'], ['z']]} />
      <MathJax.Node inline>=</MathJax.Node>
      <MathJaxMatrix inline matrix={[[first[3]], [second[3]], [third[3]]]} />
    </p>
    <TriplePlanes first={first} second={second} third={third} {...props} />
  </div>
);

EROVisualization.propTypes = {
  first: PropTypes.arrayOf(PropTypes.number).isRequired,
  second: PropTypes.arrayOf(PropTypes.number).isRequired,
  third: PropTypes.arrayOf(PropTypes.number).isRequired,
  extents: PropTypes.arrayOf(PropTypes.number),
};

export default EROVisualization;
