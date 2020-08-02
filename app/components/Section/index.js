/*
 * Section
 *
 * A simple component for a section, with a header and some text.
 */

import React from 'react';

import PropTypes from 'prop-types';

const SectionContent = ({ children }) => <div>{children}</div>;

SectionContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

const Section = ({ title, anchor, children }) => (
  <div>
    <a // eslint-disable-line jsx-a11y/anchor-has-content jsx-a11y/anchor-is-valid
      name={anchor}
      aria-hidden
    />
    <SectionContent>
      {title ? <h1>{title}</h1> : <span />}
      <div>{children}</div>
    </SectionContent>
  </div>
);

Section.propTypes = {
  title: PropTypes.string,
  anchor: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Section;
