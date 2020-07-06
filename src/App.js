import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Splash} from './pages';

const App = () => {
  return (
      <View style={styles.wrapper}>
        <Splash/>
      </View>
  )
}

const styles = StyleSheet.create({
  wrapper :{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : '#E3D1BE'
  }
});
export default App;

