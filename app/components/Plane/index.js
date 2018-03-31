import React from 'react';
import PropTypes from 'prop-types';
import { DoubleSide, Vector3 } from 'three';

import { normalizeVector, tangentVectors } from 'utils/math';

/**
 * Plane:
 *
 * This is a parametric equation of a plane derived from the classic
 * equation of a plane: ax + by + cz = d
 *
 * From that equation, we know that (a, b, c) is a normal vector to the plane
 * because the equation itself represents the dot product between (a, b, c)
 * and some point (x, y, z) on the plane. So knowing the normal vector
 * we can find another othogonal vector tangent to the plane by
 * setting z to zero and solving for zero:
 *
 *   ax + by = 0
 *
 * A trivial solution to this is x = b, y = -a such that you have:
 *
 *   ab - ba = 0 (which is an identity)
 *
 * Now, that means we have another vector (b, -a, 0) which is perpendicular
 * to the normal and tangent to the plane. Now that we have those two, we
 * can use the cross-product to find a third vector:
 *
 *   (b, -a, 0) x (a, b, c): -ac, -bc, a^2 + b^2
 *
 * Note that if both a and b are zero, this is just going to yield zero vectors
 * which does not help. So we need to special case that and return (1, 0, 0)
 * and (0, 1, 0) accordingly.
 *
 * Now we just need to find a point on the plane, which we can do by picking
 * some scalar multiple k, of a, b and c:
 *
 *   k(a, b, c) => (ka, kb, kc)
 *
 * Plugging that into the equation we get:
 *
 *   a(ka) + b(kb) + c(kc) = d
 *   ka^2 + kb^2 + kc^2 = d
 *   k(a^2 + b^2 + c^2) = d
 *   k = d / (a^2 + b^2 + c^)
 *
 * Now that we have a point and two vectors we can easily define a parametric
 * equation in terms of them:
 *
 *   (ka, kb, kc) + (b, -a, 0)u + (-ac, -bc, a^2 + b^2)v
 *
 * Recalling that we want to define a plane with extents and that u and v
 * are unit scale, we'll need to adjust accordingly:
 *
 *  s = u * (extents[1] - extents[0]) + extents[0]
 *  t = v * (extents[1] - extents[0]) + extents[0]
 *
 * So we have:
 *
 *   (ka, kb, kc) + (b, -a, 0)s + (-ac, -bc, a^2 + b^2)t
 *
 * And putting it all together, for any s, t we have a vector defined by:
 *
 *   (ka + sb - tac, kb - sa - tbc, kc + ta^2 + tb^2)
 *
 * Thanks to Alexander Rafferty for taking the time to explain this to me.
 */
const Plane = ({
  a,
  b,
  c,
  d,
  color,
  extents,
  transparent = false,
  wireframe = false,
  opacity = 1.0,
}) => {
  const normal = [a, b, c];
  const tangentVecs = tangentVectors(normal);
  const [unitTangentVec1, unitTangentVec2] = tangentVecs.map((t) => normalizeVector(t));
  const k = d / ((a ** 2) + (b ** 2) + (c ** 2));
  const point = [k * a, k * b, k * c];

  return (
    <mesh>
      <parametricGeometry
        parametricFunction={(u, v) => {
          const s = (u * (extents[1] - extents[0])) + extents[0];
          const t = (v * (extents[1] - extents[0])) + extents[0];

          return new Vector3(point[0] + (unitTangentVec1[0] * s) + (unitTangentVec2[0] * t),
                             point[1] + (unitTangentVec1[1] * s) + (unitTangentVec2[1] * t),
                             point[2] + (unitTangentVec1[2] * s) + (unitTangentVec2[2] * t));
        }}
        slices={Math.min(10, Math.round(extents[1] - extents[0]))}
        stacks={Math.min(10, Math.round(extents[1] - extents[0]))}
      />
      <meshBasicMaterial
        color={color}
        wireframe={wireframe}
        opacity={opacity}
        transparent={transparent}
        side={DoubleSide}
      />
    </mesh>
  );
};

Plane.propTypes = {
  a: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
  c: PropTypes.number.isRequired,
  d: PropTypes.number.isRequired,
  extents: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.number.isRequired,
  transparent: PropTypes.bool,
  wireframe: PropTypes.wireframe,
  opacity: PropTypes.number,
};

export default Plane;
