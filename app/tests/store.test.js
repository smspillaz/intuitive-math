/**
 * Test store addons
 */

import { createMemoryHistory } from 'history';
import configureStore from '../configureStore';

describe('configureStore', () => {
  let memoryHistory;
  let store;

  beforeAll(() => {
    memoryHistory = createMemoryHistory();
    store = configureStore({}, memoryHistory);
  });

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof store.injectedReducers).toBe('object');
    });
  });

  describe('injectedSagas', () => {
    it('should contain an object for sagas', () => {
      expect(typeof store.injectedSagas).toBe('object');
    });
  });

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof store.runSaga).toBe('function');
    });
  });
});

describe('configureStore params', () => {
  let memoryHistory;

  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    /* eslint-disable no-underscore-dangle */
    const compose = jest.fn();
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => compose;
    memoryHistory = createMemoryHistory();
    configureStore(undefined, memoryHistory);
    expect(compose).toHaveBeenCalled();
    /* eslint-enable */
  });
});
