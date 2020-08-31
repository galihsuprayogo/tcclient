import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Profile, List, Header, Gap, ButtonNavigator} from '../../components';
import {colors} from '../../utils';

const Umkm = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Header title={'Profil UMKM'}/>
            <View style={styles.content}>
                <Profile/>
                <Gap height={25}/>
                <List type="icon" icon="profile" name="Nama UMKM/Usaha" value="OS Coffe"/>
                <List type="icon" icon="npwp" name="NPWP" value="xxxx-xxxx-xx"/>
                <List type="icon" icon="telp" name="No. Telp Pemilik" value="xxxxxxxxxxxx"/>
                <List type="icon" icon="loc" name="Lokasi" value="Kledung, Temanggung"/>
                <ButtonNavigator
                    title={'Edit profil umkm...'}
                    icon={'edit'}
                    onPress={() => navigation.navigate('UpdateUmkm')}
                />
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
    }
});

export default Umkm;
