/*
 * CDNMathJaxContext
 *
 * A MathJax.Context with the correct CDN.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MathJax from 'react-mathjax';

const CDNMathJaxContext = ({ children, ...props }) => (
  <MathJax.Provider {...props}>{children}</MathJax.Provider>
);

CDNMathJaxContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.Node),
  ]),
};

export default CDNMathJaxContext;
