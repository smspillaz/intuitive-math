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
import MathJax from 'react-mathjax';
import { Vector3 } from 'three';

import AxisVisualization3D from 'components/AxisVisualization3D';
import InterpolatedAnimation, {
  sineInterpolator,
  cosineInterpolator,
} from 'components/InterpolatedAnimation';
import Section from 'components/Section';
import Tweakable from 'components/Tweakable';
import Vector from 'components/Vector';
import { TweakablesBox } from 'components/Visualization';

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
          <InterpolatedAnimation
            values={{
              xPosition: { begin: -1, end: 1, interpolator: sineInterpolator },
              yPosition: {
                begin: -1,
                end: 1,
                interpolator: cosineInterpolator,
              },
              zPosition: { begin: -1, end: 1, interpolator: sineInterpolator },
            }}
            render={({ xPosition, yPosition, zPosition }) => (
              <div>
                <AxisVisualization3D
                  title="Home page visualization"
                  render={() => (
                    <group>
                      <Vector
                        position={
                          new Vector3(
                            xPosition.value,
                            yPosition.value,
                            zPosition.value,
                          )
                        }
                        color={0xff8800}
                      />
                      <Vector
                        position={
                          new Vector3(
                            xPosition.value,
                            yPosition.value,
                            zPosition.value,
                          )
                        }
                        base={new Vector3(0, yPosition.value, zPosition.value)}
                        color={0xff8800}
                      />
                      <Vector
                        position={
                          new Vector3(
                            xPosition.value,
                            yPosition.value,
                            zPosition.value,
                          )
                        }
                        base={new Vector3(xPosition.value, 0, zPosition.value)}
                        color={0xff8800}
                      />
                      <Vector
                        position={
                          new Vector3(
                            xPosition.value,
                            yPosition.value,
                            zPosition.value,
                          )
                        }
                        base={new Vector3(0, yPosition.value, zPosition.value)}
                        color={0xff8800}
                      />
                    </group>
                  )}
                  renderExtras={({ width }) => (
                    <TweakablesBox width={width}>
                      <div>
                        <Tweakable {...xPosition}>
                          <MathJax.Node inline formula="x =" />{' '}
                        </Tweakable>
                      </div>
                      <div>
                        <Tweakable {...yPosition}>
                          <MathJax.Node inline formula="y =" />{' '}
                        </Tweakable>
                      </div>
                      <div>
                        <Tweakable {...zPosition}>
                          <MathJax.Node inline formula="z =" />{' '}
                        </Tweakable>
                      </div>
                    </TweakablesBox>
                  )}
                />
              </div>
            )}
          />
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
