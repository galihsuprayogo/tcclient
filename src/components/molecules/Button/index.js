import React from 'react';
import IconButton from './IconButton.js';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';

const Button = ({type, title, icon, onPress}) => {
    if(type === 'icon-button'){
        return <IconButton icon={icon} onPress={onPress}/>;
    }

    return(
        <TouchableOpacity style={styles.container} onPress = {onPress}>
            <Text style={styles.text}> {title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container : {
        backgroundColor : colors.secondary,
        paddingVertical : 10,
        borderRadius : 10,
        alignItems : 'center'
    },
    text : {
        color : colors.text.secondary,
        fontFamily : fonts.sfProDisplay.medium,
        fontSize : 18
    }
});
export default Button;
