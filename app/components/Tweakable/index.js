/*
 * Tweakable
 *
 * A component to tweak some underlying span by clicking and dragging on it.
 */

import React from 'react';

import styled from 'styled-components';

import PropTypes from 'prop-types';

import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import NumberEditor from 'react-number-editor';

const CenteredGlyphText = styled.span`
  text-align: center;
`;

const Tweakable = ({ begin, end, value, onChange, onClear, overridden, children, step = 0.01 }) => (
  <CenteredGlyphText>
    {children}
    <NumberEditor
      min={begin}
      max={end}
      value={value}
      decimals={2}
      onValueChange={(v) => onChange(Number(v))}
      step={step}
      style={{
        width: `${Math.max(String(value.toFixed(2)).length, 5) * 9}px`,
      }}
    />
    {overridden ? <EditorCloseIcon onClick={onClear} size="small" /> : <span />}
  </CenteredGlyphText>
);

Tweakable.propTypes = {
  begin: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  overridden: PropTypes.bool.isRequired,
  children: PropTypes.element,
  step: PropTypes.number,
};

export default Tweakable;
