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

const CenteredParent = styled.div`
  text-align: center;
`;

const Box = styled.canvas`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  opacity: ${(props) => props.opacity !== undefined ? props.opacity : 1.0};
  ${(props) =>
    props.backgroundColor !== undefined ?
    `background-color: ${props.backgroundColor}` : ''
  };
  border-radius: ${(props) => !props.curvedBottomCorners ? '1em 1em 0 0' : '1em'};
`;

Box.propTypes = {
  curvedBottomCorners: PropTypes.bool,
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
`;

OverlayParent.propTypes = {
  width: PropTypes.number.isRequired,
};

const Centerable = styled.div`
  display: inline-block;
  position: relative;
  float: inherit;
`;

const Centered = ({ children }) => (
  <CenteredParent>
    <Centerable>
      {children}
    </Centerable>
  </CenteredParent>
);

Centered.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

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

const TweakablesBoxBorder = styled.div`
  border-color: #45516C;
  border-radius: 0 0 1em 1em;
  border-width: 1px;
  border-style: solid;
  display: inline-block;
  padding: 20px;
  width: ${(props) => props.width}px;
`;

TweakablesBoxBorder.propTypes = {
  width: PropTypes.number.isRequired,
};

export const TweakablesBox = ({ width, children }) => (
  <Centered>
    <TweakablesBoxBorder width={width}>
      {children}
    </TweakablesBoxBorder>
  </Centered>
);

TweakablesBox.propTypes = {
  width: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
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
      curvedBottomCorners,
      children,
    } = this.props;
    return (
      <React3
        mainCamera="camera" // this points to the perspectiveCamera below
        width={width}
        height={height}
        canvasStyle={{
          borderRadius: curvedBottomCorners ? '1em' : '1em 1em 0 0',
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
  curvedBottomCorners: PropTypes.bool.isRequired,
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

const SVGPlayButton = () => (
  <svg height="128" width="128">
    <circle
      cx="64"
      cy="64"
      r="48"
      fillOpacity="0.5"
      fill="#000000"
      style={{
        stroke: '#fefefe',
        strokeWidth: 1.5,
      }}
    />
    <path
      d="M 44 84 L 44 44 L 84 64 Z"
      fill="white"
      fillOpacity="0.9"
    />
  </svg>
);

const HoverIndicator = styled.div`
  background-color: ${(props) => props.color};
  opacity: 0.0;

  :hover {
    background-color: ${(props) => props.color};
    opacity: ${(props) => props.opacity};
  }
`;

HoverIndicator.propTypes = {
  color: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
};

const PlayButtonOverlay = ({ width, height }) => (
  <div>
    <Overlay>
      <div style={{ width, height }}>
        <VerticallyCentered height={height}>
          <Centered>
            <SVGPlayButton />
          </Centered>
        </VerticallyCentered>
      </div>
    </Overlay>
    <Overlay>
      <HoverIndicator color="#fefefe" opacity={0.3}>
        <Box width={width} height={height} />
      </HoverIndicator>
    </Overlay>
  </div>
);

PlayButtonOverlay.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const BlankBox = ({ width, height, curvedBottomCorners, opacity = 1.0 }) => (
  <Box
    width={width}
    height={height}
    opacity={opacity}
    curvedBottomCorners={curvedBottomCorners}
    backgroundColor={'#000000'}
  />
);

BlankBox.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  curvedBottomCorners: PropTypes.bool.isRequired,
  opacity: PropTypes.number,
};

const PlayableVisualization = ({ width, height, playable, children, ...props }) => (
  <div>
    <OverlayParent width={width}>
      <AnimatedReact3Visualization width={width} height={height} {...props}>
        {children}
      </AnimatedReact3Visualization>
      {playable && (
        <PlayButtonOverlay width={width} height={height} />
      )}
    </OverlayParent>
  </div>
);

PlayableVisualization.propTypes = {
  playable: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

const TweenOverlayVisualization = ({
  width,
  height,
  children,
  curvedBottomCorners,
  overlayOpacity,
}) => (
  <OverlayParent width={width}>
    {overlayOpacity !== 1.0 ? (
      <div>
        {children}
      </div>
    ) : <BlankBox
      width={width}
      height={height}
      curvedBottomCorners={curvedBottomCorners}
    />}
    {overlayOpacity !== 1.0 && overlayOpacity !== 0.0 ? (
      <Overlay>
        <BlankBox
          width={width}
          height={height}
          opacity={overlayOpacity}
          curvedBottomCorners={curvedBottomCorners}
        />
      </Overlay>
    ) : <span />}
  </OverlayParent>
);

TweenOverlayVisualization.propTypes = {
  overlayOpacity: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  curvedBottomCorners: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

// eslint-disable-next-line react/no-multi-comp
class OverlayTweenFromVisibility extends React.Component {
  static propTypes = {
    fadeTime: PropTypes.number,
    isVisible: PropTypes.bool,
    render: PropTypes.func.isRequired,
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
    return this.props.render({ overlayOpacity: this.state.overlayOpacity });
  }
}

const Visualization = ({
  animationIsRunning,
  isAnimated,
  fadeTime,
  isVisible,
  width,
  height,
  children,
  renderExtras,
  ...props
}) => (
  <OverlayTweenFromVisibility
    fadeTime={fadeTime}
    isVisible={isVisible}
    render={({ overlayOpacity }) => (
      <Centered>
        <TweenOverlayVisualization
          width={width}
          height={height}
          overlayOpacity={overlayOpacity}
          curvedBottomCorners={!renderExtras}
        >
          <ClickToAnimate>
            <PlayableVisualization
              width={width}
              height={height}
              playable={animationIsRunning === false && isAnimated && overlayOpacity === 0.0}
              curvedBottomCorners={!renderExtras}
              {...props}
            >
              {children}
            </PlayableVisualization>
          </ClickToAnimate>
        </TweenOverlayVisualization>
        {renderExtras && renderExtras({ width, animationIsRunning })}
      </Centered>
    )}
  />
);

Visualization.propTypes = {
  animationIsRunning: PropTypes.bool,
  isAnimated: PropTypes.bool,
  fadeTime: PropTypes.number,
  isVisible: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  renderExtras: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

// eslint-disable-next-line react/prop-types
const SizesForMediaQueries = (Component) => ({ queries, ...props }) => (
  <div>
    {(__SERVER__ || !window || Object.keys(window).indexOf('matchMedia') === -1) ? <div /> : queries.map(({ query, width, height }) => (
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
    <ExposedMetricsVisualization
      {...this.props}
      animationIsRunning={!!this.props.animationIsRunning}
      isAnimated={!!this.props.isAnimated}
      isVisible={isVisible}
    />
  )

  render() {
    return (
      <TrackVisibility offset={100}>
        {this.renderChild}
      </TrackVisibility>
    );
  }
}

BlankableVisualization.propTypes = {
  animationIsRunning: PropTypes.bool,
  isAnimated: PropTypes.bool,
};

const BlankableByContextVisualization = (props, { animationIsRunning = false, withinAnimation = false, isVisible = true }) => (
  <ExposedMetricsVisualization
    animationIsRunning={animationIsRunning}
    isAnimated={withinAnimation}
    isVisible={isVisible}
    {...props}
  />
);

BlankableByContextVisualization.contextTypes = {
  animationIsRunning: PropTypes.bool,
  isVisible: PropTypes.bool,
  withinAnimation: PropTypes.bool,
};

export default BlankableByContextVisualization;
