import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ImageResource = ({ source }) => <Image source={source} style={styles.imageWrapper} />;

const styles = StyleSheet.create({
  imageWrapper: {
    height: '60%',
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
});

export default ImageResource;
