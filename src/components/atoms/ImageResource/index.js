import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  dummycoffe1,
  dummycoffe2,
  dummycoffe3,
  dummycoffe4,
}
  from '../../../assets';

const ImageResource = ({ image }) => {
  switch (image) {
    case 'dummycoffe1':
      return <Image source={dummycoffe1} style={styles.imageWrapper} />;
    case 'dummycoffe2':
      return <Image source={dummycoffe2} style={styles.imageWrapper} />;
    case 'dummycoffe3':
      return <Image source={dummycoffe3} style={styles.imageWrapper} />;
    case 'dummycoffe4':
      return <Image source={dummycoffe4} style={styles.imageWrapper} />;
  }
};

const styles = StyleSheet.create({
  imageWrapper: {
    height: 65,
    width: 80,
    borderRadius: 5,
  },
});

export default ImageResource;
