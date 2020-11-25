import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../..';
import { colors, fonts } from '../../../utils';

const ButtonModal = ({
  icon, title, type, height, width, onPress
}) => (
  <TouchableOpacity style={styles.contentWrapper(icon, type)} onPress={onPress}>
    <Icon icon={icon} height={height} width={width} />
    <Text style={styles.text(icon, type)}>
      {' '}
      {title}
      {' '}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({

  contentWrapper: (icon, type) => (
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: icon === 'beenhere' ? colors.map.button : 'white',
      paddingVertical: type === 'map' ? 3 : 5,
      paddingHorizontal: type === 'map' ? 40 : 10,
      marginLeft: type === 'map' ? 3 : 0,
      marginRight: type === 'map' ? -5 : 0,
      borderRadius: type === 'map' ? 6 : 18,
      borderWidth: 1,
      borderColor: icon === 'beenhere' ? colors.map.button : colors.secondary && type === 'map' ? colors.map.button : colors.secondary,
    }
  ),
  text: (icon, type) => (
    {
      color: icon === 'beenhere' ? 'white' : colors.map.button,
      fontFamily: type === 'map' ? fonts.sfProDisplay.medium : fonts.sfProDisplay.bold,
      fontSize: type === 'map' ? 12 : 14,
    }
  ),
});
export default ButtonModal;
