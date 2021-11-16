import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {Fire} from './config';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  Fire;
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
};

export default App;
