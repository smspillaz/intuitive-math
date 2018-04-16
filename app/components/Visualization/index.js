import React from 'react';
import PropTypes from 'prop-types';
import { exposeMetrics } from 'react-metrics';

import styled from 'styled-components';

import THREE, {
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import Media from 'react-media';
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

import ClickToAnimate from 'components/ClickToAnimate';

const Centered = styled.div`
  text-align: center;
`;

const Box = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  opacity: ${(props) => props.opacity};
  ${props =>
    props.backgroundColor !== undefined ?
    `background-color: ${props.backgroundColor}` : ''
  };
  text-align: center;
  display: inline-block;
  border-radius: 1em;
`;

Box.propTypes = {
  backgroundColor: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  opacity: PropTypes.number,
};

const Overlay = styled.div`
  position: absolute;
  top: 0px;
`;

const OverlayParent = styled.div`
  position: relative;
  width: ${(props) => props.width};
  display: inline-block;
`;

OverlayParent.propTypes = {
  width: PropTypes.number.isRequired,
};

<<<<<<< HEAD
const VerticallyCenteredChild = styled.div`
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
`;

const VerticallyCenteredParent = styled.div`
  height: ${(props) => props.height}px;
  line-height: ${(props) => props.height}px;
`;

VerticallyCenteredParent.propTypes = {
  height: PropTypes.number.isRequired,
};

const VerticallyCentered = ({ children, ...props }) => (
  <VerticallyCenteredParent {...props}>
    <VerticallyCenteredChild>
      {children}
    </VerticallyCenteredChild>
  </VerticallyCenteredParent>
);

VerticallyCentered.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.Node),
    PropTypes.node,
  ]),
};

const TweenOverlayVisualization = ({
  width,
  height,
  rotation,
  position,
  matrix,
  children,
  overlayOpacity,
}) => (
  <Centered>
    <OverlayParent width={width}>
      {overlayOpacity !== 1.0 ? (
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
      {overlayOpacity !== 1.0 ? (
        <Overlay>
          <Box width={width} height={height} opacity={overlayOpacity} />
        </Overlay>
      ) : <span />}
    </OverlayParent>
  </Centered>
);

TweenOverlayVisualization.propTypes = {
  overlayOpacity: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rotation: PropTypes.object,
  matrix: PropTypes.object,
  position: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

class Visualization extends React.Component {
  static propTypes = {
    fadeTime: PropTypes.number,
    isVisible: PropTypes.bool,
  };

  static defaultProps = {
    fadeTime: 3000,
  };

  constructor() {
    super();
    this.state = {
      overlayOpacity: 1.0,
      overlayOpacityTarget: 1.0,
      overlayOpacitySource: 1.0,
    };
    this.rafID = -1;
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible !== this.props.isVisible) {
      if (nextProps.isVisible) {
        this.setState({
          overlayOpacityTarget: 0.0,
          overlayOpacitySource: 1.0,
        });
      } else {
        this.setState({
          overlayOpacityTarget: 1.0,
          overlayOpacitySource: 0.0,
        });
      }
      this.animate();
    }
  }

  componentWillUnmount() {
    if (this.rafID !== -1) {
      cancelAnimationFrame(this.rafID);
    }
    this.mounted = false;
  }

  animate() {
    if (this.rafID !== -1) {
      cancelAnimationFrame(this.rafID);
    }

    let start = null;
    const callback = (timestamp) => {
      if (!this.mounted) {
        return;
      }

      if (!start) {
        start = timestamp;
      }
      const progress = timestamp - start;
      const nextOpacity = Math.clamp(
          this.state.overlayOpacity + (
          (progress / this.props.fadeTime) *
          (this.state.overlayOpacityTarget - this.state.overlayOpacitySource)
        ),
        Math.min(this.state.overlayOpacitySource, this.state.overlayOpacityTarget),
        Math.max(this.state.overlayOpacitySource, this.state.overlayOpacityTarget)
      );
      this.setState({
        overlayOpacity: nextOpacity,
      });

      if (nextOpacity !== this.state.overlayOpacityTarget && this.mounted) {
        this.rafID = requestAnimationFrame(callback);
      }
    };
    this.rafID = requestAnimationFrame(callback);
  }

  render() {
    return (
      <TweenOverlayVisualization
        {...this.props}
        overlayOpacity={this.state.overlayOpacity}
      />
    );
  }
}

// eslint-disable-next-line react/prop-types
const SizesForMediaQueries = (Component) => ({ queries, ...props }) => (
  <div>
    {__SERVER__ ? <div /> : queries.map(({ query, width, height }) => (
      <Media query={query} key={query}>
        {(matches) => matches ? <Component width={width} height={height} {...props} /> : <span />}
      </Media>
    ))}
  </div>
);

SizesForMediaQueries.propTypes = {
  queries: PropTypes.arrayOf(PropTypes.shape({
    query: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  })).isRequired,
};

const SizedVisualization = SizesForMediaQueries(Visualization);

const visualizationSizes = [
  {
    query: '(max-width: 320px)',
    width: 280,
    height: 215,
  },
  {
    query: '(max-width: 800px) and (min-width: 321px)',
    width: 320,
    height: 240,
  },
  {
    query: '(min-width: 801px)',
    width: 420,
    height: 320,
  },
];

const OptionallySizedVisualization = (props) => (
  <div>
    {props.width ? (
      <Visualization {...props} />
    ) : (
      <SizedVisualization queries={visualizationSizes} {...props} />
    )}
  </div>
);

OptionallySizedVisualization.propTypes = {
  width: PropTypes.number,
};

// eslint-disable-next-line react/no-multi-comp
const recordVisibilityMetric = (Component) => {
  // eslint-disable-next-line react/no-multi-comp
  class VisibilityMetricRecorder extends React.Component {
    static propTypes = {
      animationIsRunning: PropTypes.bool.isRequired,
      isVisible: PropTypes.bool.isRequired,
      metrics: PropTypes.object.isRequired,
      title: PropTypes.string,
    }
    componentWillReceiveProps(nextProps) {
      if (!this.props.metrics) {
        return;
      }

      const title = this.props.title || 'Untitled Visualization';

      if (nextProps.isVisible && !this.props.isVisible) {
        this.props.metrics.track('becameVisible', { title });
      } else if (!nextProps.isVisible && this.props.isVisible) {
        this.props.metrics.track('becameInvisible', { title });
      }

      if (nextProps.animationIsRunning && !this.props.animationIsRunning) {
        this.props.metrics.track('animationStartedRunning', { title });
      } else if (!nextProps.animationIsRunning && this.props.animationIsRunning) {
        this.props.metrics.track('animationStoppedRunning', { title });
      }
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
  return VisibilityMetricRecorder;
};

const ExposedMetricsVisualization = exposeMetrics(recordVisibilityMetric(OptionallySizedVisualization));

// eslint-disable-next-line react/no-multi-comp
export class BlankableVisualization extends React.Component {
  renderChild = ({ isVisible }) => (
    <ClickToAnimate>
      <ExposedMetricsVisualization
        {...this.props}
        animationIsRunning={!!this.props.animationIsRunning}
        isVisible={isVisible}
      />
    </ClickToAnimate>
  )

  render() {
    return (
      <TrackVisibility offset={100}>
        {this.renderChild}
      </TrackVisibility>
    );
  }
}

const BlankableByContextVisualization = (
  props,
  { animationIsRunning = false, isVisible = true },
) => (
  <ClickToAnimate animationIsRunning={animationIsRunning}>
    <ExposedMetricsVisualization
      animationIsRunning={animationIsRunning}
      isVisible={isVisible}
      {...props}
    />
  </ClickToAnimate>
);

BlankableByContextVisualization.contextTypes = {
  animationIsRunning: PropTypes.bool,
  isVisible: PropTypes.bool,
};

export default BlankableByContextVisualization;
