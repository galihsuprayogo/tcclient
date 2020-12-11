import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Profile, List, Header, Gap
} from '../../components';
import { colors } from '../../utils';

const Umkm = ({ navigation }) => (
  <View style={styles.container}>
    <Header
      title="Profil UMKM"
      type="icon-button"
      icon="open-drawer"
      width={24}
      onPress={() => navigation.openDrawer()}
    />
    <View style={styles.content}>
      <View style={styles.subDivContent}>
        <View style={{ alignItems: 'center' }}>
          <Profile />
        </View>
        <Gap height={25} />
        <List type="icon" icon="umkm" name="Nama UMKM/Usaha" value="OS Coffe" />
        <List type="icon" icon="profile-light" name="Nama Pemilik" value="David Bowie" />
        <List type="icon" icon="telp-light" name="No. Telp Pemilik" value="xxxxxxxxxxxx" />
        <List type="icon" icon="loc-light" name="Lokasi" value="Kledung, Temanggung" />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  content: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  subDivContent: {
    backgroundColor: colors.secondary,
    paddingVertical: 50,
    marginHorizontal: 40,
    borderRadius: 10
  }
});

export default Umkm;
