import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import {
  IconHandRight,
  IconAddPhoto,
  IconRemovePhoto,
  IconX,
  IconNearMeLight,
} from '../../../assets';

const IconButton = ({ icon, onPress }) => {
  const Icon = () => {
    switch (icon) {
      case 'icon-hand-right':
        return <IconHandRight />;
      case 'add-photo':
        return <IconAddPhoto />;
      case 'remove-photo':
        return <IconRemovePhoto />;
      case 'x':
        return <IconX height={20} width={20} />;
      case 'nearme':
        return <IconNearMeLight />;
      default:
        return <Text />;
    }
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconButton;
