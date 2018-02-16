import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Media from 'react-media';
import TrackVisibility from 'react-on-screen';
import React3 from 'react-three-renderer';
import { Vector3 } from 'three';

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

const TweenOverlayVisualization = ({ width, height, rotation, position, matrix, children, overlayOpacity }) => (
  <Centered>
    <OverlayParent>
      {overlayOpacity !== 1.0 ? (
        <React3
          mainCamera="camera" // this points to the perspectiveCamera below
          width={width}
          height={height}
          canvasStyle={{
            borderRadius: '1em',
          }}
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
      ) : <Box width={width} height={height} opacity={1.0} />}
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
  children: PropTypes.element,
};

class Visualization extends React.Component {
  static propTypes = {
    animationIsRunning: PropTypes.bool,
    fadeTime: PropTypes.number,
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
    if (nextProps.animationIsRunning !== this.props.animationIsRunning) {
      if (nextProps.animationIsRunning) {
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
    {queries.map(({ query, width, height }) => (
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

export const BlankableVisualization = (props) => (
  <TrackVisibility offset={100}>
    {({ isVisible }) => <OptionallySizedVisualization {...props} animationIsRunning={isVisible} />}
  </TrackVisibility>
);

const BlankableByContextVisualization = (props, { animationIsRunning = true }) => (
  <OptionallySizedVisualization animationIsRunning={animationIsRunning} {...props} />
);

BlankableByContextVisualization.contextTypes = {
  animationIsRunning: PropTypes.bool,
};

export default BlankableByContextVisualization;
