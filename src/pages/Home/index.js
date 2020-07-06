import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
    return (
        <View>
            <Text style={styles.text}> Cek Font </Text>
        </View>
    );
};

const styles = StyleSheet.create({
   text : {
       fontSize : 30,
       fontFamily : 'albertho-jerrv',
       textAlign : 'center'
   }
});


export default Home;
