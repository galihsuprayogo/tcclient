import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../utils';
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Input
          placeholder="No. HP kamu"
          keyboardType="phone-pad"
          scope="sign-up"
          icon="telp"
        />
        <Gap height={15} />
        <Button
          title="silahkan masuk"
          onPress={() => navigation.replace('DrawerApp')}
          scope="sign-in"
        />
      </View>
    </ScrollView>
  </View>
);

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
