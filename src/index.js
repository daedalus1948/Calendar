import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store.js';

import App from './App';

import './static/css/main.css';

ReactDOM.render((
          <Provider store={store}>
              <App />
          </Provider>
  ), document.getElementById('root'));