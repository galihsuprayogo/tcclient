import React from 'react';
import { View, StyleSheet } from 'react-native';
import {ILLogo} from '../../assets/illustration';

const Splash = () =>{
    return (
        <View style={styles.wrapper}>
            <ILLogo height={260} width={225}/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper :{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#E3D1BE'
    }
});
export default Splash;
