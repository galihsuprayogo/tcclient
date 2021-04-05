import React from 'react';
import { YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux';
import Router from './router';
import { Loading, Intro } from './components';

const MainApp = () => {
  const stateGlobal = useSelector((state) => state.loadingReducer);
  YellowBox.ignoreWarnings(['Setting a timer']);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      { stateGlobal.loading && <Loading />}
    </>
  );
};

const SecondApp = () => {
  const stateGlobalIntro = useSelector((state) => state.introReducer);
  if (stateGlobalIntro.status) {
    return <MainApp />;
  }
  return <Intro />;
};

const App = () => (
  <Provider store={store}>
    <SecondApp />
  </Provider>
);

export default App;
