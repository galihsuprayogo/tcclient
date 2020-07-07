import React from 'react';
import IconButton from './IconButton.js';

const Button = (type, icon, onPress) => {
    // if(type === 'icon-only'){
    //     return <IconButton icon={icon} onPress={onPress}/>;
    // }
    return <IconButton icon={icon} onPress={onPress}/>;
};

export default Button;
