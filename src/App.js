import React from 'react';
import {LogBox} from 'react-native';
import Router from './router';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {Loading} from './components';

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  LogBox.ignoreLogs([
    '@firebase/database: FIREBASE WARNING: Using an unspecified index',
    'Selector unknown returned the root state when called. This can lead to unnecessary rerenders.',
    'AsyncStorage has been extracted from react-native core and will be removed in a future release',
  ]);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
