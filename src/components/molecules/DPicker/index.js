import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors, fonts } from '../../../utils';

const DPicker = ({
  title, data, onChangeItem, value
}) =>
  (
    <View>
          <Text style={styles.label}>
          {' '}
          {title}
          {' '}
          </Text>
          <DropDownPicker
            items={data}
            defaultValue={value}
            placeholder="-- Pilih --"
            placeholderStyle={styles.placeholder}
            selectedLabelStyle={{ color: colors.text.default }}
            containerStyle={{ height: 40 }}
            style={styles.wrapper}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={styles.dropDown}
            onChangeItem={onChangeItem}
          />
    </View>
  );
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
  placeholder: {
    color: colors.text.default,
    fontFamily: fonts.Akkurat.bold,
    fontSize: 14,
  },
  dropDown: {
    backgroundColor: 'white',
  },
  label: {
    fontFamily: fonts.Akkurat.bold,
    color: colors.text.secondary,
    fontSize: 16,
    marginBottom: 6,
  }
});
export default DPicker;
