import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {
    IconBackLight,
    IconBack,
    IconHandRight,
    IconEdit,
    IconAddPhoto
} from '../../../assets';

const IconButton = ({icon, onPress}) => {
    const Icon = () =>{
        switch (icon) {
            case 'icon-back' :
                return <IconBack/>;
            case 'icon-back-light' :
                return <IconBackLight/>;
            case 'icon-hand-right':
                return <IconHandRight/>
            case 'edit':
                return <IconEdit/>
            case 'add':
                return <IconAddPhoto/>
            default :
                return <Text/>;
        }
    };
    return (
        <TouchableOpacity onPress={onPress}>
            <Icon/>
        </TouchableOpacity>
    )
};

export default IconButton;
