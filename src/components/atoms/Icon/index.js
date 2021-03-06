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
  IconUmkmDark,
  IconForward,
  IconXLight,
  IconOpenDrawer,
  IconBackLight,
  IconBack,
  IconBackLocation,
  IconToLocation,
  IconUnVisible
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
    case 'unVisible':
      return <IconUnVisible height={18} width={18} />;
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
      return <IconBeenhere height={18} width={20} />;
    case 'xlight':
      return <IconXLight height={18} width={20} />;
    case 'frame':
      return <ILPhotoFrame height={110} width={85} />;
    case 'forward':
      return <IconForward height={10} width={10} />;
    case 'open-drawer':
      return <IconOpenDrawer height={20} width={20} />;
    case 'icon-back':
      return <IconBack />;
    case 'icon-back-map':
      return <IconBack height={20} width={20} />;
    case 'icon-back-light':
      return <IconBackLight />;
    case 'icon-back-location':
      return <IconBackLocation height={18} width={18} />;
    case 'icon-to-location':
      return <IconToLocation height={18} width={18} />;
    default:
      return <Text />;
  }
};

export default Icon;
