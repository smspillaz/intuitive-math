import React from 'react';
import PropTypes from 'prop-types';
import { exposeMetrics } from 'react-metrics';

import styled from 'styled-components';

import Media from 'react-media';
import TrackVisibility from 'react-on-screen';
import React3 from 'react-three-renderer';
import { Vector3 } from 'three';

import callbackAnimator from 'components/CallbackAnimator';
import ClickToAnimate from 'components/ClickToAnimate';

const Centered = styled.div`
  text-align: center;
`;

const Box = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  opacity: ${(props) => props.opacity};
  background-color: #000000;
  text-align: center;
  display: inline-block;
  border-radius: 1em;
`;

Box.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  opacity: PropTypes.number.isRequired,
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

class React3Visualization extends React.Component {
  oneManualRender = () => {
    if (!this.props.animationIsRunning) {
      this.manualRenderCallback(true);
    }
  }

  handleManualRenderTriggerCreated = (trigger) => {
    // Render a frame on the next tick (doing so immediately
    // means that the canvas isn't yet realized).
    this.manualRenderCallback = trigger;
    setTimeout(this.oneManualRender, 1);

    if (this.props.onRegisterManualRenderCallback) {
      this.props.onRegisterManualRenderCallback(this.oneManualRender);
    }
  }

  handleAnimationFrame = () => {
    if (this.props.animationIsRunning) {
      this.props.onAnimationFrame();
    }
  }

  render() {
    const {
      animationIsRunning,
      width,
      height,
      rotation,
      position,
      matrix,
      children,
    } = this.props;
    return (
      <React3
        mainCamera="camera" // this points to the perspectiveCamera below
        width={width}
        height={height}
        canvasStyle={{
          borderRadius: '1em',
        }}
        onAnimate={this.handleAnimationFrame}
        // Force "manual rendering" if animation is not running
        forceManualRender={!animationIsRunning}
        // When we get our manual render trigger, render a single
        // frame. This usually happens when the component
        // mounts and allows the contents of the canvas to be
        // defined for future animation.
        onManualRenderTriggerCreated={this.handleManualRenderTriggerCreated}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={position || new Vector3(0, 0, 5)}
          />
          <group
            {...(rotation ? { rotation } : {})}
            {...(matrix ? { matrix } : {})}
          >
            {children}
          </group>
        </scene>
      </React3>
    );
  }
}

React3Visualization.propTypes = {
  animationIsRunning: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rotation: PropTypes.object,
  matrix: PropTypes.object,
  position: PropTypes.object,
  onAnimationFrame: PropTypes.func,
  onRegisterManualRenderCallback: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

const AnimatedReact3Visualization = callbackAnimator(React3Visualization);

const TweenOverlayVisualization = ({ width, height, children, overlayOpacity, ...props }) => (
  <Centered>
    <OverlayParent width={width}>
      {overlayOpacity !== 1.0 ? (
        <AnimatedReact3Visualization width={width} height={height} {...props}>
          {children}
        </AnimatedReact3Visualization>
      ) : <Box width={width} height={height} opacity={1.0} />}
      {overlayOpacity !== 1.0 && overlayOpacity !== 0.0 ? (
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
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

// eslint-disable-next-line react/no-multi-comp
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
      <ExposedMetricsVisualization {...this.props} isVisible={isVisible} />
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

const BlankableByContextVisualization = (props, { animationIsRunning = false, isVisible = true }) => (
  <ClickToAnimate>
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
