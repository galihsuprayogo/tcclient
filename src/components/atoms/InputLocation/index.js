import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Gap } from '../..';
import { fonts, colors } from '../../../utils';

const InputLocation = ({ type, icon, text }) => (
  <View style={styles.test}>
    <Icon icon={icon} />
    <Gap width={5} />
    <Text style={styles.text(type)}>
      {''}
      {text}
      {''}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  test: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: (type) => ({
    fontFamily: type === 'text1' ? fonts.sfProDisplay.heavy : fonts.sfProDisplay.medium,
    color: type === 'text1' ? colors.text.default : colors.text.third,
    fontSize: type === 'text1' ? 15 : 13,
    paddingVertical: 7,
    maxWidth: 280,
    borderTopWidth: type === 'text1' ? 0 : 1 / 2,
  }),
});
export default InputLocation;
