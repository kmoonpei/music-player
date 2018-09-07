import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routers from './routes';
import store from './store/configureStore';

const App = () => (
  <Provider store={store}>
    <Routers />
  </Provider>
)

export default App;
