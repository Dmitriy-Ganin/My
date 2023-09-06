import React from 'react';
import { createRoot } from 'react-dom/client';
//чтобы передавать через контекст...не через пропс
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { ticketReducer } from './Reducer/get-ticket-reducer';
import { App } from './component/App/App';

const rootReducer = combineReducers({
  ticketReducer,
});

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log('Middleware', store.getState());
  return result;
};

export const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, reduxThunk));

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
