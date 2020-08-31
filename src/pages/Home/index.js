import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {Button, Gap, Header} from '../../components';
import {colors, fonts} from '../../utils';
import {ILLogo} from '../../assets';


const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Header title={'Beranda'} type="icon-button" icon="no-icon"/>
                <View style={styles.content}>
                    <Gap height={20}/>
                    <Image source={ILLogo} style={styles.image}/>
                    <Gap height={30}/>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}> Selamat Datang </Text>
                        <Text style={styles.detailText}>
                            Silahkan pilih kopi kesukaanmu dari berbagai
                            katalog di Temanggung, klik di bawah ini
                        </Text>
                        <Button type="icon-button" icon="icon-hand-right" onPress={() =>
                        navigation.navigate('ChooseCoffee')}/>
                    </View>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor : colors.secondary,
    },
    content :{
        alignItems: 'center',
        justifyContent: 'center',
        flex : 1,
        backgroundColor: colors.primary,
        borderTopLeftRadius : 5,
        borderTopRightRadius : 5,
        borderBottomLeftRadius : 15,
        borderBottomRightRadius : 15
    },
    image :{
        height: 190,
        width : 250
    },
    textWrapper :{
        alignItems: 'center',
        paddingVertical : 10
    },
    text : {
        fontSize : 30,
        fontFamily : fonts.sfProDisplay.blackItalic,
        color : colors.text.default,
   },
   detailText :{
        fontFamily: fonts.sfProDisplay.ultraLight,
        fontSize: 20,
        maxWidth: 280,
        textAlign: 'center',
   }
});

export default Home;
