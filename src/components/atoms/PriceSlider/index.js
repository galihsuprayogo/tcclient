import React,{useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors, fonts} from '../../../utils';
import Slider from '@react-native-community/slider';
import {PriceFormat} from '../../../components';

const PriceSlider = ({type}) => {
        const [minimum, setMinimum] = useState(55000);
        const [maximum, setMaximum] = useState(minimum);

        const checkType = (type) => {
            if (type === 'minimum') {
                console.log('minimum ' , minimum, 'maximum ', maximum)
                return (
                    <View>
                        <Text style={styles.textWrapper(type)}> {'Harga Minimum : '}
                            <PriceFormat price={minimum}/>
                        </Text>
                        <Slider
                            style={styles.slideWrapper}
                            minimumValue={minimum}
                            maximumValue={100000}
                            step={10000}
                            thumbTintColor={colors.primary}
                            minimumTrackTintColor= {colors.primary}
                            maximumTrackTintColor= 'white'
                            inverted={true}
                            value={maximum}
                            onValueChange={
                                maximum => setMaximum(
                                    maximum
                                )
                            }
                        />
                        <Text style={styles.textWrapper('maximum')}> {'Harga Maksimum : '}
                            <PriceFormat price={maximum}/>
                        </Text>
                    </View>
                    )
            }
        }

        const changeValue = (minimum) => {
            setMaximum(minimum)
            return minimum
        }

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
                    value={minimum}
                    onValueChange={
                        minimum => setMinimum(
                            changeValue(minimum)
                        )
                    }
                />
                {
                    checkType(type)
                }
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
        textWrapper : (type) => (
            {
                color : colors.text.secondary,
                fontFamily : fonts.sfProDisplay.medium,
                fontSize : 14,
                textAlign : type === 'minimum' ? 'left' : 'right'
        })
})
export default PriceSlider;