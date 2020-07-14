import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
    IconHome,
    IconHomeActive,
    IconLogin,
    IconLoginActive,
    IconUmkm,
    IconUmkmActive,
    IconProduct,
    IconProductActive,
    IconLogout,
    IconLogoutActive

} from '../../../assets';
import {colors, fonts} from '../../../utils';

const TabItem = ({title, active, onPress, onLongPress}) => {

    const Icon = () => {
        switch (title) {
            case 'Beranda' :
                return active ? <IconHomeActive/> : <IconHome/>;
            case 'Masuk' :
                return active ? <IconLoginActive/> : <IconLogin/>;
            case 'UMKM' :
                return active ? <IconUmkmActive/> : <IconUmkm/>;
            case 'Produk':
                return active ? <IconProductActive/> : <IconProduct/>;
            case 'Keluar' :
                return active ? <IconLogoutActive/> : <IconLogout/>
            default :
                return <IconHome/>;
        }
    }
    return(
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <Icon/>
            <Text style={styles.text(active)}>
                {title}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems : 'center',
    },
    text : (active) => (
        {
            color : active ? colors.icon.active : colors.icon.inactive,
            fontFamily : fonts.sfProDisplay.thin,
            fontSize : 12
        }
    )
});
export default TabItem;
