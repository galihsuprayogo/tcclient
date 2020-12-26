import React from 'react';
import {
  View, StyleSheet, AsyncStorage
} from 'react-native';
import { colors, useForm } from '../../utils';
import { getToken, setToken } from '../../config';
import { Button, Input, Gap } from '../../components';

const Verify = () => {
  const [form, setForm] = useForm({
    phone_otp: ''
  });
  const onContinue = () => {
    setToken('post', form);
    getToken();
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
