/*
 * InterpolatedAnimation
 *
 * Animate a few variables and keep track of their animation states.
 */

import React from 'react';

import PropTypes from 'prop-types';

import Animation from 'components/Animation';

const sineInterpolator = (begin, end, value, time) => {
  const wave = (Math.sin(time * 0.05) + 1) / 2;
  return (end - begin) * wave + begin;
};

const cosineInterpolator = (begin, end, value, time) => {
  const wave = (Math.cos(time * 0.05) + 1) / 2;
  return (end - begin) * wave + begin;
};

const lookupInterpolator = (values, key) =>
  values[key].interpolator || sineInterpolator;

const interpolateValue = (values, key, value, time) =>
  lookupInterpolator(values, key)(
    values[key].begin,
    values[key].end,
    value,
    time,
  );

export default class InterpolatedAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: Object.keys(this.props.values).reduce(
        (acc, key) => ({
          ...acc,
          [key]: {
            override: null,
          },
        }),
        {},
      ),
    };
    this.manualRenderCallback = null;
    this.updateHandlerMap(props);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.values) !== Object.keys(this.props.values)) {
      this.updateHandlerMap(nextProps);
    }
  }

  handleChange = (key, value) => {
    /* Check if we really need to call setState here */
    if (this.state.values[key].override === value) {
      return;
    }

    this.setState(state => ({
      values: {
        ...state.values,
        [key]: {
          override: value,
        },
      },
    }));

    /* If the state changed, we need to queue a dependent
     * manual re-render, since that might not happen on its
     * own just by updating state. */
    if (this.manualRenderCallback) {
      this.manualRenderCallback();
    }
  };

  handleClear = key =>
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: {
          override: null,
        },
      },
    }));

  handleRegisterManualRenderCallback = callback => {
    this.manualRenderCallback = callback;
  };

  updateHandlerMap(props) {
    this.handlers = Object.keys(props.values).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          onChange: value => this.handleChange(key, value),
          onClear: () => this.handleClear(key),
        },
      }),
      {},
    );
  }

  render() {
    return (
      <Animation
        initial={{
          values: Object.keys(this.props.values).reduce(
            (acc, key) => ({
              ...acc,
              [key]: this.props.values[key].begin,
            }),
            {},
          ),
          time: 0,
        }}
        update={state => {
          const time = state.time + 1;
          return {
            values: Object.keys(this.props.values).reduce(
              (acc, key) => ({
                ...acc,
                [key]: interpolateValue(
                  this.props.values,
                  key,
                  state.values[key],
                  time,
                ),
              }),
              {},
            ),
            time,
          };
        }}
        render={state =>
          this.props.render(
            Object.keys(state.values).reduce(
              (acc, key) => ({
                ...acc,
                [key]: {
                  value:
                    this.state.values[key].override !== null
                      ? this.state.values[key].override
                      : state.values[key],
                  begin: this.props.values[key].begin,
                  end: this.props.values[key].end,
                  onChange: this.handlers[key].onChange,
                  onClear: this.handlers[key].onClear,
                  overridden: this.state.values[key].override !== null,
                },
              }),
              {},
            ),
          )
        }
        onRegisterManualRenderCallback={this.handleRegisterManualRenderCallback}
      />
    );
  }
}

InterpolatedAnimation.propTypes = {
  values: (props, propName, componentName) => {
    const validator = {
      begin: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(props[propName])) {
      // eslint-disable-next-line no-restricted-syntax
      for (const subPropName of ['begin', 'end']) {
        const error = PropTypes.checkPropTypes(
          validator,
          props[propName][key],
          subPropName,
          componentName,
        );

        if (error !== null) {
          return error;
        }
      }
    }

    return null;
  },
  render: PropTypes.func.isRequired,
};

export { cosineInterpolator, sineInterpolator };
