/*
 * utils/math.js
 *
 * Some math-related util functions.
 */

export const truncate = (num, precision) => {
  const power = 10 ** precision;
  return Math.floor(num * power) / power;
};
