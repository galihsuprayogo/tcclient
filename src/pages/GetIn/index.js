import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ILLogo} from '../../assets';
import {Button, Gap} from '../../components';
import {colors, fonts} from '../../utils';

const GetIn = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Gap height={75}/>
                    <Image source={ILLogo} style={styles.image}/>
                </View>
                <Gap height={50}/>
                <View style={styles.button}>
                    <Text style={styles.textOne}> Silahkan Masuk </Text>
                    <Text style={styles.textTwo}> mulai kenalkan kopi anda kepada Nusantara </Text>
                    <Gap height={30}/>
                    <Button title="Masuk" onPress={ () => navigation.navigate('SignIn')}/>
                    <Gap height={15}/>
                    <Button title="Daftar" onPress={ () => navigation.navigate('SignUp')}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: colors.secondary
    },
    content : {
        flex :1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : colors.primary,
        borderBottomLeftRadius : 15,
        borderBottomRightRadius : 15,
    },
    image :{
        height : 220,
        width : 280
    },
    textOne :{
        fontFamily : fonts.sfProDisplay.semiBoldItalic,
        fontSize : 20,
        color : colors.text.default,
    },
    textTwo :{
        fontFamily : fonts.sfProDisplay.lightItalic,
        fontSize: 16,
        color : colors.text.default,
    },
    button : {
        paddingBottom : 40
    }
});


export default GetIn;
