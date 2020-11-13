/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import styled from 'styled-components';

import CDNMathJaxContext from 'components/CDNMathJaxContext';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

import AxisVisualization3D from 'components/AxisVisualization3D';
import {
  InterpolatedAnimationGroup,
  sineInterpolator,
  cosineInterpolator,
} from 'components/InterpolatedAnimation';
import Section from 'components/Section';
import Vector from 'components/Vector';

import logo from '../../images/banner.png';

const ImageBanner = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const HomePage = () => (
  <article>
    <Helmet>
      <title>Home Page</title>
      <meta name="description" content="Intuitive Math Descriptions" />
    </Helmet>
    <div>
      <CDNMathJaxContext>
        <Section anchor="intuitive">
          <ImageBanner>
            <img src={logo} alt="Intuitive Math Banner Logo" />
          </ImageBanner>
          <p>
            This is a math primer that is a little different. It is written
            using technologies such as React and WebGL with animated
            explanations of fields like Linear Algebra and Geometry designed to
            help you develop a visual intuition for what is going on. More
            fields will be added as time goes on.
          </p>
          <div>
            <AxisVisualization3D
              title="Home page visualization"
              render={() => (
                <InterpolatedAnimationGroup
                  values={{
                    xPosition: {
                      begin: -1,
                      end: 1,
                      interpolator: sineInterpolator,
                    },
                    yPosition: {
                      begin: -1,
                      end: 1,
                      interpolator: cosineInterpolator,
                    },
                    zPosition: {
                      begin: -1,
                      end: 1,
                      interpolator: sineInterpolator,
                    },
                  }}
                  render={({ state }) => (
                    <group>
                      <Vector
                        update={({ position }) => {
                          position.x = state.xPosition.value;
                          position.y = state.yPosition.value;
                          position.z = state.zPosition.value;
                        }}
                        color={0xff8800}
                      />
                      <Vector
                        update={({ base, position }) => {
                          position.x = state.xPosition.value;
                          position.y = state.yPosition.value;
                          position.z = state.zPosition.value;

                          base.y = state.yPosition.value;
                          base.z = state.zPosition.value;
                        }}
                        color={0xff8800}
                      />
                      <Vector
                        update={({ base, position }) => {
                          position.x = state.xPosition.value;
                          position.y = state.yPosition.value;
                          position.z = state.zPosition.value;

                          base.x = state.xPosition.value;
                          base.z = state.zPosition.value;
                        }}
                        color={0xff8800}
                      />
                    </group>
                  )}
                />
              )}
            />
          </div>
          <p>
            The visualizations are partially interactive. They are done on
            sine-wave interpolations by default, but if a value is shown below
            the visualisation, in some cases, you can manually adjust it by
            dragging it from side to side, or just double-clicking and editing
            it. Animation will stop for that value as soon as you edit it, and
            you can undo the stopped animation by clicking the close button:
            <CancelPresentationIcon size="small" label="Editor Close Icon" />.
          </p>
          <p>
            Note that due to the limit on the number of concurrently running
            WebGL contexts implemented by most browsers, I have tried to use
            some smarts to disable contexts when they are not fully in view. So
            far, I have tested that this worked on Chrome and Firefox Quantum.
          </p>
          <h2>Why did you write this?</h2>
          <p>
            I mainly wrote this to help me consolidate my own notes on the
            subjects since I personally have a hard time instantly developing an
            intuition for math. And without the intuition, I have a hard time
            applying math to problems because I will not know what the tools are
            actually for.
          </p>
          <h2>Corrections, Errata</h2>
          <p>
            Given that I am not an expert in this area, its possible that I
            probably got something wrong. If you notice something that seems
            odd, you can reach me at s AT polysquare DOT org. Or, the code is
            open source, so you can just submit a{' '}
            <a href="https://github.com/smspillaz/intuitive-math">
              pull request
            </a>
            .
          </p>
          <h2>Privacy</h2>
          <p>
            I use analytics providers such as Segment, Google Analytics and
            HotJar to get more information about what content and visualizations
            users are interacting with. If you are not happy about that, you can{' '}
            <a href="https://www.hotjar.com/legal/compliance/opt-out">
              opt out
            </a>{' '}
            of HotJar.
          </p>
        </Section>
      </CDNMathJaxContext>
    </div>
  </article>
);

export default HomePage;
