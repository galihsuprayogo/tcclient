import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const App = () => {
  return (
      <View style={styles.container}>
        <Text> Lets start today </Text>
      </View>
  )
};

const styles = StyleSheet.create({
    container : {
      backgroundColor: '#E3D1BE',
      flex:1
    }
});
export default App;
