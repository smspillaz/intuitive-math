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
  return (end - begin) * (wave + begin);
};

const cosineInterpolator = (begin, end, value, time) => {
  const wave = (Math.cos(time * 0.05) + 1) / 2;
  return (end - begin) * (wave + begin);
};

const lookupInterpolator = (values, key) => (
  values[key].interpolator || sineInterpolator
);

const interpolateValue = (values, key, value, time) =>
  lookupInterpolator(values, key)(values[key].begin, values[key].end, value, time);

export default class InterpolatedAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: Object.keys(this.props.values).reduce((acc, key) =>
        ({
          ...acc,
          [key]: {
            override: null,
          },
        }),
        {},
      ),
    };
  }

  render() {
    return (
      <Animation
        initial={{
          values: Object.keys(this.props.values).reduce((acc, key) =>
            ({
              ...acc,
              [key]: this.props.values[key].begin,
            }),
            {},
          ),
          time: 0,
        }}
        update={(state) => {
          const time = state.time + 1;
          return {
            values: Object.keys(this.props.values).reduce((acc, key) =>
              ({
                ...acc,
                [key]: interpolateValue(this.props.values,
                                        key,
                                        state.values[key],
                                        time),
              }),
              {},
            ),
            time,
          };
        }}
        render={(state) =>
          this.props.render(Object.keys(state.values).reduce((acc, key) =>
            ({
              ...acc,
              [key]: {
                value: state.values[key],
              },
            }),
            {},
          ))
        }
      />
    );
  }
}

InterpolatedAnimation.propTypes = {
  values: PropTypes.shape({
    begin: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  render: PropTypes.func.isRequired,
};

export {
  cosineInterpolator,
  sineInterpolator,
};
