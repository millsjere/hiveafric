import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'
import reducers from './reducers/reducers';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

