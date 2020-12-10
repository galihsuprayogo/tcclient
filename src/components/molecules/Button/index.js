import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconButton from './IconButton.js';
import { colors, fonts } from '../../../utils';

const Button = ({
  type, title, icon, onPress, scope,
}) => {
  if (type === 'icon-button') {
    return <IconButton icon={icon} onPress={onPress} />;
  }

  const getButton = () => {
    if (scope === 'get-in' || scope === 'sign-in') {
      return (
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            colors={['#c5a880', '#f9e0ae']}
            style={styles.optionalButton(scope)}
          >
            <Text style={styles.optionalText(scope)}>
              {' '}
              {title}
              {' '}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
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
  return (
    getButton()
  );
};

const styles = StyleSheet.create({
  container: (scope) => (
    {
      backgroundColor: scope === 'dss' ? colors.primary : colors.secondary,
      paddingVertical: 12,
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
  optionalText: (scope) => ({
    color: 'white',
    fontFamily: fonts.sfProDisplay.medium,
    fontSize: scope === 'get-in' ? 15 : 17
  }),
  optionalButton: (scope) => ({
    width: scope === 'get-in' ? 150 : '100%',
    height: scope === 'get-in' ? 40 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row'
  })
});
export default Button;
