/**
 *
 * MobilePage
 *
 * Page layout for vertical aspect ratios, with a top-aligned navigation bar.
 */

import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import NavigationItems from 'components/NavigationItems';

const MobileNavigationItemsDrawer = styled.div`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? 1 : 0)};
  transform: ${props =>
    props.visible ? 'translateY(0%)' : 'translateY(-2em)'};
  z-index: ${props => (props.visible ? 2 : -1)};
  background-color: white;
  transition: transform 0.3s cubic-bezier(0.75, -0.5, 0, 1.75),
    opacity 0.3s ease-in-out;
  position: absolute;
  width: 100%;
  padding-left: 20px;
  padding-bottom: 10px;
`;

MobileNavigationItemsDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
};

class MobileNavigationItemsDrawerState extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  toggleOpen = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    return this.props.render({
      open: this.state.open,
      toggleOpen: this.toggleOpen,
    });
  }
}

MobileNavigationItemsDrawerState.propTypes = {
  render: PropTypes.func.isRequired,
};

const FlexboxRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
`;

const FlexboxFill = styled.div`
  width: auto;
  flex: 1;
`;

const RightJustifiedButton = styled.div`
  margin: auto;
  padding-right: 10px;
`;

const HiddenOnDesktop = styled.div`
  @media (min-width: 1500px) {
    visibility: hidden;
  }
`;

export const MobileNavigator = ({ title, sections }) => (
  <HiddenOnDesktop>
    <MobileNavigationItemsDrawerState
      render={({ open, toggleOpen }) => (
        <div>
          <FlexboxRow>
            <RightJustifiedButton>
              <MenuIcon onClick={toggleOpen} />
            </RightJustifiedButton>
          </FlexboxRow>
          <MobileNavigationItemsDrawer visible={open}>
            <NavigationItems sections={sections} onActivate={toggleOpen} />
          </MobileNavigationItemsDrawer>
        </div>
      )}
    />
  </HiddenOnDesktop>
);

MobileNavigator.propTypes = {
  title: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
};

const MobilePage = ({ children, ...props }) => (
  <div>
    <MobileNavigator {...props} />
    {children}
  </div>
);

MobilePage.propTypes = {
  children: PropTypes.arrayOf(PropTypes.children),
};

export default MobilePage;
