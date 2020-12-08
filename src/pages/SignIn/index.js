import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils';
import {
  Button, Gap, Header, Input,
} from '../../components';

const SignIn = ({ navigation }) => (
  <View style={styles.container}>
    <Header
      title="Masuk"
      type="icon-button"
      icon="icon-back-light"
      width={24}
      onPress={() => navigation.goBack()}
    />
    <View style={styles.content}>
      <Text style={styles.text}>
        Silahkan masuk dengan nomor HP kamu yang terdaftar
      </Text>
      <Gap height={20} />
      <Input
        placeholder="No. HP kamu"
        keyboardType="phone-pad"
      />
      <Gap height={25} />
      <Button
        title="Masuk"
        onPress={() => navigation.replace('DrawerApp')}
      />
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
    fontFamily: fonts.sfProDisplay.lightItalic,
    fontSize: 20,
  },
});
export default SignIn;
