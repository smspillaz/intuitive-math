/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import MathJax from 'react-mathjax';
import { Vector3 } from 'three';

import AxisVisualization3D from 'components/AxisVisualization3D';
import InterpolatedAnimation, { sineInterpolator, cosineInterpolator } from 'components/InterpolatedAnimation';
import Section from 'components/Section';
import Tweakable from 'components/Tweakable';
import Vector from 'components/Vector';

import injectReducer from 'utils/injectReducer';

import reducer from './reducer';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div>
          <MathJax.Context>
            <Section title="Intuitive Math Primer" anchor="intuitive">
              <p>
                This is a math primer that is a little different. It is written
                using technologies such as React and WebGL with animated explanations
                of fields like Linear Algebra, designed to help you develop a
                visual intuition for what is going on.
              </p>
              <InterpolatedAnimation
                values={{
                  xPosition: { begin: -1, end: 1, interpolator: sineInterpolator },
                  yPosition: { begin: -1, end: 1, interpolator: cosineInterpolator },
                  zPosition: { begin: -1, end: 1, interpolator: sineInterpolator },
                }}
                render={({ xPosition, yPosition, zPosition }) => (
                  <div>
                    <AxisVisualization3D
                      render={() => (
                        <group>
                          <Vector
                            position={new Vector3(xPosition.value, yPosition.value, zPosition.value)}
                            color={0xff8800}
                          />
                          <Vector
                            position={new Vector3(xPosition.value, yPosition.value, zPosition.value)}
                            base={new Vector3(0, yPosition.value, zPosition.value)}
                            color={0xff8800}
                          />
                          <Vector
                            position={new Vector3(xPosition.value, yPosition.value, zPosition.value)}
                            base={new Vector3(xPosition.value, 0, zPosition.value)}
                            color={0xff8800}
                          />
                          <Vector
                            position={new Vector3(xPosition.value, yPosition.value, zPosition.value)}
                            base={new Vector3(0, yPosition.value, zPosition.value)}
                            color={0xff8800}
                          />
                        </group>
                      )}
                    />
                    <div>
                      <Tweakable {...xPosition}>
                        <MathJax.Node inline>{'x ='}</MathJax.Node>{' '}
                      </Tweakable>
                    </div>
                    <div>
                      <Tweakable {...yPosition}>
                        <MathJax.Node inline>{'y ='}</MathJax.Node>{' '}
                      </Tweakable>
                    </div>
                    <div>
                      <Tweakable {...zPosition}>
                        <MathJax.Node inline>{'z ='}</MathJax.Node>{' '}
                      </Tweakable>
                    </div>
                  </div>
                )}
              />
              <p>
                The visualizations are partially interactive. They are done on
                sine-wave interpolations by default, but if a value is shown
                below the visualisation, in some cases, you can manually adjust it
                by dragging it from side to side, or just double-clicking an editing
                it. Animation will stop for that value as soon as you edit it, and you
                can undo the stopped animation by clicking the close button:
                <EditorCloseIcon size="small" />.
              </p>
              <p>
                Note that due to the limit on the number of concurrently running
                WebGL contexts implemented by most browsers, I have tried to use
                some smarts to disable contexts when they are not fully in view. So far,
                I have tested that this worked on Chrome and Firefox Quantum.
              </p>
              <h2>Why did you write this?</h2>
              <p>
                I mainly wrote this to help me consolidate my own notes on the
                subjects since I personally have a hard time instantly developing
                an intuition for math. And without the intuition, I have a hard time
                applying math to problems because I will not know what the tools
                are actually for.
              </p>
              <h2>Corrections, Errata</h2>
              <p>
                Given that I am not an expert in this area, its possible that
                I probably got something wrong. If you notice something
                that seems odd, you can reach me at s AT polysquare DOT org. Or,
                the code is open source, so you can just submit a{' '}
                <a href="https://github.com/smspillaz/intuitive-math">pull request</a>.
              </p>
            </Section>
          </MathJax.Context>
        </div>
      </article>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, null);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePage);
