import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import {fonts, colors} from '../../../utils';

const TextButton = ({onPress, title}) => {
    return (
        <>
            <TouchableOpacity onPress={onPress} >
                <Text style={styles.text}>
                    { title }
                </Text>
            </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create({
    text : {
        fontFamily : fonts.sfProDisplay.black,
        color : colors.text.default,
        fontSize : 18
    }
});

export default TextButton;
