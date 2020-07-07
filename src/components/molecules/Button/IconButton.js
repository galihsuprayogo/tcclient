import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconBackLight, IconBack} from '../../../assets';

const IconButton = ({icon, onPress}) => {
    const Icon = () =>{
        if (icon === "icon-back-light") {
            return <IconBackLight/>
        }
        if (icon === "icon-back"){
            return <IconBack/>
        }
        return <IconBackLight/>;
    };
    return (
        <TouchableOpacity onPress={onPress}>
            <Icon/>
        </TouchableOpacity>
    )
};

export default IconButton;
