import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../utils';
import { ILNullPhoto } from '../../assets';
import {
  Gap,
  Header,
  InputNumber,
  Profile,
  Button,
  CoffeePicker,
} from '../../components';

const InputProduct = ({ navigation }) => {
  const [coffees] = useState([
    {
      id: 1,
      type: 'Arabica',
      procedure: 'Fullwash',
      output: 'Roasted bean',
      grade: 'A',
    },
    {
      id: 2,
      type: 'Robusta',
      procedure: 'Wine',
      output: 'Green Bean',
      grade: 'B',
    },
  ]);

  const [photoDB, setPhotoDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    launchImageLibrary({ includeBase64: true }, (response) => {
      console.log('response', response);
      if (response.didCancel || response.error) {
        showError('oops, sepertinya anda tidak memilih photo');
      } else {
        setPhotoDB(response.base64);
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

  const onContinue = () => {
    alert('not yet');
  };
  return (
    <View style={styles.container}>
      <Header
        title="Tambah Produk"
      />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          <View style={styles.subDivContent}>
              <View style={{ alignItems: 'center' }}>
              {hasPhoto && <Profile icon="remove-photo" onPress={removeImage} source={photo} />}
              {!hasPhoto && <Profile icon="add-photo" onPress={getImage} source={photo} />}
              </View>
              <Gap height={25} />
                <CoffeePicker
                  title="Jenis Kopi (Arabica/Robusta)"
                  datacoffees={coffees}
                  target="type"
                />
                <Gap height={10} />
                <CoffeePicker
                  title="Cara Pengolahan"
                  datacoffees={coffees}
                  target="procedure"
                />
                <Gap height={10} />
                <CoffeePicker
                  title="Hasil Pengolahan"
                  datacoffees={coffees}
                  target="output"
                />
                <Gap height={10} />
                <CoffeePicker
                  title="Grade"
                  datacoffees={coffees}
                  target="grade"
                />
                <Gap height={10} />
                <InputNumber title="Harga" />
              <Gap height={25} />
              <View>
                <Button title="Simpan" scope="sign-in" onPress={onContinue} />
              </View>
          </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  subDivContent: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingVertical: 30,
    marginVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 10
  }
});

export default InputProduct;
