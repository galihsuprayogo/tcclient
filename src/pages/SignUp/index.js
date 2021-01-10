import React from 'react';
import {
  View, Text, StyleSheet, ScrollView
} from 'react-native';
import { service } from '../../config';
import {
  colors, fonts, useForm, showError, showSuccess
} from '../../utils';
import {
  Button, Gap, Header, Input,
} from '../../components';

const SignUp = ({ navigation }) => {
  const [form, setForm] = useForm({
    name: '',
    phone_number: ''
  });

  const onContinue = () => {
    if (form.name === '' || form.phone_number === '') {
      setForm('reset');
      showError('form tidak boleh kosong');
    } else {
      const firstIndex = form.phone_number.substring(0, 1);
      if (firstIndex === '0') {
        setForm('reset');
        showError('Tidak perlu menggunakan 0 diawal');
      } else {
        service.post('/api/auth/signup', {
          name: form.name,
          phone_number: form.phone_number
        }).then(() => {
          setForm('reset');
          showSuccess('nomor HP anda berhasil didaftarkan');
          navigation.replace('SignIn');
        }).catch(() => {
          setForm('reset');
          showError('Terjadi kesalahan jaringan');
        });
      }
    }
  };
  return (
    <View style={styles.container}>
        <Header
          title="Daftar"
          type="icon-button"
          icon="icon-back-light"
          scope="sign-up"
          width={24}
          onPress={() => navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.text}>
                Daftarkan nomor HP kamu untuk
                mulai masuk ke Aplikasi !
            </Text>
          </View>
          <Gap height={20} />
          <View style={styles.footer}>
            <View>
              <Gap height={20} />
              <Input
                placeholder="Nama Lengkap Kamu"
                scope="sign-up"
                keyboardType="default"
                icon="profile"
                value={form.name}
                onChangeText={(value) => setForm('name', value)}
              />
              <Gap height={10} />
              <Input
                placeholder="Nomor HP Kamu"
                scope="sign-up"
                keyboardType="phone-pad"
                phoneCode="+62"
                value={form.phone_number}
                onChangeText={(value) => setForm('phone_number', value)}
              />
              <Gap height={25} />
              <Button title="Daftar" onPress={onContinue} />
            </View>
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
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: '20%',
  },
  footer: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'flex-start',
    paddingHorizontal: 40,
    paddingTop: '6%',
    paddingBottom: '200%',
    borderRadius: 15
  },
  text: {
    textAlign: 'left',
    fontFamily: fonts.Akkurat.bold,
    color: colors.text.secondary,
    fontSize: 28,
  },
});
export default SignUp;
