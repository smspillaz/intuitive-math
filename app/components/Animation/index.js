import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const AnimationContext = createContext({
  onAnimationFrame: null,
});

const Animation = ({ render }) => {
  const { onAnimationFrame } = useContext(AnimationContext);

  const handleFrame = () => {
    if (onAnimationFrame) {
      onAnimationFrame();
    }
  };

  return (
    <AnimationContext.Provider
      value={{
        onAnimationFrame: handleFrame,
      }}
    >
      {render()}
    </AnimationContext.Provider>
  );
};

Animation.propTypes = {
  render: PropTypes.func.isRequired,
};

export default Animation;
