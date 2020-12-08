import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../utils';
import {
  Button, Gap, Header, Input, Profile,
} from '../../components';

const UpdateUmkm = ({ navigation }) => (
  <View style={styles.container}>
    <Header
      title="Edit profil UMKM"
      type="icon-button"
      icon="icon-back-light"
      width={24}
      onPress={() => navigation.goBack()}
    />

      <View style={styles.content}>
          <ScrollView showVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center' }}>
              <Profile icon="add-photo" />
            </View>
            <Gap height={25} />
            <Input keyboardType="default" label="Nama UMKM/Usaha" type="inputForm" />
            <Gap height={10} />
            <Input keyboardType="phone-pad" label="NPWP" type="inputForm" />
            <Gap height={10} />
            <Input keyboardType="phone-pad" label="No. Telp Pemilik" type="inputForm" />
            <Gap height={10} />
            <Input keyboardType="default" label="lokasi" type="inputForm" />
            <Gap height={30} />
            <View style={styles.buttonWrapper}>
              <Button title="Simpan" onPress={() => alert('boleh-boleh')} />
            </View>
          </ScrollView>
      </View>
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
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 40,
  },
  buttonWrapper: {
    paddingHorizontal: 15,
  },
});
export default UpdateUmkm;
