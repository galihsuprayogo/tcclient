import React from 'react';
import { Text } from 'react-native';
import {
  IconLocation,
  IconLocationLight,
  IconNpwp,
  IconProfile,
  IconProfileLight,
  IconTelp,
  IconTelpLight,
  IconNearMe,
  IconMarker,
  IconRight,
  IconDirection,
  IconNavigation,
  IconBeenhere,
  ILPhotoFrame,
  IconUmkmActive,
  IconUmkmDark
} from '../../../assets';

const Icon = ({
  icon, height, width
}) => {
  switch (icon) {
    case 'umkm':
      return <IconUmkmActive height={30} width={30} />;
    case 'umkm-dark':
      return <IconUmkmDark height={30} width={30} />;
    case 'profile':
      return <IconProfile height={30} width={30} />;
    case 'profile-light':
      return <IconProfileLight height={30} width={30} />;
    case 'npwp':
      return <IconNpwp />;
    case 'telp':
      return <IconTelp height={30} width={30} />;
    case 'telp-light':
      return <IconTelpLight height={30} width={30} />;
    case 'loc':
      return <IconLocation />;
    case 'loc-light':
      return <IconLocationLight height={30} width={30} />;
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
