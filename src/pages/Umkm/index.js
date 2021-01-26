import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Profile, List, Header, Gap
} from '../../components';
import { ILNullPhoto } from '../../assets';
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
    <ScrollView showVerticalScrollIndicator={false} style={styles.content}>
      <View style={styles.subDivContent}>
        <View style={{ alignItems: 'center' }}>
          <Profile source={ILNullPhoto} />
        </View>
        <Gap height={25} />
        <List type="icon" icon="umkm" name="Nama UMKM/Usaha" value="OS Coffe" />
        <List type="icon" icon="profile-light" name="Nama Pemilik" value="David Bowie" />
        <List type="icon" icon="telp-light" name="No. Telp Pemilik" value="xxxxxxxxxxxx" />
        <List type="icon" icon="loc-light" name="Lokasi" value="Kledung, Temanggung" />
      </View>
    </ScrollView>
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
    paddingHorizontal: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  subDivContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 50,
    marginVertical: 30,
    borderRadius: 10
  }
});

export default Umkm;
