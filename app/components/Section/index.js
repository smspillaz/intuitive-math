/*
 * Section
 *
 * A simple component for a section, with a header and some text.
 */

import React from 'react';

import { Grid, GridColumn } from '@atlaskit/page';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Padding = styled.div`
  margin: 0;
  padding-bottom: ${akGridSizeUnitless * 3}px;

  @media(min-width: 800px) {
    margin: ${akGridSizeUnitless * 4}px ${akGridSizeUnitless * 8}px;
  }
`;

const SectionContent = ({ children }) => (
  <Grid>
    <GridColumn>
      <Padding>{children}</Padding>
    </GridColumn>
  </Grid>
);

SectionContent.propTypes = {
  children: PropTypes.element.isRequired,
};

const Section = ({ title, anchor, children }) => (
  <div>
    <a  // eslint-disable-line jsx-a11y/anchor-has-content
      name={anchor}
      aria-hidden
    />
    <SectionContent>
      {title ? <h1>{title}</h1> : <span />}
      <div>
        {children}
      </div>
    </SectionContent>
  </div>
);

Section.propTypes = {
  title: PropTypes.string,
  anchor: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Section;
