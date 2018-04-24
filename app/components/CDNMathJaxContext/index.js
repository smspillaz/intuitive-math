/*
 * CDNMathJaxContext
 *
 * A MathJax.Context with the correct CDN.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MathJax from 'react-mathjax';

// eslint-disable-next-line
const MATHJAX_SCRIPT = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML';

const CDNMathJaxContext = ({ children, ...props }) => (
  <MathJax.Context
    script={MATHJAX_SCRIPT}
    {...props}
  >
    {children}
  </MathJax.Context>
);

CDNMathJaxContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.Node),
  ]),
};

export default CDNMathJaxContext;
