import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {colors, fonts} from '../../utils';
import {Header, CoffeePicker, Gap, PriceSlider} from '../../components';

const ChooseCoffee = ({navigation}) => {

    const [coffees] = useState([
        {
            id : 1,
            type : 'Arabica',
            procedure : 'Fullwash',
            output : 'Roasted bean',
            grade :'A'
        },
        {
            id : 2,
            type : 'Robusta',
            procedure : 'Wine',
            output : 'Green Bean',
            grade :'B'
        }
    ])

    return (
        <View style={styles.container}>
            <Header
                title="Decision Support System"
                type="icon-button"
                icon="icon-back-light"
                width={24}
                onPress={() => navigation.goBack()}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text style={styles.text}>
                        Silahkan pilih kopi kesukaanmu...
                        masukkan kategori yang kamu inginkan
                    </Text>
                    <View style={styles.divWrapper}>
                        <CoffeePicker
                            title={'Jenis Kopi (Arabica/Robusta'}
                            datacoffees={coffees}
                            target={'type'}
                            labelType={'dss'}
                        />
                        <Gap height={10}/>
                        <CoffeePicker
                            title={'Cara Pengolahan'}
                            datacoffees={coffees}
                            target={'procedure'}
                            labelType={'dss'}
                        />
                        <Gap height={10}/>
                        <CoffeePicker
                            title={'Hasil Pengolahan'}
                            datacoffees={coffees}
                            target={'output'}
                            labelType={'dss'}
                        />
                        <Gap height={10}/>
                        <CoffeePicker
                            title={'Grade'}
                            datacoffees={coffees}
                            target={'grade'}
                            labelType={'dss'}
                        />
                        <Gap height={10}/>
                        <PriceSlider/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : colors.primary
    },
    content : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    divWrapper : {
        paddingVertical : 20,
        paddingHorizontal : 20,
        borderWidth : 2,
        borderRadius : 15,
        backgroundColor: colors.secondary,
    },
    text :{
        fontFamily : fonts.sfProDisplay.lightItalic,
        fontSize : 20,
        paddingTop :50,
        paddingBottom: 20,
        textAlign : 'center',
        maxWidth : 350
    }
})

export default ChooseCoffee;
