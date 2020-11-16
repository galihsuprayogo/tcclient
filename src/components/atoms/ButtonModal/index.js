import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../..';
import { colors, fonts } from '../../../utils';

const ButtonModal = ({ icon, title }) => (
  <TouchableOpacity style={styles.contentWrapper(icon)}>
    <Icon icon={icon} />
    <Text style={styles.text(icon)}>
      {' '}
      {title}
      {' '}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({

  contentWrapper: (icon) => (
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: icon === 'beenhere' ? colors.map.button : 'white',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: icon === 'beenhere' ? colors.map.button : colors.secondary,
    }
  ),
  text: (icon) => (
    {
      color: icon === 'beenhere' ? 'white' : colors.map.button,
      fontFamily: fonts.sfProDisplay.bold,
      fontSize: 14,
    }
  ),
});
export default ButtonModal;
