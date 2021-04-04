import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, BackHandler
} from 'react-native';
import { Header } from '../../components';
import { colors, fonts } from '../../utils';

const Help = ({ navigation }) => {
  useEffect(() => {
    BackHandler.addEventListener('backPress', onBackHandling);
    return () =>
      BackHandler.removeEventListener('backPress', onBackHandling);
  });

  const onBackHandling = () => {
    BackHandler.exitApp();
  };
  return (
    <View style={styles.container}>
         <Header
           title="Bantuan"
           type="icon-button"
           icon="open-drawer"
           width={24}
           onPress={() => navigation.openDrawer()}
         />
         <View style={styles.content}>
            <Text style={styles.text}> Halaman belum tersedia </Text>
         </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: fonts.Akkurat.bold,
    fontSize: 25
  }
});

export default Help;
