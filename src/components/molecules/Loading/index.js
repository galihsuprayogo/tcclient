import React from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator
} from 'react-native';
import { colors, fonts } from '../../../utils';

const Loading = () => (
   <View style={styles.wrapper}>
          <ActivityIndicator size="large" color={colors.loading} />
          <Text style={styles.text}>sedang menunggu...</Text>
   </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.loadingBackground,
    height: '100%',
    width: '100%'
  },
  text: {
    fontFamily: fonts.Akkurat.boldItalic,
    fontSize: 17,
    marginTop: 8,
    color: colors.loading
  }
});
export default Loading;
