import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Profile, List, Header, Gap
} from '../../components';
import { service, getUser } from '../../config';
import { ILNullPhoto } from '../../assets';
import { colors } from '../../utils';

const Umkm = ({ navigation }) => {
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    id: '',
    name: '',
    store_name: '',
    phone_number: '',
    address: ''
  });
  useEffect(() => {
    const unsubscribe = async () => {
      getUser('user').then((res) => {
        if (res.photo === null || res.store_name === null || res.address === null) {
          setPhoto(ILNullPhoto);
          const data = res;
          data.store_name = 'Belum Dilengkapi';
          data.address = 'Belum Dilengkapi';
          setProfile(res);
        } else {
          const source = { uri: res.photo };
          setPhoto(source);
          setProfile(res);
        }
      });
    };
    unsubscribe();
  }, []);
  return (
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
          <Profile source={photo} />
        </View>
        <Gap height={25} />
        <List type="icon" icon="umkm" name="Nama UMKM/Usaha" value={profile.store_name} />
        <List type="icon" icon="profile-light" name="Nama Pemilik" value={profile.name} />
        <List type="icon" icon="telp-light" name="No. Telp Pemilik" value={profile.phone_number} />
        <List type="icon" icon="loc-light" name="Lokasi" value={profile.address} />
      </View>
    </ScrollView>
    </View>
  );
};

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
