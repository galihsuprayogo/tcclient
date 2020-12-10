import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils';
import {
  Button, Gap, Header, Input,
} from '../../components';

const SignUp = ({ navigation }) => (
  <View style={styles.container}>
    <Header
      title="Daftar"
      type="icon-button"
      icon="icon-back-light"
      width={24}
      onPress={() => navigation.goBack()}
    />
    <View style={styles.content}>
      <Text style={styles.text}>
        Daftarkan nomor HP kamu untuk
        mulai masuk ke Aplikasi !
      </Text>
      <Gap height={20} />
      <Input
        placeholder="Nama Lengkap Kamu"
        keyboardType="default"
      />
      <Gap height={10} />
      <Input
        placeholder="Nomor HP Kamu"
        keyboardType="phone-pad"
      />
      <Gap height={25} />
      <Button title="Daftar" onPress={() => navigation.replace('SignIn')} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  text: {
    fontFamily: fonts.Akkurat.normal,
    fontSize: 18,
  },
});
export default SignUp;
