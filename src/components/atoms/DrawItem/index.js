import React from 'react';
import { StyleSheet } from 'react-native';
import {
  IconUmkm, IconUmkmActive, IconProduct, IconProductActive,
  IconHome, IconLogout, IconHelp, IconHelpActive
} from '../../../assets';

const DrawItem = ({ icon, active }) => {
  const Icon = () => {
    switch (icon) {
      case 'UMKM':
        return active ? <IconUmkmActive /> : <IconUmkm />;
      case 'Produk':
        return active ? <IconProductActive /> : <IconProduct />;
      case 'Logout':
        return <IconLogout />;
      case 'Help':
        return active ? <IconHelpActive width={18} /> : <IconHelp width={20} />;
      default:
        return <IconHome />;
    }
  };

  return (
    <Icon />
  );
};

export default DrawItem;
