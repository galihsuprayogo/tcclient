import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { colors, fonts } from '../../../utils';

const InputPicker = ({ title, selectedCoffees, labelType }) => {
  const [picked, setPicked] = useState('');

  return (
    <View>
      <Text style={styles.label(labelType)}>
        {' '}
        {title}
        {' '}
      </Text>
      <View style={styles.content}>
        <Picker
          selectedValue={picked}
          style={styles.picker}
          onValueChange={(itemValue) => setPicked(itemValue)}
        >
          {
                        selectedCoffees.map((coffee) => <Picker.Item key={coffee.id} label={coffee.value} value={coffee.value} />)
                    }
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.secondary,
    backgroundColor: colors.text.secondary,
    paddingVertical: 5,
    paddingHorizontal: 15,

  },
  picker: {
    height: 35,
    width: '100%',
    color: colors.text.default,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.secondary,
  },
  label: (labelType) => ({
    fontFamily: fonts.Akkurat.bold,
    color: labelType === 'dss' ? colors.text.secondary : colors.primary,
    fontSize: 16,
    marginBottom: 6,
  }),
});

export default InputPicker;
