import React from 'react';
import { useStore, ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';
import { HistoryContext } from './history';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }) => WrappedComponent => {
  const ReducerInjector = props => {
    const store = React.useContext(ReactReduxContext);
    const history = React.useContext(HistoryContext);
    const [injectedReducer, setInjectedReducer] = React.useState(false);

    if (!injectedReducer) {
      getInjectors(store, history).injectReducer(key, reducer);
      setInjectedReducer(true);
    }

    return <WrappedComponent {...props} />;
  };

  ReducerInjector.displayName = `withReducer(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  return ReducerInjector;
};

const useInjectReducer = ({ key, reducer }) => {
  const store = useStore();
  const history = React.useContext(HistoryContext);

  React.useEffect(() => {
    getInjectors(store, history).injectReducer(key, reducer);
  }, []);
};

export { useInjectReducer };
