import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Profile, Button, Gap } from '../..';
import { ILNullPhoto } from '../../../assets';

const Helper = () => {
  const [photoDB, setPhotoDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    launchImageLibrary({
      includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200
    }, (response) => {
      console.log('response', response);
      if (response.didCancel || response.error) {
        console.log('did cancel');
      } else {
        const base64 = `data:${response.type};base64, ${response.base64}`;
        setPhotoDB(base64);
        const source = { uri: response.uri };
        setPhoto(source);
        setHasPhoto(true);
      }
    });
  };
  const removeImage = () => {
    setPhoto(ILNullPhoto);
    setHasPhoto(false);
  };

  const onPressButton = () => {
    console.log(photoDB);
    setPhoto(ILNullPhoto);
    setHasPhoto(false);
  };

  return (
          <View style={styles.container}>
                    {hasPhoto && <Profile icon="remove-photo" onPress={removeImage} source={photo} />}
                    {!hasPhoto && <Profile icon="add-photo" onPress={getImage} source={photo} />}
                    <Gap height={10} />
                    <Button title="Simpan" scope="sign-in" onPress={onPressButton} />
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1
  }
});

export default Helper;
