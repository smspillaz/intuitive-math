/**
 * Test injectors
 */

import { createMemoryHistory } from 'history';
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import configureStore from '../../configureStore';
import injectReducer, { useInjectReducer } from '../injectReducer';
import * as reducerInjectors from '../reducerInjectors';

import { HistoryContext } from '../history';

// Fixtures
const Component = () => null;

const reducer = s => s;

const ProvideHistoryAndStore = ({ history, store, children }) => (
  <HistoryContext.Provider value={history}>
    <Provider store={store}>{children}</Provider>
  </HistoryContext.Provider>
);

ProvideHistoryAndStore.propTypes = {
  history: PropTypes.object,
  store: PropTypes.object,
  children: PropTypes.node,
};

describe('injectReducer decorator', () => {
  let memoryHistory;
  let store;
  let injectors;
  let ComponentWithReducer;

  beforeAll(() => {
    reducerInjectors.default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    memoryHistory = createMemoryHistory();
    store = configureStore({}, memoryHistory);
    injectors = {
      injectReducer: jest.fn(),
    };
    ComponentWithReducer = injectReducer({ key: 'test', reducer })(Component);
    reducerInjectors.default.mockClear();
  });

  it('should inject a given reducer', () => {
    renderer.create(
      <ProvideHistoryAndStore history={memoryHistory} store={store}>
        <ComponentWithReducer />
      </ProvideHistoryAndStore>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });

  it('should set a correct display name', () => {
    expect(ComponentWithReducer.displayName).toBe('withReducer(Component)');
    expect(
      injectReducer({ key: 'test', reducer })(() => null).displayName,
    ).toBe('withReducer(Component)');
  });

  it('should propagate props', () => {
    const props = { testProp: 'test' };
    const renderedComponent = renderer.create(
      <ProvideHistoryAndStore history={memoryHistory} store={store}>
        <ComponentWithReducer {...props} />
      </ProvideHistoryAndStore>,
    );
    const {
      root: {
        props: { children },
      },
    } = renderedComponent;

    expect(children.props).toEqual(props);
  });
});

describe('useInjectReducer hook', () => {
  let store;
  let memoryHistory;
  let injectors;
  let ComponentWithReducer;

  beforeAll(() => {
    injectors = {
      injectReducer: jest.fn(),
    };
    reducerInjectors.default = jest.fn().mockImplementation(() => injectors);
    memoryHistory = createMemoryHistory();
    store = configureStore({}, memoryHistory);
    ComponentWithReducer = () => {
      useInjectReducer({ key: 'test', reducer });
      return null;
    };
  });

  it('should inject a given reducer', () => {
    render(
      <ProvideHistoryAndStore history={memoryHistory} store={store}>
        <ComponentWithReducer />
      </ProvideHistoryAndStore>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });
});
