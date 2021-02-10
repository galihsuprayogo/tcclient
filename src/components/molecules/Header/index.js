import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { colors, fonts } from '../../../utils';
import { Icon } from '../..';

const Header = ({
  title, type, icon, width, onPress, scope
}) => (
  <View style={styles.container(scope)}>
    {type && (
      <TouchableOpacity onPress={onPress}>
          <Icon icon={icon} />
      </TouchableOpacity>
    )}
    <Text style={styles.text}>
      {' '}
      {title}
      {' '}
    </Text>
    <View style={styles.wrapper(width)} />
  </View>
);

const styles = StyleSheet.create({
  container: (scope) => ({
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: scope === 'sign-up' ? 1 : 0,
    borderColor: colors.primary
  }),
  text: {
    flex: 1,
    textAlign: 'center',
    color: colors.text.secondary,
    fontFamily: fonts.sfProDisplay.heavy,
    fontSize: 20,
  },
  wrapper: (width) => ({
    width,
  }),
});
export default Header;
