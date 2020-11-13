// eslint-disable too-many-classes
// eslint-disable max-classes-per-file
import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { exposeMetrics } from 'react-metrics';

import styled from 'styled-components';

import Media from 'react-media';
import TrackVisibility from 'react-on-screen';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { Color } from 'three';

import { AnimationControllerContext } from 'components/AnimationController';
import { AnimationContext } from 'components/Animation';
import ClickToAnimate from 'components/ClickToAnimate';

import { clamp } from 'utils/math';

const CenteredParent = styled.div`
  text-align: center;
`;

const Box = styled.canvas`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  opacity: ${props => (props.opacity !== undefined ? props.opacity : 1.0)};
  ${props =>
    props.backgroundColor !== undefined
      ? `background-color: ${props.backgroundColor}`
      : ''};
  border-radius: ${props =>
    !props.curvedBottomCorners ? '1em 1em 0 0' : '1em'};
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
    <Centerable>{children}</Centerable>
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
  height: ${props => props.height}px;
  line-height: ${props => props.height}px;
`;

VerticallyCenteredParent.propTypes = {
  height: PropTypes.number.isRequired,
};

const VerticallyCentered = ({ children, ...props }) => (
  <VerticallyCenteredParent {...props}>
    <VerticallyCenteredChild>{children}</VerticallyCenteredChild>
  </VerticallyCenteredParent>
);

VerticallyCentered.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.Node),
    PropTypes.node,
  ]),
};

const TweakablesBoxBorder = styled.div`
  border-color: #45516c;
  border-radius: 0 0 1em 1em;
  border-width: 1px;
  border-style: solid;
  display: inline-block;
  padding: 20px;
  width: ${props => props.width}px;
`;

TweakablesBoxBorder.propTypes = {
  width: PropTypes.number.isRequired,
};

export const TweakablesBox = ({ width, children }) => (
  <Centered>
    <TweakablesBoxBorder width={width}>{children}</TweakablesBoxBorder>
  </Centered>
);

TweakablesBox.propTypes = {
  width: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const Element = ({
  onAnimationFrame = null,
  animationIsRunning,
  children,
  update = null,
  rotation = null,
  matrix = null,
}) => {
  const mesh = useRef();
  const { camera, size, scene } = useThree();

  camera.aspect = size.width / size.height;
  scene.background = new Color(0x000000);

  useFrame(props => {
    // Skip calling frame callback if animation is not meant to be run
    if (!animationIsRunning) {
      return;
    }

    if (onAnimationFrame) {
      onAnimationFrame({ ...props });
    }

    if (update) {
      update({ mesh });
    }
  });

  return (
    <group
      ref={mesh}
      {...(rotation ? { rotation } : {})}
      {...(matrix ? { matrix } : {})}
    >
      {children}
    </group>
  );
};

Element.propTypes = {
  onAnimationFrame: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  rotation: PropTypes.object,
  matrix: PropTypes.object,
  animationIsRunning: PropTypes.bool.isRequired,
  update: PropTypes.func,
};

const AnimatedReact3Visualization = ({
  width,
  height,
  children,
  curvedBottomCorners = true,
  ...props
}) => {
  const animationControllerContext = useContext(AnimationControllerContext);
  const animationContext = useContext(AnimationContext);

  return (
    <Canvas
      style={{
        width,
        height,
        margin: 'auto',
        borderRadius: curvedBottomCorners ? '1em' : '1em 1em 0 0',
      }}
      invalidateFrameloop={!animationControllerContext.animationIsRunning}
    >
      {/* Need to re-provide the animation context */}
      <AnimationControllerContext.Provider value={animationControllerContext}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Element
          {...animationControllerContext}
          {...animationContext}
          {...props}
        >
          {children}
        </Element>
      </AnimationControllerContext.Provider>
    </Canvas>
  );
};

AnimatedReact3Visualization.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  curvedBottomCorners: PropTypes.bool,
};

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
    <path d="M 44 84 L 44 44 L 84 64 Z" fill="white" fillOpacity="0.9" />
  </svg>
);

