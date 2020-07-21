import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {colors} from '../../utils';

const InputProduct = () => {
    return (
        <View style={styles.container}>
            <Text> Input product page </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : colors.primary
    }
});

export default InputProduct;
