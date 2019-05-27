import React from 'react';
import { createBrowserHistory, createMemoryHistory } from 'history';

const history = __SERVER__ ? createMemoryHistory() : createBrowserHistory();
export default history;

const HistoryContext = React.createContext({
  location: null,
});

export { HistoryContext };
