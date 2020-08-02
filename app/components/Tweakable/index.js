/*
 * Tweakable
 *
 * A component to tweak some underlying span by clicking and dragging on it.
 */

import React from 'react';

import { exposeMetrics } from 'react-metrics';

import styled from 'styled-components';

import PropTypes from 'prop-types';

import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import NumberEditor from 'react-number-editor';

const CenteredGlyphText = styled.span`
  text-align: center;
`;

class Tweakable extends React.Component {
  constructor() {
    super();
    this.interactedWithTweakable = false;
  }

  recordInteractedWithTweakable() {
    if (!this.interactedWithTweakable) {
      if (this.props.metrics) {
        this.props.metrics.track('interactWithTweakable');
      }

      this.interactedWithTweakable = true;
    }
  }

  handleChange = v => {
    this.recordInteractedWithTweakable();
    this.props.onChange(Number(v));
  };

  render() {
    const {
      begin,
      end,
      value,
      onClear,
      overridden,
      children,
      step = 0.01,
    } = this.props;
    return (
      <CenteredGlyphText>
        {children}
        <NumberEditor
          min={begin}
          max={end}
          value={value}
          decimals={2}
          onValueChange={this.handleChange}
          step={step}
          style={{
            width: `${Math.max(String(value.toFixed(2)).length, 5) * 9}px`,
          }}
        />
        {overridden ? (
          <CancelPresentationIcon
            onClick={onClear}
            size="small"
            label="Close Editor"
          />
        ) : (
          <span />
        )}
      </CenteredGlyphText>
    );
  }
}

Tweakable.propTypes = {
  begin: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  metrics: PropTypes.object,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  overridden: PropTypes.bool.isRequired,
  children: PropTypes.any,
  step: PropTypes.number,
};

export default exposeMetrics(Tweakable);
