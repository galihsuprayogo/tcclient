import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from './IconButton.js';
import { colors, fonts } from '../../../utils';

const Button = ({
  type, title, icon, onPress, scope,
}) => {
  if (type === 'icon-button') {
    return <IconButton icon={icon} onPress={onPress} />;
  }

  return (
    <TouchableOpacity style={styles.container(scope)} onPress={onPress}>
      <Text style={styles.text(scope)}>
        {' '}
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (scope) => (
    {
      backgroundColor: scope === 'dss' ? colors.primary : colors.secondary,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
    }
  ),
  text: (scope) => (
    {
      color: scope === 'dss' ? colors.text.default : colors.text.secondary,
      fontFamily: scope === 'dss' ? fonts.sfProDisplay.black : fonts.sfProDisplay.medium,
      fontSize: 18,
    }
  ),
});
export default Button;
