import React from 'react';
import {
  View, StyleSheet, AsyncStorage
} from 'react-native';
import { colors, useForm, showError } from '../../utils';
import { service } from '../../config';
import { Button, Input, Gap } from '../../components';

const Verify = ({ navigation }) => {
  const [form, setForm] = useForm({
    phone_otp: ''
  });
  const onContinue = () => {
    if (form.phone_otp === '') {
      showError('Tidak boleh kosong');
    } else {
      service.post('/api/auth/verify', {
        phone_otp: form.phone_otp
      }).then((response) => {
        AsyncStorage.setItem('@id', JSON.stringify(response.data.user.id));
        navigation.replace('Splash');
        // navigation.replace('Splash', { user_id: id });
      }).catch(() => {
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
                  // icon="telp"
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
    justifyContent: 'center',
    paddingHorizontal: 50,
  }
});
export default Verify;
