/*
 * MonkeyPatchedSpinKit
 *
 * A wrapper around SpinKit patched to work with server-side rendering.
 */

process.env.REACT_SPINKIT_NO_STYLES = '1';

const SpinKit = require('react-spinkit');

module.exports = SpinKit;
