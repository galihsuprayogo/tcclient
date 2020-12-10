import React from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';
import { colors, fonts } from '../../../utils';

const Input = ({
  placeholder, keyboardType, label, type,
}) => (
  <View>
    {label && (
    <Text style={styles.label}>
      {' '}
      {label}
      {' '}
    </Text>
    )}
    <TextInput
      style={styles.input(type)}
      placeholder={placeholder}
      placeholderTextColor={colors.primary}
      keyboardType={keyboardType}
      maxLength={12}
    />
  </View>
);

const styles = StyleSheet.create({
  input: (type) => ({
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.secondary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: type === 'inputForm' ? colors.text.secondary : 'white',
    color: colors.text.default,
  }),
  label: {
    fontFamily: fonts.sfProDisplay.heavy,
    color: colors.text.default,
    fontSize: 16,
    marginBottom: 6,
  },
});
export default Input;
