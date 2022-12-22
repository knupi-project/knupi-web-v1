import React from 'react';
import ReactDOM from 'react-dom/client';
import store from 'util/reducer/store';
import { Provider } from 'react-redux';
import App from './components/App';

import 'stylesheet/App.scss';
import 'stylesheet/Profile.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
