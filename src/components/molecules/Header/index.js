import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button} from '../../../components';

const Header = ({title, type, icon, width, onPress}) => {
    return (
        <View style={styles.container}>
            <Button type={type} icon={icon} onPress={onPress}/>
            <Text style={styles.text}> {title} </Text>
            <View style={styles.wrapper(width)}/>
        </View>
    );
};

const styles = StyleSheet.create({
   container :{
       paddingHorizontal: 24,
       paddingVertical: 10,
       backgroundColor: colors.secondary,
       flexDirection: 'row',
       alignItems : 'center'
   },
   text :{
       flex: 1,
       textAlign: 'center',
       color: colors.text.secondary,
       fontFamily : fonts.sfProDisplay.heavy,
       fontSize : 22
   },
   wrapper : (width) => ({
       width : width
   })
});
export default Header;
