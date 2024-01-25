import {View, Text} from 'react-native';
import React from 'react';
import RootNavigator from './Navigations/RootNavigator';
import {Provider} from 'react-redux';
import Store from './Redux/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
