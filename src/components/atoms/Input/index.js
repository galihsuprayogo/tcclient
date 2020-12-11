import React from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';
import { Icon, Gap } from '../..';
import { colors, fonts } from '../../../utils';

const Input = ({
  placeholder, keyboardType, label, type, scope, icon
}) => {
  const IconI = () => <Icon icon={icon} />;
  return (
    <View>
      {label && (
      <Text style={styles.label(scope)}>
        {' '}
        {label}
        {' '}
      </Text>
      )}
      <View style={styles.divInput(type)}>
        <IconI />
        <Gap width={10} />
        <TextInput
          style={styles.input(scope)}
          placeholder={placeholder}
          placeholderTextColor={colors.primary}
          keyboardType={keyboardType}
          maxLength={12}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: (scope) => ({
    flex: 1,
    paddingVertical: scope === 'sign-up' ? 9 : 5,
    color: colors.text.default,
  }),
  divInput: (type) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: type === 'inputForm' ? colors.text.secondary : 'white',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.secondary,
    paddingHorizontal: 12,
  }),
  label: (scope) => ({
    fontFamily: fonts.sfProDisplay.heavy,
    color: scope === 'umkm' ? colors.primary : colors.text.default,
    fontSize: 16,
    marginBottom: 6,
  }),
});
export default Input;
