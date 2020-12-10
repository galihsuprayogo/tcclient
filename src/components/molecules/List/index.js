import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts, colors } from '../../../utils';
import { Icon, ImageResource } from '../..';

const List = ({
  type, icon, image, name, value,
}) => {
  const Type = () => {
    if (type === 'icon') {
      return <Icon icon={icon} />;
    }
    return (
      <View>
        <ImageResource image={image} />
      </View>
    );
  };

  return (
    <View style={styles.container(type)}>
      <Type />
      <View style={styles.wrapperText}>
        <Text numberOfLines={2} style={styles.nameText(type)}>
          {' '}
          {name}
          {' '}
        </Text>
        <Text numberOfLines={1} style={styles.valueText(type)}>
          {' '}
          {value}
          {' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (type) => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: type === 'icon' ? colors.primary : colors.secondary,
  }),
  wrapperText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  nameText: (type) => (
    {
      fontFamily: type === 'icon' ? fonts.sfProDisplay.heavy : fonts.sfProDisplay.medium,
      fontSize: type === 'icon' ? 13 : 17,
      color: type === 'icon' ? colors.primary : colors.text.default,
      maxWidth: type === 'icon' ? 200 : 208,
    }
  ),
  valueText: (type) => (
    {
      fontFamily: type === 'icon' ? fonts.sfProDisplay.semiBold : fonts.sfProDisplay.light,
      fontSize: type === 'icon' ? 14 : 12,
      color: type === 'icon' ? 'white' : colors.text.third,
      paddingTop: 3,
      maxWidth: type === 'icon' ? 200 : 128,
    }
  ),
});
export default List;
