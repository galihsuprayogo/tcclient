import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';
import {Header} from '../../components';
import {colors} from '../../utils';
import IsUmkm from '../Umkm/IsUmkm.js';

const Product = ({navigation}) => {
    const [umkm] = useState('OS Coffe');

    return (
        <View style={styles.container}>
            <Header title={'Produk'}/>
            <View style={styles.content(umkm)}>
                <IsUmkm umkm={umkm} navigation={navigation} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : colors.secondary
    },
    content : (umkm) => (
        {
            paddingTop : umkm ? 30 : 0,
            flex : 1,
            backgroundColor: colors.primary,
            alignItems : 'center',
            justifyContent : umkm ? 'space-between' : 'center',
            borderTopLeftRadius : 5,
            borderTopRightRadius : 5,
            borderBottomLeftRadius : 15,
            borderBottomRightRadius : 15
        }
    )
});
export default Product;
