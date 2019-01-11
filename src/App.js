import React from 'react';
import { Provider } from 'react-redux';

import './config/reactotron';
import store from './store';

import 'font-awesome/css/font-awesome.css';
import './App.css';

import Mapbox from './components/mapbox';
import Lista from './components/Lista';

const App = () => (
  <Provider store={store}>
    <Mapbox />
    <Lista />
  </Provider>
);

export default App;
