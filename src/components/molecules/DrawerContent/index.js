import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View, Text, StyleSheet, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import {
  colors, fonts, showError, showSuccess
} from '../../../utils';
import {
  deleteId, deleteToken, service, getUser
} from '../../../config';
import { DrawItem, Gap } from '../..';
import { ILNullPhoto } from '../../../assets';
import { globalAction } from '../../../redux';

const DrawerContent = (props) => {
  const profile = useSelector((state) => state.profileReducer);
  const photo = useSelector((state) => state.photoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = async () => {
      await getUser('user').then((res) => {
        if (res.photo === null || res.store_name === null) {
          dispatch({ type: globalAction.SET_PHOTO, value: ILNullPhoto });
          const data = res;
          data.store_name = 'Belum Dilengkapi';
          dispatch({ type: globalAction.SET_PROFILE, value: res });
        } else {
          const source = { uri: res.photo };
          dispatch({ type: globalAction.SET_PHOTO, value: source });
          dispatch({ type: globalAction.SET_PROFILE, value: res });
        }
      });
    };
    unsubscribe();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await getUser('user').then((res) => {
        if (res.photo === null || res.store_name === null) {
          dispatch({ type: globalAction.SET_PHOTO, value: ILNullPhoto });
          const data = res;
          data.store_name = 'Belum Dilengkapi';
          dispatch({ type: globalAction.SET_PROFILE, value: res });
        } else {
          const source = { uri: res.photo };
          dispatch({ type: globalAction.SET_PHOTO, value: source });
          dispatch({ type: globalAction.SET_PROFILE, value: res });
        }
      }, 2000);
    });
    return () => clearTimeout(timeout);
  }, [profile]);

  const onClose = async () => {
    dispatch({ type: globalAction.SET_LOADING, value: true });
    const token = await AsyncStorage.getItem('@token');
    service.get('/api/auth/logout', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      deleteId();
      deleteToken();
      dispatch({ type: globalAction.SET_LOADING, value: false });
      showSuccess('Anda berhasil keluar');
      props.navigation.replace('Splash');
    }).catch(() => {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      showError('Terjadi kesalahan jaringan');
    });
  };

  return (
    <View style={styles.container}>
        <View style={styles.content}>
        <View>
          <Gap height={40} />
          <View style={styles.header}>
              <View>
                  <Image source={photo.photo} style={styles.image} />
              </View>
          <Gap width={15} />
              <View>
                  <Text style={styles.titleText}>
                    {' '}
                    { profile.store_name }
                    {' '}
                  </Text>
                  <Text style={styles.detailText}>
                    {' '}
                    Pemilik :
                    {' '}
                    {profile.name}
                    {' '}
                  </Text>
              </View>
          </View>
          <Gap height={30} />
          <View style={{ borderTopWidth: 2, borderColor: colors.fourth }} />
          <Gap height={30} />
          <DrawerItemList
            {...props}
            activeBackgroundColor={colors.fourth}
            inactiveBackgroundColor={colors.primary}
            activeTintColor={colors.primary}
            inactiveTintColor={colors.third}
            labelStyle={{ fontSize: 15, fontFamily: fonts.Akkurat.bold }}
          />
        </View>
          <View style={styles.footer}>
            <DrawerItem
              labelStyle={{
                fontSize: 18,
                fontFamily: fonts.sfProDisplay.bold
              }}
              label="Keluar"
              inactiveTintColor={colors.secondary}
              icon={() => <DrawItem icon="Logout" />}
              onPress={onClose}
            />
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2
  },
  content: {
    flex: 1,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 30,
    justifyContent: 'space-between'
  },
  footer: {
    borderTopWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 0,
  },
  titleText: {
    fontFamily: fonts.sfProDisplay.heavyItalic,
    fontSize: 15,
    color: colors.secondary
  },
  detailText: {
    fontFamily: fonts.Akkurat.normalItalic,
    fontSize: 14,
    color: 'white',
    maxWidth: 180
  },
  thirdText: {
    fontFamily: fonts.Akkurat.normalItalic,
    fontSize: 13,
    textAlign: 'center'
  }
});
export default DrawerContent;
