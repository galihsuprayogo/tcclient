import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Icon, Button, Gap} from '../../../components';

const ListFarmer = ({id, score, name, address, onPress}) => {
    return (
            <View style={styles.content}>
                <View style={styles.contentTop}>
                    <Icon icon={'frame'}/>
                    <View style={styles.textWrapper}>
                        <View style={styles.numberCircle}>
                            <Text style={styles.textNumber}> {id} </Text>
                        </View>
                        <Text style={styles.text1}>Skor : {score}</Text>
                        <Text style={styles.text2}>{name}</Text>
                        <Text style={styles.text3}>{address} </Text>
                    </View>
                </View>
                <View style={styles.contentBottom}>
                    <Text style={styles.text4}> Kunjungi</Text>
                    <Gap width={5}/>
                    <Button type={'icon-button'} icon={'nearme'} onPress={onPress}/>
                    <Gap width={10}/>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    content : {
        flex :1,
        backgroundColor : colors.secondary,
        borderRadius : 8,
    },
    contentTop : {
        flex : 1,
        flexDirection : 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    contentBottom : {
        flexDirection: 'row',
        width: '100%',
        paddingVertical : 10,
        borderTopWidth : 2,
        borderColor: 'white',
        justifyContent : 'flex-end',
    },
    textWrapper : {
        flex : 1,
        alignItems: 'flex-start',
        alignSelf : 'center',
        paddingHorizontal : 23,
        marginLeft : 10,
    },
    numberCircle : {
        height : 25,
        width : 25,
        borderRadius: 25/2,
        backgroundColor : colors.primary,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent : 'center',
        position : 'absolute',
        left : -25/2,
        top : -25/4
    },
    textNumber : {
        textAlign : 'center',
        color : colors.text.default,
        fontFamily : fonts.sfProDisplay.heavy
    },
    text1 : {fontFamily : fonts.sfProDisplay.mediumItalic, fontSize : 15, color : 'white'},
    text2 : {fontFamily : fonts.sfProDisplay.mediumItalic, fontSize : 15, color : 'white'},
    text3 : {fontFamily : fonts.sfProDisplay.mediumItalic, fontSize : 15, color : 'white'},
    text4 : {fontFamily : fonts.sfProDisplay.medium, fontSize : 16, color : 'white'}
})
export default ListFarmer;
