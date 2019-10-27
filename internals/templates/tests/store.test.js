/**
 * Test store addons
 */

<<<<<<< HEAD
import { createMemoryHistory } from 'history';
=======
>>>>>>> 6dcfafb... Fix react-router-dom imports in tests (#2791)
import configureStore from '../configureStore';

describe('configureStore', () => {
  let memoryHistory;
  let store;

  beforeAll(() => {
<<<<<<< HEAD
    memoryHistory = createMemoryHistory();
    store = configureStore({}, memoryHistory);
=======
    store = configureStore({});
>>>>>>> 6dcfafb... Fix react-router-dom imports in tests (#2791)
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
      expect(typeof store.runSaga).toEqual('function');
    });
  });
});
