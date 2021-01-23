import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors, showError, useForm } from '../../utils';
import { service } from '../../config';
import { ILNullPhoto } from '../../assets';
import {
  Button, Gap, Header, Input, Profile,
  InputLocation
} from '../../components';

const UpdateUmkm = ({ navigation }) => {
  const [form, setForm] = useForm({
    name: ''
  });

  const [photoDB, setPhotoDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    launchImageLibrary({ includeBase64: true }, (response) => {
      console.log('response', response);
      if (response.didCancel || response.error) {
        showError('oops, sepertinya anda tidak memilih photo');
      } else {
        setPhotoDB(response.base64);
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
      const data = {
        name: form.name,
        photo: photoDB
      };
      service.post('/api/auth/decode', data, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json'
        },
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    } else {
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
                value={form.name}
                onChangeText={(value) => setForm('name', value)}
              />
              <Gap height={10} />
              <Input keyboardType="default" label="Nama Pemilik" icon="profile" type="inputForm" scope="umkm" />
              <Gap height={10} />
              <Input keyboardType="phone-pad" label="No. Telp Pemilik" phoneCode="+62" type="inputForm" scope="umkm" />
              <Gap height={10} />
          <View style={styles.locWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('MapCls')}>
                <InputLocation type="text1" icon="near" text="Ubah lewat peta [klik]" />
              </TouchableOpacity>
                <InputLocation type="text2" icon="loc2" text="Texas US 666, klik di atas untuk ubah" />
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
    paddingHorizontal: 30,
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
