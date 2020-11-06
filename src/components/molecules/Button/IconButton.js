import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {
    IconBackLight,
    IconBack,
    IconHandRight,
    IconEdit,
    IconAddPhoto,
    IconAddNext,
    IconX,
    IconNearMeLight
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
            case 'add-photo':
                return <IconAddPhoto/>
            case 'add-next' :
                return <IconAddNext/>
            case 'x' :
                return <IconX height={20} width={20}/>
            case 'nearme' :
                return <IconNearMeLight/>
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