const HoverIndicator = styled.div`
  background-color: ${props => props.color};
  opacity: 0;

  :hover {
    background-color: ${props => props.color};
    opacity: ${props => props.opacity};
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
    backgroundColor="#000000"
  />
);

BlankBox.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  curvedBottomCorners: PropTypes.bool.isRequired,
  opacity: PropTypes.number,
};

const PlayableVisualization = ({
  width,
  height,
  playable,
  children,
  ...props
}) => (
  <div>
    <OverlayParent width={width}>
      <AnimatedReact3Visualization width={width} height={height} {...props}>
        {children}
      </AnimatedReact3Visualization>
      {playable && <PlayButtonOverlay width={width} height={height} />}
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
      <div>{children}</div>
    ) : (
      <BlankBox
        width={width}
        height={height}
        curvedBottomCorners={curvedBottomCorners}
      />
    )}
    {overlayOpacity !== 1.0 && overlayOpacity !== 0.0 ? (
      <Overlay>
        <BlankBox
          width={width}
          height={height}
          opacity={overlayOpacity}
          curvedBottomCorners={curvedBottomCorners}
        />
      </Overlay>
    ) : (
      <span />
    )}
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

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
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
    const callback = timestamp => {
      if (!this.mounted) {
        return;
      }

      if (!start) {
        start = timestamp;
      }
      const progress = timestamp - start;
      const nextOpacity = clamp(
        this.state.overlayOpacity +
          (progress / this.props.fadeTime) *
            (this.state.overlayOpacityTarget - this.state.overlayOpacitySource),
        Math.min(
          this.state.overlayOpacitySource,
          this.state.overlayOpacityTarget,
        ),
        Math.max(
          this.state.overlayOpacitySource,
          this.state.overlayOpacityTarget,
        ),
      );
      this.setState(() => ({
        overlayOpacity: nextOpacity,
      }));

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

OverlayTweenFromVisibility.propTypes = {
  fadeTime: PropTypes.number,
  isVisible: PropTypes.bool,
  render: PropTypes.func.isRequired,
};

OverlayTweenFromVisibility.defaultProps = {
  fadeTime: 3000,
};

const PlayableListener = ({ isAnimated, overlayOpacity, children }) => {
  const { animationIsRunning } = useContext(AnimationControllerContext);

  return (
    <>
      {children({
        playable: !animationIsRunning && isAnimated && overlayOpacity === 0.0,
      })}
    </>
  );
};

PlayableListener.propTypes = {
  isAnimated: PropTypes.bool.isRequired,
  overlayOpacity: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
};

const Visualization = ({
  isAnimated = true,
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
          <ClickToAnimate isVisible>
            <PlayableListener
              isAnimated={isAnimated}
              overlayOpacity={overlayOpacity}
            >
              {({ playable }) => (
                <PlayableVisualization
                  width={width}
                  height={height}
                  playable={playable}
                  curvedBottomCorners={!renderExtras}
                  {...props}
                >
                  {children}
                </PlayableVisualization>
              )}
            </PlayableListener>
          </ClickToAnimate>
        </TweenOverlayVisualization>
        {renderExtras && renderExtras({ width })}
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
const SizesForMediaQueries = Component => ({ queries, ...props }) => {
  const noMediaQuery =
    __SERVER__ || !window || Object.keys(window).indexOf('matchMedia') === -1;

  return (
    <div>
      {noMediaQuery ? (
        <div />
      ) : (
        queries.map(({ query, width, height }) => (
          <Media query={query} key={query}>
            {matches =>
              matches ? (
                <Component width={width} height={height} {...props} />
              ) : (
                <span />
              )
            }
          </Media>
        ))
      )}
    </div>
  );
};

SizesForMediaQueries.propTypes = {
  queries: PropTypes.arrayOf(
    PropTypes.shape({
      query: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  ).isRequired,
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

const OptionallySizedVisualization = props => (
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
const recordVisibilityMetric = Component => {
  // eslint-disable-next-line react/no-multi-comp
  class VisibilityMetricRecorder extends React.Component {
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
      if (!this.props.metrics) {
        return;
      }

      const title = this.props.title || 'Untitled Visualization';

      if (nextProps.isVisible && !this.props.isVisible) {
        this.props.metrics.track('becameVisible', { title });
      } else if (!nextProps.isVisible && this.props.isVisible) {
        this.props.metrics.track('becameInvisible', { title });
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  VisibilityMetricRecorder.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    metrics: PropTypes.object.isRequired,
    title: PropTypes.string,
  };

  return VisibilityMetricRecorder;
};

const ExposedMetricsVisualization = exposeMetrics(
  recordVisibilityMetric(OptionallySizedVisualization),
);

// eslint-disable-next-line react/no-multi-comp
export class BlankableVisualization extends React.Component {
  renderChild = ({ isVisible }) => (
    <ExposedMetricsVisualization {...this.props} isVisible={isVisible} />
  );

  render() {
    return <TrackVisibility offset={100}>{this.renderChild}</TrackVisibility>;
  }
}

BlankableVisualization.propTypes = {
  isAnimated: PropTypes.bool,
};

export default BlankableVisualization;
