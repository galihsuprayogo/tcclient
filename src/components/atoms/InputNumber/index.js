import React, { useState } from 'react';
import {
  TextInput, StyleSheet, View, Text,
} from 'react-native';
import numbro from 'numbro';
import { colors, fonts } from '../../../utils';

const InputNumber = ({ title, priceFormat }) => {
  const [price, setPrice] = useState(0);

  numbro.registerLanguage({
    languageTag: 'en-US',
    delimiters: {
      thousands: '.',
      decimal: ',',
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't',
    },
    ordinal: () => '',
    currency: {
      symbol: 'Rp',
      position: 'prefix',
      code: 'EUR',
    },
  });

  const formatPrice = (price) => {
    console.log(price);
    if (price !== '') {
      return numbro(price).formatCurrency({
        thousandSeparated: true,
        spaceSeparated: true,
        mantissa: 2,
        optionalMantissa: true,
      });
    }
  };

  const setValue = (price) => {
    console.log(typeof price, 'value');
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
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.text.secondary,
  },
  input: {
    height: 35,
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
