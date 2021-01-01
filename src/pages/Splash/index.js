import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Image, AsyncStorage
} from 'react-native';
import { ILUsd } from '../../assets/illustration';
import { colors } from '../../utils';
import { service } from '../../config';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = async () => {
      const id = await AsyncStorage.getItem('@id');
      await service.post('/api/auth/session', {
        user_id: id
      }).then((response) => {
        const sess = response.data.session;
        if (sess === 1) {
          navigation.replace('DrawerApp');
        } else {
          navigation.replace('UnsignedApp');
        }
      }).catch((error) => {
        console.log(error);
      });
    };
    unsubscribe();
  }, []);

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
