import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../..';
import { fonts, colors } from '../../../utils';

const ButtonNavigator = ({ title, icon, onPress }) => (
  <View style={styles.editWrapper}>
    <Text style={styles.textWrapper}>
      {' '}
      {title}
      {' '}
    </Text>
    <Button
      type="icon-button"
      icon={icon}
      onPress={onPress}
    />
  </View>
);

const styles = StyleSheet.create({
  editWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 30,
  },
  textWrapper: {
    fontFamily: fonts.sfProDisplay.semiBoldItalic,
    color: colors.text.default,
    fontSize: 16,
  },
});

export default ButtonNavigator;
