import React from 'react';
import {ButtonNavigator, TextButton, List} from '../../components';
import {showMessage} from 'react-native-flash-message';
import {colors} from '../../utils';

const IsUmkm = ({umkm, navigation}) => {

    const Content = () => {
        if(!umkm){
            return <TextButton title={'Masukkan Produk Kamu'} onPress={onMessage}/>
        }
        return (
            <>
                <List
                    type="image"
                    image="dummycoffe1"
                    name="Header nama coffe"
                    value="Footer alamat coffe"
                />
                <List
                    type="image"
                    image="dummycoffe2"
                    name="Header nama coffe"
                    value="Footer alamat coffe"
                />
                <List
                    type="image"
                    image="dummycoffe3"
                    name="Header nama coffe"
                    value="Footer alamat coffe"
                />
                <List
                    type="image"
                    image="dummycoffe4"
                    name="Header nama coffe"
                    value="Footer alamat coffe"
                />
                <ButtonNavigator
                    title={'Tambah Kopi? Klik...'}
                    icon={'add-next'}
                    onPress={() => navigation.navigate('InputProduct')}
                />
            </>
        )
    }

    const onMessage = () => {
        showMessage({
            message : 'Ooops, Sepertinya kamu belum melengkapi profil UMKM!! ',
            type : 'default',
            backgroundColor : colors.message.error,
            color : 'white'
        });
    };

    return (
        <Content/>
    )
}
export default IsUmkm;
