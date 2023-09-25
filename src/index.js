import React from 'react';
import ReactDOM from 'react-dom/client';
import store from 'util/reducer/store';
import { Provider } from 'react-redux';
import App from './App';

import 'stylesheet/App.scss';
import 'stylesheet/Profile.scss';
import 'stylesheet/Reactive.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
