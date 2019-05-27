import React from 'react';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
export default history;

const HistoryContext = React.createContext({
  location: null,
});

export { HistoryContext };
