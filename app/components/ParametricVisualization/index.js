/*
 * ParametricVisualization
 *
 * Visualizations for 2-parameter defined surfaces.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MathJax from 'react-mathjax';

import { DoubleSide, Vector3 } from 'three';

import AxisVisualization3D from 'components/AxisVisualization3D';
import AxisVisualization2D from 'components/AxisVisualization2D';
import InterpolatedAnimation from 'components/InterpolatedAnimation';
import Tweakable from 'components/Tweakable';

export const Parametric2DPositionVisualization = ({ func, min, max, color = 0xffff00 }) => (
  <InterpolatedAnimation
    values={{
      time: { begin: min, end: max },
    }}
    render={({ time }) => {
      const [x, y] = func(time.value);
      return (
        <div>
          <AxisVisualization2D
            render={() => (
              <mesh position={new Vector3(x, y, 0)}>
                <boxGeometry width={0.125} height={0.125} depth={0.125} />
                <meshBasicMaterial color={color} />
              </mesh>
            )}
          />
          <div>
            <Tweakable {...time}>
              <MathJax.Node inline>{'t ='}</MathJax.Node>{' '}
            </Tweakable>
          </div>
        </div>
      );
    }}
  />
);

Parametric2DPositionVisualization.propTypes = {
  func: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  color: PropTypes.number,
};

export const Parametric3DPositionVisualization = ({ func, min, max, color = 0xffff00 }) => (
  <InterpolatedAnimation
    values={{
      time: { begin: min, end: max },
    }}
    render={({ time }) => {
      const [x, y, z] = func(time.value);
      return (
        <div>
          <AxisVisualization3D
            render={() => (
              <mesh position={new Vector3(x, y, z)}>
                <boxGeometry width={0.125} height={0.125} depth={0.125} />
                <meshBasicMaterial color={color} />
              </mesh>
            )}
          />
          <div>
            <Tweakable {...time}>
              <MathJax.Node inline>{'t ='}</MathJax.Node>{' '}
            </Tweakable>
          </div>
        </div>
      );
    }}
  />
);

Parametric3DPositionVisualization.propTypes = {
  func: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  color: PropTypes.number,
};

export const Parametric2DSurfaceVisualization = ({
  func,
  children,
  slices = 20,
  stacks = 20,
  color = 0xffff00,
  opacity = 0.8,
  wireframe = false,
}) => (
  <AxisVisualization2D
    render={() => (
      <group>
        <mesh>
          <parametricGeometry
            parametricFunction={func}
            slices={slices}
            stacks={stacks}
          />
          <meshBasicMaterial
            color={color}
            wireframe={wireframe}
            opacity={opacity}
            transparent
            side={DoubleSide}
          />
        </mesh>
        {children}
      </group>
    )}
  />
);

Parametric2DSurfaceVisualization.propTypes = {
  func: PropTypes.func.isRequired,
  color: PropTypes.number,
  opacity: PropTypes.number,
  slices: PropTypes.number,
  stacks: PropTypes.number,
  wireframe: PropTypes.boolean,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export const Parametric3DSurfaceVisualization = ({
  func,
  children,
  color = 0xffff00,
  opacity = 0.8,
  wireframe = false,
}) => (
  <AxisVisualization3D
    render={() => (
      <group>
        <mesh>
          <parametricGeometry
            parametricFunction={func}
            slices={20}
            stacks={20}
          />
          <meshBasicMaterial
            color={color}
            wireframe={wireframe}
            opacity={opacity}
            transparent
            side={DoubleSide}
          />
        </mesh>
        {children}
      </group>
    )}
  />
);

Parametric3DSurfaceVisualization.propTypes = {
  func: PropTypes.func.isRequired,
  color: PropTypes.number,
  opacity: PropTypes.number,
  wireframe: PropTypes.boolean,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
