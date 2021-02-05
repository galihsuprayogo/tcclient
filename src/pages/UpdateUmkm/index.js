import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors, showError, useForm } from '../../utils';
import { service, storeUser, getUser } from '../../config';
import { ILNullPhoto } from '../../assets';
import {
  Button, Gap, Header, Input, Profile,
  InputLocation
} from '../../components';

const UpdateUmkm = ({ navigation }) => {
  const [form, setForm] = useForm({
    store_name: '',
    address: ''
  });
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    id: '',
    name: '',
    store_name: '',
    phone_number: '',
    address: ''
  });

  const [status, setStatus] = useState(false);
  const [photoDB, setPhotoDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);

  useEffect(() => {
    getUser('user').then((res) => {
      console.log(res);
      if (res.photo === null || res.address === null) {
        setPhoto(ILNullPhoto);
        setProfile(res);
        setForm('store_name', '');
        setForm('address', '[belum dilengkapi, klik di atas]');
      } else {
        const source = { uri: res.photo };
        setPhoto(source);
        setPhotoDB(res.photo);
        setForm('store_name', res.store_name);
        setForm('address', res.address);
        setProfile(res);
        setHasPhoto(true);
      }
    });
  }, []);

  const getImage = () => {
    launchImageLibrary({
      includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200
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
  const onContinue = async () => {
    if (hasPhoto) {
      const token = await AsyncStorage.getItem('@token');
      console.log(token);
      const data = {
        name: form.store_name,
        photo: photoDB,
        address: form.address
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
          photo: photoDB,
          id: response.data.user.id,
          name: response.data.user.name,
          store_name: form.store_name,
          phone_number: response.data.user.phone_number,
          address: form.address
        };
        // console.log(response);
        setHasPhoto(true);
        storeUser('user', data);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      showError('photo tidak boleh kosong');
    }
  };

  const onMap = () => {
    navigation.navigate('MapCls');
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
                value={form.store_name}
                onChangeText={(value) => setForm('store_name', value)}
              />
              <Gap height={10} />
              <Input
                keyboardType="default"
                label="Nama Pemilik"
                icon="profile"
                type="inputForm"
                scope="umkm"
                value={profile.name}
                editable={false}
              />
              <Gap height={10} />
              <Input
                keyboardType="phone-pad"
                label="No. Telp Pemilik"
                phoneCode="+62"
                type="inputForm"
                scope="umkm"
                value={profile.phone_number}
                editable={false}
              />
              <Gap height={10} />
              <View style={styles.locWrapper}>
                  <TouchableOpacity onPress={onMap}>
                    <InputLocation type="text1" icon="near" text="Ubah lewat peta [klik]" />
                  </TouchableOpacity>
                    <InputLocation type="text2" icon="loc2" text={profile.address} />
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
