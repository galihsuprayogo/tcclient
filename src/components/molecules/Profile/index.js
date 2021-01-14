import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ILNullPhoto } from '../../../assets';
import { colors } from '../../../utils';
import { Button } from '../..';

const Profile = ({ icon, onPress }) => (
  <View style={styles.imageWrapper}>
    <Image source={ILNullPhoto} style={styles.image} />
    {icon && (
    <View style={styles.actionPhoto}>
      <Button
        type="icon-button"
        icon={icon}
        onPress={onPress}
      />
    </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: colors.secondary,
    height: 130,
    width: 130,
    borderWidth: 2,
    borderRadius: 130 / 2,
    // borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 155,
    width: 155,
  },
  actionPhoto: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
export default Profile;
