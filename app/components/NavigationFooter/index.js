/*
 * NavigationFooter
 *
 * A component to provide pagination at the bottom of each article.
 */

import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import PropTypes from 'prop-types';

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #F4F5F7;
`;

const PaginationContainerChild = styled.div`
  flex: 1 1 auto;
  padding: 10px;

  a {
    text-decoration: none;
    color: #54516C;
    padding: 10px;
    border-radius: 2px;
  }

  a:hover {
    background-color: #EAECF0;
    color: #54516C;
  }
`;

const RightJustify = styled.div`
  text-align: right;
`;

const LeftJustify = styled.div`
  text-align: left;
`;

// eslint-disable-next-line react/prop-types
const PaginationChild = (Justifier) => ({ path, title }) => (
  <PaginationContainerChild>
    <Justifier>
      <Link to={path}>{title}</Link>
    </Justifier>
  </PaginationContainerChild>
);

PaginationChild.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const LeftJustifiedPaginationChild = PaginationChild(LeftJustify);
const RightJustifiedPaginationChild = PaginationChild(RightJustify);

const NavigationFooter = ({ prev, next }) => (
  <PaginationContainer>
    {prev && <LeftJustifiedPaginationChild path={prev.path} title={prev.title} />}
    {next && <RightJustifiedPaginationChild path={next.path} title={next.title} />}
  </PaginationContainer>
);

NavigationFooter.propTypes = {
  prev: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  next: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default NavigationFooter;
