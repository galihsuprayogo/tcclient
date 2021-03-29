import React from 'react';
import { useDispatch } from 'react-redux';
import {
  View, StyleSheet, ScrollView
} from 'react-native';
import {
  colors, useForm, showError, showSuccess
} from '../../utils';
import { service } from '../../config';
import {
  Button, Gap, Header, Input
} from '../../components';
import { globalAction } from '../../redux';

const SignIn = ({ navigation }) => {
  const [form, setForm] = useForm({
    phone_number: ''
  });
  const dispatch = useDispatch();

  const onContinue = () => {
    dispatch({ type: globalAction.SET_LOADING, value: true });
    if (form.phone_number === '') {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      setForm('reset');
      showError('No. HP tidak boleh kosong');
    } else if (form.phone_number.length < 10) {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      setForm('reset');
      showError('No. HP minimal 10 angka');
    } else if (/^\d+$/.test(form.phone_number)) {
      const firstIndex = form.phone_number.substring(0, 1);
      if (firstIndex === '0') {
        dispatch({ type: globalAction.SET_LOADING, value: false });
        setForm('reset');
        showError('Tidak perlu menggunakan 0 diawal');
      } else {
        service.post('/api/auth/login', {
          phone_number: form.phone_number
        }).then(() => {
          dispatch({ type: globalAction.SET_LOADING, value: false });
          setForm('reset');
          showSuccess('Berhasil masuk, silahkan masukkan kode otp');
          navigation.replace('Verify');
        }).catch(() => {
          dispatch({ type: globalAction.SET_LOADING, value: false });
          setForm('reset');
          showError('No. HP salah atau belum terdaftar');
        });
      }
    } else {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      setForm('reset');
      showError('Terdapat huruf atau karakter');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Masuk"
        type="icon-button"
        icon="icon-back-light"
        width={24}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Input
            placeholder="No. HP kamu"
            keyboardType="phone-pad"
            scope="sign-up"
            phoneCode="+62"
            value={form.phone_number}
            onChangeText={(value) => setForm('phone_number', value)}
          />
          <Gap height={15} />
          <Button
            title="silahkan masuk"
            onPress={onContinue}
            scope="sign-in"
          />
        </View>
      </ScrollView>
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
    paddingHorizontal: 35,
    paddingVertical: '20%'
  }
});
export default SignIn;
