import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {colors, fonts} from '../../../utils';

const InputPicker = ({title, coffees}) => {

    const [picked, setPicked] = useState('');

    return (
        <View>
            <Text style={styles.label}> {title} </Text>
            <View style={styles.content}>
                <Picker
                    selectedValue={picked}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                        setPicked(itemValue)
                    }>
                    {
                        coffees.map( (coffee) =>
                        {
                            return <Picker.Item key={coffee.id} label={coffee.value} value={coffee.value} />
                        })
                    }
                </Picker>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    content : {
        borderWidth : 2,
        borderRadius : 10,
        borderColor : colors.secondary,
        backgroundColor : 'white',
        paddingVertical : 5,
        paddingHorizontal : 15,
    },
    picker : {
        height: 35,
        width: 280,
        color : 'blue',
        borderWidth : 2,
        borderRadius : 10,
        borderColor : colors.secondary,
    },
    label : {
        fontFamily : fonts.sfProDisplay.heavy,
        color : colors.text.default,
        fontSize : 16,
        marginBottom : 6
    }
});

export default InputPicker;
