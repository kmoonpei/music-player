import React from 'react';
import { Provider } from 'react-redux';
import Routers from './routes';
import configuretore from './store/configureStore';
const store = configuretore();

const App = () => (
  <Provider store={store}>
    <Routers />
  </Provider>
)

export default App;
