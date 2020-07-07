import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Header} from '../../components';
import {colors} from '../../utils';

const Home = () => {
    return (
        <View style={styles.container}>
            <Header title={'Beranda'}/>
            <Text style={styles.text}> Cek Font </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor : colors.primary,
    },
    text : {
       fontSize : 30,
       fontFamily : 'albertho-jerrv',
       textAlign : 'center'
   }
});


export default Home;
