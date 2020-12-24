import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils';
import { Button, Input, Gap } from '../../components';

const Verify = () => {
  const onContinue = () => {
    alert('hai');
  };
  return (
        <View style={styles.container}>
              <View style={styles.content}>
                <Input
                  placeholder="kode otp"
                  keyboardType="phone-pad"
                  scope="sign-up"
                  maxLength={4}
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
