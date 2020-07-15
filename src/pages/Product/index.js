import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Header} from '../../components';
import {colors, fonts} from '../../utils';
import {showMessage} from 'react-native-flash-message';

const Product = () => {

    const onLoad = () => {
        showMessage({
            message : 'Ooops, Sepertinya kamu belum melengkapi profil UMKM!! ',
            type : 'default',
            backgroundColor : colors.message.error,
            color : 'white'
        });
    };

    return (
        <View style={styles.container}>
            <Header title={'Produk'}/>
            <View style={styles.content}>
                <TouchableOpacity onPress={onLoad} >
                    <Text style={styles.text}>
                        Masukkan Produk Kamu
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : colors.secondary
    },
    content : {
        flex : 1,
        backgroundColor: colors.primary,
        alignItems : 'center',
        justifyContent : 'center',
        borderTopLeftRadius : 5,
        borderTopRightRadius : 5,
        borderBottomLeftRadius : 15,
        borderBottomRightRadius : 15
    },
    text : {
        fontFamily : fonts.sfProDisplay.black,
        color : colors.text.default,
        fontSize : 18
    }
});
export default Product;
