import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import {colors} from '../../utils';
import {Gap, Header, InputNumber, InputPicker} from '../../components';

const InputProduct = ({navigation}) => {
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

    const destructeringElement = {
        type : [{
                id : 0,
                value : ''
        }],
        procedure : [{
                id : 0,
                value : ''
        }],
        output : [{
            id : 0,
            value : ''
        }],
        grade : [{
            id : 0,
            value : ''
        }],
    };


    const returnElement = (value, target) => {
        switch (target) {
            case 'type' :
                value.type.splice(0,1)
                    return value.type
            case 'procedure' :
                value.procedure.splice(0,1)
                    return value.procedure
            case 'output' :
                value.output.splice(0,1)
                    return value.output
            case 'grade' :
                value.grade.splice(0,1)
                    return value.grade
        }
    }

    const listCoffee = (target) =>  {
        coffees.map(coffee => {
            if(target === 'type'){
                destructeringElement.type.push({id: coffee.id,value: coffee.type})
            }
            if(target === 'procedure'){
                destructeringElement.procedure.push({id: coffee.id,value: coffee.procedure})
            }
            if(target === 'output'){
                destructeringElement.output.push({id: coffee.id, value:coffee.output})
            }
            if(target === 'grade'){
                destructeringElement.grade.push({id: coffee.id, value: coffee.grade})
            }
        })
        return returnElement(destructeringElement, target)
    };

    return (
        <View style={styles.container}>
                <Header
                    title="Tambah Produk"
                    type="icon-button"
                    icon="icon-back-light"
                    width={24}
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.content}>
                    <InputPicker
                        title={'Jenis Kopi (Arabica/Robusta)'}
                        coffees={listCoffee('type')}
                    />
                    <Gap height={10}/>
                    <InputPicker
                        title={'Cara Pengolahan'}
                        coffees={listCoffee('procedure')}
                    />
                    {/*<Gap height={10}/>*/}
                    {/*<InputPicker*/}
                    {/*    title={'Hasil Pengolahan'}*/}
                    {/*    coffees={listCoffee('output')}*/}
                    {/*/>*/}
                    {/*<Gap height={10} />*/}
                    {/*<InputPicker*/}
                    {/*    title={'Grade'}*/}
                    {/*    coffees={listCoffee('grade')}*/}
                    {/*/>*/}
                    <Gap height={10} />
                    <InputNumber title={'Harga'} />
                </View>
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
        alignItems : 'center'
    }
});

export default InputProduct;
