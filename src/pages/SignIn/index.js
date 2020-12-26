import React from 'react';
import {
  View, StyleSheet, ScrollView, AsyncStorage
} from 'react-native';
import { colors, useForm } from '../../utils';
import { AuthIn } from '../../config';
import {
  Button, Gap, Header, Input,
} from '../../components';

const SignIn = ({ navigation }) => {
  const [form, setForm] = useForm({
    phone_number: ''
  });

  const onContinue = () => {
    AuthIn('post', '/api/auth/login', form);
    navigation.navigate('Verify');
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
          icon="telp"
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
