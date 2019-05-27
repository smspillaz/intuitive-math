import React from 'react';
import { render } from '@testing-library/react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { HistoryContext } from '../../../utils/history';
import LanguageProvider from '../index';
import configureStore from '../../../configureStore';

import { translationMessages } from '../../../i18n';

const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message',
  },
});

describe('<LanguageProvider />', () => {
  let memoryHistory;
  let store;

  beforeEach(() => {
    memoryHistory = createMemoryHistory();
    store = configureStore({}, memoryHistory);
  });

  it('should render its children', () => {
    const text = 'Test';
    const children = <h1>{text}</h1>;
    const { queryByText } = render(
      <HistoryContext.Provider value={memoryHistory}>
        <Provider store={store}>
          <LanguageProvider messages={messages} locale="en">
            {children}
          </LanguageProvider>
        </Provider>
      </HistoryContext.Provider>,
    );
    expect(queryByText(text)).toBeInTheDocument();
  });

  it('should render the default language messages', () => {
    const { queryByText } = render(
      <HistoryContext.Provider>
        <Provider store={store}>
          <LanguageProvider messages={translationMessages}>
            <FormattedMessage {...messages.someMessage} />
          </LanguageProvider>
        </Provider>
      </HistoryContext.Provider>,
    );
    expect(
      queryByText(messages.someMessage.defaultMessage),
    ).toBeInTheDocument();
  });
});
