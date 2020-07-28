import React, {Fragment} from 'react';
import {ButtonNavigator, TextButton, List} from '../../components';
import {showMessage} from 'react-native-flash-message';
import {colors} from '../../utils';

const IsUmkm = ({umkm, navigation}) => {

    const Content = () => {
        if(!umkm){
            return <TextButton title={'Masukkan Produk Kamu'} onPress={onMessage}/>
        }
        return (
            <Fragment>
                <List
                    type="image"
                    image="dummycoffe1"
                    name="Header nama coffe-Arabica-Fullwash-Roast Bean- Rp. 50.000,-"
                    value="Kledung, Temanggung, Jawa Tengah, 27777"
                />
                <List
                    type="image"
                    image="dummycoffe2"
                    name="Ambu Coffe-Robusta-Semi Wash-Green Bean- Rp. 80.000,-"
                    value="Posong, Temanggung, Jawa Tengah, 27777"
                />
                <List
                    type="image"
                    image="dummycoffe3"
                    name="Header nama coffe"
                    value="Tanon, Temanggung, Jawa Tengah, 27777"
                />
                <List
                    type="image"
                    image="dummycoffe4"
                    name="Header nama coffe"
                    value="Random, Temanggung, Jawa Tengah, 27777"
                />
                <ButtonNavigator
                    title={'Tambah Kopi? Klik...'}
                    icon={'add-next'}
                    onPress={() => navigation.navigate('InputProduct')}
                />
            </Fragment>
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
