import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import { colors } from '../../utils';
import {
  Button, Gap, Header, Input, Profile,
  InputLocation
} from '../../components';

const UpdateUmkm = ({ navigation }) => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const onContinue = () => {
    alert('not yet');
  };
  return (
    <View style={styles.container}>
    <Header
      title="Edit profil UMKM"
    />
    <ScrollView showVerticalScrollIndicator={false} style={styles.content}>
      <View style={styles.subDivContent}>
          <View style={{ alignItems: 'center' }}>
            {hasPhoto && <Profile icon="remove-photo" onPress={() => alert('not yet')} />}
            {!hasPhoto && <Profile icon="add-photo" onPress={() => alert('remove')} />}
          </View>
              <Gap height={25} />
              <Input keyboardType="default" label="Nama UMKM/Usaha" icon="umkm-dark" type="inputForm" scope="umkm" />
              <Gap height={10} />
              <Input keyboardType="default" label="Nama Pemilik" icon="profile" type="inputForm" scope="umkm" />
              <Gap height={10} />
              <Input keyboardType="phone-pad" label="No. Telp Pemilik" icon="telp" type="inputForm" scope="umkm" />
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
    paddingHorizontal: 40,
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
