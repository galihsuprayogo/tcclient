import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../../utils';
import { Button } from '../..';

const Header = ({
  title, type, icon, width, onPress, scope
}) => (
  <View style={styles.container(scope)}>
    <Button type={type} icon={icon} onPress={onPress} />
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
