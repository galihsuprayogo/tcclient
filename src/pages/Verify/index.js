import React from 'react';
import {
  View, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  colors, useForm, showError, showSuccess
} from '../../utils';
import { service } from '../../config';
import { Button, Input, Gap } from '../../components';

const Verify = ({ navigation }) => {
  const [form, setForm] = useForm({
    phone_otp: ''
  });
  const onContinue = () => {
    if (form.phone_otp === '') {
      setForm('reset');
      showError('kode otp tidak boleh kosong');
    } else {
      service.post('/api/auth/verify', {
        phone_otp: form.phone_otp
      }).then((response) => {
        console.log(response.data.user);
        AsyncStorage.setItem('@id', JSON.stringify(response.data.user.id));
        AsyncStorage.setItem('@token', response.data.token);
        setForm('reset');
        showSuccess('Berhasil masuk ke akun anda');
        navigation.replace('Splash');
      }).catch(() => {
        setForm('reset');
        showError('kode otp tidak cocok');
      });
    }
  };
  return (
        <View style={styles.container}>
              <View style={styles.content}>
                <Input
                  placeholder="kode otp"
                  keyboardType="phone-pad"
                  scope="sign-up"
                  maxLength={4}
                  value={form.phone_otp}
                  onChangeText={(value) => setForm('phone_otp', value)}
                />
                <Gap height={15} />
                  <Button
                    title="Konfirmasi"
                    onPress={onContinue}
                    scope="sign-in"
                  />
              </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 50,
    paddingVertical: '20%'
  }
});
export default Verify;
