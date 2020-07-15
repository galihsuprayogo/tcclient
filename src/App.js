import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import FlashMessage from "react-native-flash-message";

const App = () => {
  return (
      <>
          <NavigationContainer>
              <Router/>
          </NavigationContainer>
          <FlashMessage positon="top" />
      </>
  );
};

export default App;

