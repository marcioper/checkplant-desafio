import React from 'react';

import FlashMessage from 'react-native-flash-message';

import '~/config/ReactotronConfig';

import {Provider} from 'react-redux';
import store from './store';

import Routes from '~/routes';

const App = () => (
  <>
    <Provider store={store}>
      <Routes />
    </Provider>
    <FlashMessage position="top" />
  </>
);

export default App;
