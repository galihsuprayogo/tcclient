import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {fonts, colors } from '../../../utils';
import {Icon, ImageResource} from '../../../components'

const List = ({type, icon, image, name, value}) => {
    const Type = () => {
        if(type==='icon'){
            return <Icon icon={icon}/>
        }
       return <ImageResource image={image} />
    }

    return (
        <View style={styles.container}>
                <Type/>
                <View style={styles.wrapperText}>
                        <Text style={styles.nameText(type)}> {name} </Text>
                        <Text style={styles.valueText(type)}> {value} </Text>
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
        marginLeft: 10
    },
    nameText : (type) => (
        {
            fontFamily : type === 'icon' ? fonts.sfProDisplay.heavy : fonts.sfProDisplay.medium,
            fontSize : type === 'icon' ? 13 : 17,
            color : colors.text.default,
            maxWidth : type === 'icon' ? 135 : 200,
        }
    ),
    valueText : (type) => (
        {
            fontFamily : type === 'icon' ? fonts.sfProDisplay.semiBoldItalic : fonts.sfProDisplay.light,
            fontSize : type === 'icon' ? 14 : 12,
            color : type === 'icon' ? 'white' : colors.text.third,
            marginTop : 2
        }
    )
});
export default List;
