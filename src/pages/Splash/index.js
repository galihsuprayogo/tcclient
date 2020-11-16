import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ILUsd } from '../../assets/illustration';
import { colors } from '../../utils';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('UnsignedApp');
    }, 1000);
  }, [navigation]);
  return (
    <View style={styles.wrapper}>
      <Image source={ILUsd} style={{ height: 165, width: 170 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});
export default Splash;
