import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {fonts, colors } from '../../../utils';
import {Icon} from '../../../components'

const List = ({icon, name, value}) => {

    return (
        <View style={styles.container}>
                <Icon icon={icon}/>
                <View style={styles.wrapperText}>
                    <Text style={styles.nameText}> {name} </Text>
                    <Text style={styles.valueText}> {value} </Text>
                </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        paddingVertical : 13,
        paddingLeft: 30,
        borderBottomWidth : 1,
        borderColor : colors.secondary
    },
    wrapperText :{
        flex : 1,
        flexDirection: 'column',
        marginLeft: 15
    },
    nameText :{
        fontFamily : fonts.sfProDisplay.heavy,
        fontSize : 15,
        color : colors.text.default
    },
    valueText :{
        fontFamily : fonts.sfProDisplay.semiBoldItalic,
        fontSize : 14,
        color : 'white',
        marginTop : 2
    }
});
export default List;
