/**
 * Test the HomePage
 */

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import * as appActions from 'containers/App/actions';
import configureStore from '../../../configureStore';
import HomePage from '../index';
import { initialState } from '../reducer';
import { changeUsername } from '../actions';

const renderHomePage = (store, memoryHistory) =>
  render(
    <HistoryContext.Provider value={memoryHistory}>
      <Provider store={store}>
        <IntlProvider locale="en">
          <HelmetProvider>
            <HomePage />
          </HelmetProvider>
        </IntlProvider>
      </Provider>
    </HistoryContext.Provider>,
  );

describe('<HomePage />', () => {
  let store;
  let memoryHistory;

  beforeAll(() => {
    // loadRepos is mocked so that we can spy on it but also so that it doesn't trigger a network request
    appActions.loadRepos = jest.fn(() => ({ type: '' }));
  });

  beforeEach(() => {
    store = configureStore({});
    appActions.loadRepos.mockClear();
  });

  afterEach(cleanup);

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderHomePage(store, memoryHistory);
    expect(firstChild).toMatchSnapshot();
  });

  it("shouldn't fetch repos on mount (if username is empty)", () => {
    renderHomePage(store, memoryHistory);
    expect(initialState.username).toBe('');
    expect(appActions.loadRepos).not.toHaveBeenCalled();
  });

  it("shouldn't fetch repos if the form is submitted when the username is empty", () => {
    const { container } = renderHomePage(store, memoryHistory);

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(appActions.loadRepos).not.toHaveBeenCalled();
  });

  it("should fetch repos if the form is submitted when the username isn't empty", () => {
    const { container } = renderHomePage(store, memoryHistory);

    store.dispatch(changeUsername('julienben'));

    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'julienben' } });
    expect(appActions.loadRepos).not.toHaveBeenCalled();

    const form = container.querySelector('form');
    fireEvent.submit(form);
    expect(appActions.loadRepos).toHaveBeenCalled();
  });
});
