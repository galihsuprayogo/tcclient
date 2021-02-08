import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { fonts, colors } from '../../../utils';
import { Icon, ImageResource, Gap } from '../..';

const List = ({
  type, icon, source, name, value
}) => {
  const Type = () => {
    if (type === 'icon') {
      return <Icon icon={icon} />;
    }
    return (
      <View>
        <ImageResource source={source} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Type />
        <View style={styles.wrapperText}>
          <Text numberOfLines={2} style={styles.nameText(type)}>
            {''}
            {name}
            {' '}
          </Text>
          <Text numberOfLines={4} style={styles.valueText(type)}>
            {''}
            {value}
            {' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 13,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: colors.primary,
  },
  wrapperText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  nameText: (type) => (
    {
      fontFamily: fonts.sfProDisplay.heavy,
      fontSize: type === 'icon' ? 13 : 17,
      color: colors.primary,
      maxWidth: type === 'icon' ? 200 : 208,
    }
  ),
  valueText: (type) => (
    {
      fontFamily: type === 'icon' ? fonts.sfProDisplay.semiBold : fonts.sfProDisplay.light,
      fontSize: type === 'icon' ? 14 : 12,
      color: 'white',
      paddingTop: 3,
      maxWidth: type === 'icon' ? 200 : 128,
    }
  ),
});
export default List;
