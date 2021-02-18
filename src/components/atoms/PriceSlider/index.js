import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors, fonts } from '../../../utils';
import { PriceFormat } from '../..';

const PriceSlider = ({
  type, minimum, maximum, setMinimum, setMaximum, initialMaximum
}) => {
  // const [minimum, setMinimum] = useState(initialMinimum);
  // const [maximum, setMaximum] = useState(minimum);

  const checkType = (type) => {
    if (type === 'minimum') {
      return (
        <View>
          <Text style={styles.textWrapper(type)}>
            {' '}
            {'Harga Minimum : '}
            <PriceFormat price={minimum} />
          </Text>
          <Slider
            style={styles.slideWrapper}
            minimumValue={minimum}
            maximumValue={initialMaximum}
            step={100}
            thumbTintColor={colors.primary}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor="white"
            inverted
            value={maximum}
            onValueChange={(maximum) => setMaximum(maximum)}
          />
          <Text style={styles.textWrapper('maximum')}>
            {' '}
            {'Harga Maksimum : '}
            <PriceFormat price={maximum} />
          </Text>
        </View>
      );
    }
  };

  const changeValue = (minimum) => {
    setMaximum(minimum);
    return minimum;
  };

  return (
    <View>
      <Slider
        style={styles.slideWrapper}
        minimumValue={0}
        maximumValue={initialMaximum}
        step={100}
        thumbTintColor={colors.primary}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor="white"
        value={minimum}
        onValueChange={(minimum) => setMinimum(changeValue(minimum))}
      />
      {checkType(type)}
    </View>
  );
};

const styles = StyleSheet.create({
  slideWrapper: {
    height: 30,
    width: 315,
    opacity: 10,
    alignSelf: 'center',
  },
  textWrapper: (type) => (
    {
      color: colors.text.secondary,
      fontFamily: fonts.sfProDisplay.medium,
      fontSize: 14,
      textAlign: type === 'minimum' ? 'left' : 'right',
    }),
});
export default PriceSlider;
