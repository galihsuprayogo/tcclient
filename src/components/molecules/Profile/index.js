import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {ILCamera} from '../../../assets';
import {colors} from '../../../utils';
import {Button} from '../../../components';

const Profile = ({icon}) => {
    return (
        <View style={styles.imageWrapper}>
            <Image source={ILCamera} style={styles.image}/>
            {icon && (
                <View style={styles.actionPhoto}>
                    <Button
                        type="icon-button"
                        icon={icon}
                        onPress={() => alert('What ?')}
                    />
                </View>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    imageWrapper : {
        backgroundColor : colors.secondary,
        height: 130,
        width : 130,
        borderWidth : 2,
        borderRadius : 130/2,
        borderColor : 'white',
        alignItems : 'center',
        justifyContent : 'center'
    },
    image : {
        height : 80,
        width : 80,
    },
    actionPhoto : {
        position : 'absolute',
        right : 0,
        bottom : 0
    }
});
export default Profile;
