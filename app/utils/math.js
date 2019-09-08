/*
 * utils/math.js
 *
 * Some math-related util functions.
 */

import { Quaternion, Vector3, Matrix4 } from 'three';

export const range = n => ([...new Array(n)]).map((_, i) => i);

export const degreesToRadians = (degrees) => (Math.PI * degrees) / 180;

export const truncate = (num, precision) => {
  const power = 10 ** precision;
  return Math.floor(num * power) / power;
};

export const cross = (vec1, vec2) => (
  [
    (vec1[1] * vec2[2]) - (vec1[2] * vec2[1]),
    (vec1[2] * vec2[0]) - (vec1[0] * vec2[2]),
    (vec1[0] * vec2[1]) - (vec1[1] * vec2[0]),
  ]
);

export const dotProduct = (vec1, vec2) => (
  vec1.reduce((acc, c, i) => acc + (c * vec2[i]), 0)
);

export const magnitude = (...args) => (
  Math.sqrt([...args].reduce((acc, c) => acc + (c ** 2), 0))
);

export const tangentVectors = ([a, b, c]) => {
  if (a === 0 && b === 0) {
    return [[1, 0, 0], [0, 1, 0]];
  }
  return [[b, -a, 0], cross([b, -a, 0], [a, b, c])];
};

export const normalizeVector = (vec) => {
  const mag = Math.sqrt(vec.map((c) => c ** 2).reduce((s, c) => s + c, 0));
  return vec.map((c) => c / mag);
};

export const segment1D = (xMin, xMax, segments) => {
  const integerSegments = Math.round(segments);
  const segmentXLength = (xMax - xMin) / integerSegments;
  return range(integerSegments).map(i => ([
    (i * segmentXLength) + xMin,
    ((i + 1) * segmentXLength) + xMin,
  ]));
};

export const transpose = (matrix) =>
  matrix[0].map((_, i) => matrix.map((__, j) => matrix[j][i]));

export const matmul = (a, b) => {
  if (a.length !== b[0].length) {
    throw new Error(`Cannot multiply matrices of left columns ${a.length} and right rows ${b[0].length}`);
  }

  const rows = a[0].length;
  const cols = b.length;
  const n = a.length;

  const result = new Array(cols).fill(new Array(rows).fill(0));

  // Standard naive matrix multiplication (O(n^3))
  for (let i = 0; i < rows; ++i) { // eslint-disable-line
    for (let j = 0; j < cols; ++j) { // eslint-disable-line
      for (let k = 0; k < n; ++k) { // eslint-disable-line
        result[j][i] += a[k][j] * b[i][k];
      }
    }
  }

  return result;
};

export const rotate3D = ([c1, c2, c3], theta) => {
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  const oneMinusCosTheta = 1 - cosTheta;

  return [
    [
      cosTheta + (c1 * c1 * oneMinusCosTheta),
      (c1 * c2 * oneMinusCosTheta) + (c3 * sinTheta),
      (c1 * c3 * oneMinusCosTheta) - (c2 * sinTheta),
    ],
    [
      (c1 * c2 * oneMinusCosTheta) - (c3 * sinTheta),
      cosTheta + (c2 * c2 * oneMinusCosTheta),
      (c2 * c3 * oneMinusCosTheta) + (c1 * sinTheta),
    ],
    [
      (c1 * c3 * oneMinusCosTheta) + (c2 * sinTheta),
      (c2 * c3 * oneMinusCosTheta) - (c1 * sinTheta),
      cosTheta + (c3 * c3 * oneMinusCosTheta),
    ],
  ];
};

export const scale3D = ([x, y, z], matrix) => {
  const ret = matrix.map((col) => col.map((elem) => elem));
  ret[0][0] *= x;
  ret[1][1] *= y;
  ret[2][2] *= z;

  return ret;
};

export const interpolate = (initial, destination, value) => (
  (value * initial) + ((1 - value) * destination)
);

export const interpolateArrays = (initial, destination, value) => (
  range(initial.length).map((i) => (initial[i] * (1 - value)) + (destination[i] * value))
);

export const interpolateHomogenousMatrixFunc = (initial, destination) => {
  // Decompose into translation, scale and rotational factors
  const [initialPosition, initialRotation, initialScale] = [new Vector3(), new Quaternion(), new Vector3()];
  const [destinationPosition, destinationRotation, destinationScale] = [new Vector3(), new Quaternion(), new Vector3()];

  initial.decompose(initialPosition, initialRotation, initialScale);
  destination.decompose(destinationPosition, destinationRotation, destinationScale);

  const [lerpPosition, lerpRotation, lerpScale] = [new Vector3(), new Quaternion(), new Vector3()];
  const lerpMatrix = new Matrix4();

  return (time) => {
    // Now, interpolate the position and scale vectors, then the quaternion
    lerpPosition.lerpVectors(initialPosition, destinationPosition, time);
    lerpScale.lerpVectors(initialScale, destinationScale, time);
    Quaternion.slerp(initialRotation, destinationRotation, lerpRotation, time);

    // Now that we have that, we can reconstruct a transformation matrix and
    // return it
    lerpMatrix.compose(lerpPosition, lerpRotation, lerpScale);
    return lerpMatrix;
  };
};
