/*
 * MathJaxMatrix
 *
 * A helper element to create a MathJax matrix from an array of rows and
 * columns in row-major order.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MathJax from 'react-mathjax';

const renderMatrix = (matrix) => (
  `\\begin{bmatrix} ${matrix.map((row) => row.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`
);

const MathJaxMatrix = ({ matrix, ...props }) => (
  <MathJax.Node {...props}>{renderMatrix(matrix)}</MathJax.Node>
);

MathJaxMatrix.propTypes = {
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]))).isRequired,
};

export default MathJaxMatrix;

export {
  renderMatrix,
};
