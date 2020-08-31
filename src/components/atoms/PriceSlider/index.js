import React,{useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors, fonts} from '../../../utils';
import Slider from '@react-native-community/slider';
import {PriceFormat} from '../../../components';

const PriceSlider = () => {
        const [price, setPrice] = useState(0);

        return (
            <View>
                    <Slider
                        style={styles.slideWrapper}
                        minimumValue={0}
                        maximumValue={100000}
                        step={10000}
                        thumbTintColor={colors.primary}
                        minimumTrackTintColor= {colors.primary}
                        maximumTrackTintColor= 'white'
                        value={price}
                        onValueChange={
                                price => setPrice(
                                    price
                                )}
                    />
                    <Text style={styles.textWrapper}>
                            { 'Harga Minimum : '  } <PriceFormat price={price} />
                    </Text>

            </View>
        )
}

const styles = StyleSheet.create({
        slideWrapper :{
                height : 30,
                width : 315,
                opacity : 10,
                alignSelf : 'center'
        },
        textWrapper : {
                color : colors.text.secondary,
                fontFamily : fonts.sfProDisplay.medium,
                fontSize : 14,
                textAlign : 'left'
        }
})
export default PriceSlider;
