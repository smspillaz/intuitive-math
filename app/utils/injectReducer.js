import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useStore, ReactReduxContext } from 'react-redux';

import { combineContexts } from 'react-combine-contexts';

import getInjectors from './reducerInjectors';
import { HistoryContext } from './history';

const ReactReduxHistoryContext = combineContexts({
  store: ReactReduxContext,
  history: HistoryContext,
});

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    constructor(props, context) {
      super(props, context);

      getInjectors(context.store.store, context.history.history).injectReducer(
        key,
        reducer,
      );
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  ReducerInjector.displayName = `withReducer(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  ReducerInjector.WrappedComponent = WrappedComponent;

  ReducerInjector.contextType = ReactReduxHistoryContext;

  ReducerInjector.displayName = `withReducer(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};

const useInjectReducer = ({ key, reducer }) => {
  const store = useStore();
  const history = React.useContext(HistoryContext);

  const isInjected = React.useRef(false);

  if (!isInjected.current) {
    getInjectors(store, history).injectReducer(key, reducer);
    isInjected.current = true;
  }
};

export { useInjectReducer };
