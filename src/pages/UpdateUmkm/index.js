import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  colors, showError, showSuccess,
} from '../../utils';
import { service, storeUser, getUser } from '../../config';
import { ILNullPhoto } from '../../assets';
import {
  Button, Gap, Header, Input, Profile,
  InputLocation,
} from '../../components';
import { globalAction } from '../../redux';

const UpdateUmkm = ({ navigation }) => {
  const profile = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();

  const timeoutRef = useRef(null);
  const [storeName, setStoreName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [photoDB, setPhotoDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);

  const getImage = () => {
    launchImageLibrary({
      includeBase64: true, quality: 0.5, maxWidth: 400, maxHeight: 400
    }, (response) => {
      console.log('response', response);
      if (response.didCancel || response.error) {
        showError('oops, sepertinya anda tidak memilih photo');
      } else {
        const base64 = `data:${response.type};base64, ${response.base64}`;
        setPhotoDB(base64);
        const source = { uri: response.uri };
        setPhoto(source);
        setHasPhoto(true);
      }
    });
  };

  const removeImage = () => {
    setPhoto(ILNullPhoto);
    setHasPhoto(false);
  };

  useEffect(() => {
    const unsubscribe = async () => {
      await getUser('user').then((res) => {
        if (res.photo === null || res.address === null || res.store_name === null) {
          const data = res;
          data.store_name = 'Belum Dilengkapi';
          data.address = '[Belum dilengkapi, klik di atas]';
          dispatch({ type: globalAction.SET_PROFILE, value: res });
          setPhoto(ILNullPhoto);
          setHasPhoto(false);
          storeUser('user', res);
        } else {
          const source = { uri: res.photo };
          setPhoto(source);
          setPhotoDB(res.photo);
          setStoreName(res.store_name);
          setName(res.name);
          setPhone(res.phone_number);
          setAddress(res.address);
          dispatch({ type: globalAction.SET_PROFILE, value: res });
          setHasPhoto(true);
        }
      });
    };
    unsubscribe();
  }, []);

  const reloadImage = async () => {
    await getUser('user').then((res) => {
      if (res.photo === null) {
        setPhoto(ILNullPhoto);
        dispatch({ type: globalAction.SET_PROFILE, value: res });
        setHasPhoto(true);
      } else {
        const source = { uri: res.photo };
        setPhoto(source);
        setPhotoDB(res.photo);
        dispatch({ type: globalAction.SET_PROFILE, value: res });
        setHasPhoto(true);
      }
    });
  };

  const reloadStoreName = async () => {
    await getUser('user').then((res) => {
      setStoreName(res.store_name);
      dispatch({ type: globalAction.SET_PROFILE, value: res });
    });
  };

  const reloadName = async () => {
    await getUser('user').then((res) => {
      setName(res.name);
      dispatch({ type: globalAction.SET_PROFILE, value: res });
    });
  };

  const reloadPhone = async () => {
    await getUser('user').then((res) => {
      setPhone(res.phone_number);
      dispatch({ type: globalAction.SET_PROFILE, value: res });
    });
  };

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      storeName === '' ? reloadStoreName() : null;
      name === '' ? reloadName() : null;
      phone === '' ? reloadPhone() : null;
      hasPhoto === false ? reloadImage() : null;
    }, 10000);
  }, [storeName, name, phone, hasPhoto]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await getUser('user').then((res) => {
        setAddress(res.address);
        dispatch({ type: globalAction.SET_PROFILE, value: res });
      }, 2000);
    });
    return () => clearTimeout(timeout);
  }, [profile]);

  const onContinue = async () => {
    dispatch({ type: globalAction.SET_LOADING, value: true });
    const firstIndex = phone.substring(0, 1);
    const phoneLength = phone.length;
    if (hasPhoto && firstIndex !== '0' && phoneLength >= 10) {
      const token = await AsyncStorage.getItem('@token');
      const data = {
        store_name: storeName,
        photo: photoDB,
        address,
        latitude: profile.latitude,
        longitude: profile.longitude,
        name,
        phone_number: phone
      };
      service.post('/api/auth/store', data, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json'
        },
      }).then((response) => {
        const data = {
          photo: response.data.store.image,
          id: response.data.user.id,
          name: response.data.user.name,
          store_name: response.data.store.name,
          phone_number: response.data.user.phone_number,
          address: response.data.store.address,
          latitude: response.data.store.latitude,
          longitude: response.data.store.longitude,
        };
        storeUser('user', data);
        dispatch({ type: globalAction.SET_LOADING, value: false });
        showSuccess('Berhasil mengubah profil umkm');
      }).catch((error) => {
        console.log(error);
        dispatch({ type: globalAction.SET_LOADING, value: false });
        showError('Terjadi kesalahan');
      });
    } else if (address === '[Belum dilengkapi, klik di atas]') {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      showError('Mohon lengkapi alamat');
    } else if (firstIndex === '0') {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      showError('No. Telp tidak memakai awalan 0');
    } else if (phoneLength < 10) {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      showError('Panjang No. Telp Kurang');
    } else {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      showError('photo tidak boleh kosong');
    }
  };

  return (
  <View style={styles.container}>
    <Header
      title="Edit profil UMKM"
    />
    <ScrollView showVerticalScrollIndicator={false} style={styles.content}>
      <View style={styles.subDivContent}>
          <View style={{ alignItems: 'center' }}>
            {hasPhoto && <Profile icon="remove-photo" onPress={removeImage} source={photo} />}
            {!hasPhoto && <Profile icon="add-photo" onPress={getImage} source={photo} />}
          </View>
              <Gap height={25} />
              <Input
                keyboardType="default"
                label="Nama UMKM/Usaha"
                icon="umkm-dark"
                type="inputForm"
                scope="umkm"
                value={storeName}
                onChangeText={(value) => setStoreName(value)}
              />
              <Gap height={10} />
              <Input
                keyboardType="default"
                label="Nama Pemilik"
                icon="profile"
                type="inputForm"
                scope="umkm"
                value={name}
                onChangeText={(value) => setName(value)}
              />
              <Gap height={10} />
              <Input
                keyboardType="phone-pad"
                label="No. Telp Pemilik"
                phoneCode="+62"
                type="inputForm"
                scope="umkm"
                value={phone}
                onChangeText={(value) => setPhone(value)}
              />
              <Gap height={10} />
              <View style={styles.locWrapper}>
                  <TouchableOpacity onPress={() => navigation.navigate('MapPoint')}>
                    <InputLocation type="text1" icon="near" text="Ubah lewat peta [klik]" />
                  </TouchableOpacity>
                    <InputLocation type="text2" icon="loc2" text={address} />
              </View>
              <Gap height={20} />
          <Button title="Simpan" scope="sign-in" onPress={onContinue} />
      </View>
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  subDivContent: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingVertical: 30,
    marginVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  locWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.secondary,
  }
});
export default UpdateUmkm;
