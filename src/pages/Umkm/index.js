import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Profile, List, Header, Gap, Button} from '../../components';
import {colors, fonts} from '../../utils';

const Umkm = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Header title={'Profil UMKM'}/>
            <View style={styles.content}>
                <Profile/>
                <Gap height={30}/>
                <List icon="profile" name="Nama UMKM/Usaha" value="OS Coffe"/>
                <List icon="npwp" name="NPWP" value="xxxx-xxxx-xx"/>
                <List icon="telp" name="No. Telp Pemilik" value="xxxxxxxxxxxx"/>
                <List icon="loc" name="Lokasi" value="Kledung, Temanggung"/>
                <View style={styles.editWrapper}>
                    <Text style={styles.textWrapper}> Edit profil umkm.. </Text>
                    <Button
                        type="icon-button"
                        icon="edit"
                        onPress={() => navigation.navigate('UpdateUmkm')}
                    />
                </View>
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
    editWrapper : {
        flexDirection : 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        padding : 30
    },
    textWrapper : {
        fontFamily : fonts.sfProDisplay.semiBoldItalic,
        color : colors.text.default,
        fontSize : 16
    }
});

export default Umkm;
