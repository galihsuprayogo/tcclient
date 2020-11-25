import React from 'react';
import { Text } from 'react-native';
import {
  IconLocation,
  IconNpwp,
  IconPersonUmkm,
  IconTelp,
  IconNearMe,
  IconMarker,
  IconRight,
  IconDirection,
  IconNavigation,
  IconBeenhere,
  ILPhotoFrame,
} from '../../../assets';

const Icon = ({ icon, height, width }) => {
  switch (icon) {
    case 'profile':
      return <IconPersonUmkm />;
    case 'npwp':
      return <IconNpwp />;
    case 'telp':
      return <IconTelp />;
    case 'loc':
      return <IconLocation />;
    case 'loc2':
      return <IconLocation height={18} width={18} />;
    case 'near':
      return <IconNearMe height={18} width={18} />;
    case 'marker':
      return <IconMarker />;
    case 'aright':
      return <IconRight height={20} width={20} />;
    case 'direction':
      return <IconDirection height={height} width={width} />;
    case 'navigation':
      return <IconNavigation height={height} width={width} />;
    case 'beenhere':
      return <IconBeenhere height={21} width={25} />;
    case 'frame':
      return <ILPhotoFrame height={110} width={85} />;
    default:
      return <Text />;
  }
};

export default Icon;
