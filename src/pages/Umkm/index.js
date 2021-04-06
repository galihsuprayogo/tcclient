import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View, StyleSheet, ScrollView, BackHandler
} from 'react-native';
import {
  Profile, List, Header, Gap
} from '../../components';
import { getUser } from '../../config';
import { ILNullPhoto } from '../../assets';
import { colors } from '../../utils';
import { globalAction } from '../../redux';

const Umkm = ({ navigation }) => {
  const profile = useSelector((state) => state.profileReducer);
  const photo = useSelector((state) => state.photoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = async () => {
      await getUser('user').then((res) => {
        if (res.photo === null || res.store_name === null || res.address === null) {
          const data = res;
          data.store_name = 'Belum Dilengkapi';
          data.address = 'Belum Dilengkapi';
          dispatch({ type: globalAction.SET_PROFILE, value: res });
          dispatch({ type: globalAction.SET_PHOTO, value: ILNullPhoto });
        } else {
          const source = { uri: res.photo };
          dispatch({ type: globalAction.SET_PROFILE, value: res });
          dispatch({ type: globalAction.SET_PHOTO, value: source });
        }
      });
    };
    unsubscribe();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await getUser('user').then((res) => {
        if (res.photo === null || res.store_name === null || res.address === null) {
          const data = res;
          data.store_name = 'Belum Dilengkapi';
          data.address = 'Belum Dilengkapi';
          dispatch({ type: globalAction.SET_PROFILE, value: res });
          dispatch({ type: globalAction.SET_PHOTO, value: ILNullPhoto });
        } else {
          const source = { uri: res.photo };
          dispatch({ type: globalAction.SET_PROFILE, value: res });
          dispatch({ type: globalAction.SET_PHOTO, value: source });
        }
      }, 2000);
    });
    return () => clearTimeout(timeout);
  }, [profile]);

  useEffect(() => {
    BackHandler.addEventListener('backPress', onBackHandling);
    return () =>
      BackHandler.removeEventListener('backPress', onBackHandling);
  });

  const onBackHandling = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
    <Header
      title="Profil UMKM"
      type="icon-button"
      icon="open-drawer"
      width={24}
      onPress={() => navigation.openDrawer()}
    />
    <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
      <View style={styles.subDivContent}>
        <View style={{ alignItems: 'center' }}>
          <Profile source={photo.photo} />
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
    marginVertical: 50,
    borderRadius: 10
  }
});

export default Umkm;
