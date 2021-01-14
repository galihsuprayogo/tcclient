import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import {
  IconBackLight,
  IconBack,
  IconHandRight,
  IconAddPhoto,
  IconRemovePhoto,
  IconX,
  IconNearMeLight,
  IconOpenDrawer
} from '../../../assets';

const IconButton = ({ icon, onPress }) => {
  const Icon = () => {
    switch (icon) {
      case 'icon-back':
        return <IconBack />;
      case 'icon-back-light':
        return <IconBackLight />;
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
      case 'open-drawer':
        return <IconOpenDrawer height={20} width={20} />;
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
