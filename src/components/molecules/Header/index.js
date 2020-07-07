import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../utils';
import {Gap} from '../../atoms';
import {Button} from '../../../components';

const Header = ({title}) => {
    return (
        <View style={styles.container}>
            <Button type="icon-only" icon="icon-back"/>
            <Text style={styles.text}> {title} </Text>
            <Gap width={24}/>
        </View>
    );
};

const styles = StyleSheet.create({
   container :{
       paddingHorizontal: 24,
       paddingVertical: 15,
       backgroundColor: colors.secondary,
       flexDirection: 'row',
       alignItems : 'center'
   },
   text :{
       flex: 1,
       textAlign: 'center',
       color: colors.text.secondary
   }
});
export default Header;
