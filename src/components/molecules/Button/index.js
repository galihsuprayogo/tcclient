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
    if (scope === 'get-in') {
      return (
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            colors={['#c5a880', '#f9e0ae']}
            style={styles.optionalButton}
          >
            <Text style={styles.optionalText}>
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
  optionalText: {
    color: 'white',
    fontFamily: fonts.sfProDisplay.medium,
    fontSize: 15
  },
  optionalButton: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row'
  }
});
export default Button;
