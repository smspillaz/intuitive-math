import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import Footer from '../index';
import configureStore from '../../../configureStore';
import { HistoryContext } from '../../../utils/history';

describe('<Footer />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={store}>
          <HistoryContext.Provider>
            <IntlProvider locale="en">
              <Footer />
            </IntlProvider>
          </HistoryContext.Provider>
        </Provider>,
      )
      .toJSON();

    expect(renderedComponent).toMatchSnapshot();
  });
});
