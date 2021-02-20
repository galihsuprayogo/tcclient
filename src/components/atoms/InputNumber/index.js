import React, { useState } from 'react';
import {
  TextInput, StyleSheet, View, Text,
} from 'react-native';
import { colors, fonts, formatNumbro } from '../../../utils';

const InputNumber = ({
  title, priceFormat, price, setPrice, keyboardType
}) => {
  const formatPrice = (price) => {
    if (price !== '') {
      return (
        formatNumbro(price)
      );
    }
  };

  const setValue = (price) => {
    if (typeof price === 'number') {
      return price.toString();
    }
    if (typeof price === 'undefined') {
      return setPrice(0);
    }
    return formatPrice(price);
  };

  const Content = (price, priceFormat) => {
    if (typeof priceFormat !== 'undefined') {
      return formatPrice(priceFormat);
    }

    return (
      <View>
        <Text style={styles.label}>
          {' '}
          {title}
          {' '}
        </Text>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            keyboardType={keyboardType}
            value={setValue(price)}
            onChangeText={(price) => setPrice(formatPrice(price))}
          />
        </View>
      </View>
    );
  };

  return (
    Content(price, priceFormat)
  );
};

const styles = StyleSheet.create({
  content: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.secondary,
    paddingVertical: 0,
    paddingHorizontal: 15,
    backgroundColor: colors.text.secondary,
  },
  input: {
    height: 40,
    width: 280,
    color: colors.text.default,
  },
  label: {
    fontFamily: fonts.sfProDisplay.heavy,
    color: colors.text.secondary,
    fontSize: 16,
    marginBottom: 6,
  },
});

export default InputNumber;
