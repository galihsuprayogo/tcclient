import React, {useState} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import {colors, fonts} from '../../../utils';
import numbro from 'numbro';

const InputNumber = ({title, data}) => {
    const [price, setPrice] = useState(data);

    const formatPrice = (price) => {
        if(price !== ''){
          return numbro(price).format({
                thousandSeparated : true
            })
        }
    }

    const setValue = (price) => {
        if(typeof price === 'number'){
            return price.toString()
        }
        if(typeof price === 'undefined'){
            return setPrice(0)
        }
        return formatPrice(price)
    }
    return (
        <View>
            <Text style={styles.label}> {title} </Text>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    value={setValue(price)}
                    onChangeText={
                        price => setPrice(
                            formatPrice(price)
                        )
                    }
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    content : {
        borderWidth : 2,
        borderRadius : 10,
        borderColor : colors.secondary,
        paddingVertical : 5,
        paddingHorizontal : 15,
        backgroundColor : 'white',
    },
    input : {
        height: 35,
        width: 280,
        color : 'blue',
    },
    label : {
        fontFamily : fonts.sfProDisplay.heavy,
        color : colors.text.default,
        fontSize : 16,
        marginBottom : 6
    }
})

export default InputNumber;
