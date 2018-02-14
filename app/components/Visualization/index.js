import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import THREE, {
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import TrackVisibility from 'react-on-screen';

import memoize from 'memoize-one';

export const SceneContext = React.createContext();
export const ObjectGroupContext = React.createContext();

export class ThreeJSRenderer extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    camera: PropTypes.object.isRequired,
    children: PropTypes.children,
  };

  static childContextTypes = {
    renderer: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      renderer: PropTypes.number.isRequired,
      scene: PropTypes.object.isRequired,
      camera: PropTypes.object.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.containerRef = null;
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.scene = new Scene();
  }

  setContainerRef = ref => {
    this.containerRef = ref;
    this.containerRef.appendChild(this.renderer.domElement);
  };

  updateRendererSize = memoize((width, height) =>
    this.renderer.setSize(width, height),
  );

  render() {
    this.updateRendererSize(this.props.width, this.props.height);

    return (
      <SceneContext.Provider
        value={{
          camera: this.props.camera,
          renderer: this.renderer,
        }}
      >
        <ObjectGroupContext.Provider value={this.scene}>
          {this.props.children}
        </ObjectGroupContext.Provider>
      </SceneContext.Provider>
    );
  }
}

export const asSceneElement = (propTypeSpecs, constructWithProps) => {
  /* eslint-disable-next-line */
  class SceneElement extends React.Component {
    static propTypes = {
      parent: PropTypes.object.isRequired,
      children: PropTypes.children,
      ...propTypeSpecs,
    };
    componentDidMount() {
      /* On mount, we add ourselves to the scene */
      this.object = constructWithProps(this.props);
      this.propSetters = Object.keys(propTypeSpecs).reduce(
        (k, obj) => ({
          k: memoize(value => {
            this.object[k] = value;
          }),
          ...obj,
        }),
        {},
      );
      this.props.scene.add(this.object);
    }

    componentWillUnmount() {
      /* On unmount, remove ourselves from the scene */
      this.props.scene.remove(this.object);
    }

    render() {
      /* Update all the properties */
      Object.keys(this.props).forEach(key => {
        if (Object.keys(this.propTypeSpecs).indexOf(key) !== -1) {
          /* Set properties on the underlying
           * Three object if required */
          this.propSetters(key, this.props[key]);
        }
      });

      return <group>{this.props.children}</group>;
    }
  }

  /* eslint-disable-next-line */
  const Component = ({ children, ...props }) => (
    <ObjectGroupContext.Consumer>
      {parent => (
        <SceneElement parent={parent} {...props}>
          {children}
        </SceneElement>
      )}
    </ObjectGroupContext.Consumer>
  );

  Component.propTypes = {
    children: PropTypes.any,
    ...propTypeSpecs,
  };

  return Component;
};

export const constructConstructorlessThreeObject = (ThreeClass, props) => {
  const object = new ThreeClass();

  Object.keys.filter(k => props[k] !== undefined).forEach(k => {
    object[k] = props[k];
  });

  return object;
};

export const Group = asSceneElement(
  {
    matrix: PropTypes.object,
    rotation: PropTypes.object,
    scale: PropTypes.object,
    visible: PropTypes.boolean,
    position: PropTypes.object,
  },
  props => constructConstructorlessThreeObject(THREE.Group, props),
);

const Centered = styled.div`
  text-align: center;
`;

const Box = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: #000000;
  text-align: center;
  display: inline-block;
  border-radius: 1em;
`;

const Visualization = ({
  width,
  height,
  rotation,
  position,
  matrix,
  children,
  animationIsRunning = false,
}) => (
  <Centered>
    {animationIsRunning ? (
      <ThreeJSRenderer
        camera={(() => {
          const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
          camera.position = position || new Vector3(0, 0, 5);
        })()}
        width={width}
        height={height}
        canvasStyle={{
          borderRadius: '1em',
        }}
      >
        <Group
          {...(rotation ? { rotation } : {})}
          {...(matrix ? { matrix } : {})}
        >
          {children}
        </Group>
      </ThreeJSRenderer>
    ) : (
      <Box width={width} height={height} />
    )}
  </Centered>
);

Visualization.propTypes = {
  animationIsRunning: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rotation: PropTypes.object,
  matrix: PropTypes.object,
  position: PropTypes.object,
  children: PropTypes.element,
};

export const BlankableVisualization = props => (
  <TrackVisibility offset={100}>
    {({ isVisible }) => (
      <Visualization {...props} animationIsRunning={isVisible} />
    )}
  </TrackVisibility>
);

const BlankableByContextVisualization = (
  props,
  { animationIsRunning = true },
) => <Visualization animationIsRunning={animationIsRunning} {...props} />;

BlankableByContextVisualization.contextTypes = {
  animationIsRunning: PropTypes.bool,
};

export default BlankableByContextVisualization;
