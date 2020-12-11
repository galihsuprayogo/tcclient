import React from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import { colors } from '../../utils';
import {
  Button, Gap, Header, Input, Profile,
  InputLocation
} from '../../components';

const UpdateUmkm = ({ navigation }) => (
  <View style={styles.container}>
    <Header
      title="Edit profil UMKM"
    />
    <ScrollView showVerticalScrollIndicator={false} style={styles.content}>
      <View style={styles.subDivContent}>
          <View style={{ alignItems: 'center' }}>
              <Profile icon="add-photo" />
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
          <View style={{ flexDirection: 'row' }}>
              <Button title="Simpan" scope="get-in" onPress={() => alert('meki')} />
                <Gap width={10} />
              <Button title="Batal" scope="get-in" onPress={() => alert('meki')} />
          </View>
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  subDivContent: {
    backgroundColor: colors.secondary,
    paddingVertical: 50,
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
