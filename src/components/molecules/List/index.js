import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { fonts, colors } from '../../../utils';
import { Icon, ImageResource, Gap } from '../..';

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
      { image && (
        <>
          <Gap height={8} />
          <View style={styles.wrapperButton} onPress={() => alert('hai')}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.buttonText}>
                {' '}
                ubah
                {' '}
              </Text>
              <Gap width={1} />
              <Icon icon="forward" />
            </TouchableOpacity>
            <Gap width={8} />
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.buttonText}>
                {' '}
                hapus
                {' '}
              </Text>
              <Gap width={1} />
              <Icon icon="forward" />
            </TouchableOpacity>
          </View>
        </>
      )}
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
  wrapperButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingRight: '5%'
  },
  buttonText: {
    fontFamily: fonts.Akkurat.bold,
    fontSize: 13,
    color: colors.primary,
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
