import React from 'react';
import {
  View, Image, StyleSheet, TouchableOpacity
} from 'react-native';
import { colors } from '../../../utils';
import { Button } from '../..';

const Profile = ({ icon, onPress, source }) => (
  <TouchableOpacity style={styles.imageWrapper} onPress={onPress}>
    <Image source={source} style={styles.image} />
    {icon && (
    <View style={styles.actionPhoto}>
      <Button
        type="icon-button"
        icon={icon}
        onPress={onPress}
      />
    </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: colors.secondary,
    height: 130,
    width: 130,
    borderWidth: 2,
    borderRadius: 130 / 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    // resizeMode: 'contain'
  },
  actionPhoto: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
export default Profile;
