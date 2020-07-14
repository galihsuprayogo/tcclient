import React from 'react';
import { View, StyleSheet } from 'react-native';
import {colors} from '../../utils';
import {Button, Gap, Header, Input, Profile} from '../../components';

const UpdateUmkm = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Header
                title="Edit profil UMKM"
                type="icon-button"
                icon="icon-back-light"
                width={24}
                onPress={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <View style={{alignItems : 'center'}}>
                    <Profile icon="add"/>
                </View>
                <Gap height={50}/>
                <Input keyboardType="default" label="Nama UMKM/Usaha"/>
                <Gap height={10}/>
                <Input keyboardType="phone-pad" label="NPWP"/>
                <Gap height={10}/>
                <Input keyboardType="phone-pad" label="No. Telp Pemilik"/>
                <Gap height={10}/>
                <Input keyboardType="default" label="lokasi"/>
                <Gap height={30}/>
                <Button title="Simpan" onPress={() => alert('boleh-boleh')}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : colors.primary,
    },
    content : {
        flex : 1,
        justifyContent : 'center',
        padding : 40
    }
});
export default UpdateUmkm;
