import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { ILNullPhoto } from '../../assets';
import {
  Button,
  DPicker, Gap,
  Header,
  InputNumber,
  Profile
} from '../../components';
import { service, storeUser } from '../../config';
import {
  colors, showError, showSuccess
} from '../../utils';

const InputProduct = ({ navigation }) => {
  const [type, setType] = useState('-- Pilih --');
  const [procedure, setProcedure] = useState('-- Pilih --');
  const [output, setOutput] = useState('-- Pilih --');
  const [grade, setGrade] = useState('-- Pilih --');
  const [amount, setAmount] = useState(0);
  const [typeData] = useState([
    { label: '-- Pilih --', value: '-- Pilih --' },
    { label: 'Arabica', value: 'Arabica' },
    { label: 'Robusta', value: 'Robusta' }
  ]);
  const [procedureData] = useState([
    { label: '-- Pilih --', value: '-- Pilih --' },
    { label: 'Fullwash', value: 'Fullwash' },
    { label: 'Semiwash', value: 'Semiwash' }
  ]);
  const [outputData] = useState([
    { label: '-- Pilih --', value: '-- Pilih --' },
    { label: 'Green Bean', value: 'Green Bean' },
    { label: 'Roasted Bean', value: 'Roasted Bean' }
  ]);
  const [gradeData] = useState([
    { label: '-- Pilih --', value: '-- Pilih --' },
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' }
  ]);

  const dispatch = useDispatch();
  const [photoDB, setPhotoDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    launchImageLibrary({
      includeBase64: true, quality: 1, maxWidth: 800, maxHeight: 800
    }, (response) => {
      if (response.didCancel || response.error) {
        showError('oops, sepertinya anda tidak memilih photo');
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

  const resetForm = () => {
    dispatch({ type: 'SET_LOADING', value: false });
    setPhoto(ILNullPhoto);
    setHasPhoto(false);
    setAmount(0);
    setType('-- Pilih --');
    setProcedure('-- Pilih --');
    setOutput('-- Pilih --');
    setGrade('-- Pilih --');
  };
  const onContinue = async () => {
    dispatch({ type: 'SET_LOADING', value: true });
    if (hasPhoto) {
      const token = await AsyncStorage.getItem('@token');
      const data = {
        type,
        procedure,
        output,
        grade,
        price: amount,
        photo: photoDB
      };
      service.post('/api/auth/createProduct', data, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json'
        },
      }).then((response) => {
        const temp = response.data.products;
        resetForm();
        storeUser('products', temp);
        showSuccess('Berhasil menambahkan produk baru');
      }).catch((error) => {
        console.log(error);
        resetForm();
        showError('Terjadi kesalahan');
      });
    } else {
      resetForm();
      showError('photo tidak boleh kosong');
    }
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
                  <DPicker
                    title="Jenis Kopi (Arabica/Robusta)"
                    data={typeData}
                    value={type}
                    onChangeItem={(item) => setType(item.value)}
                  />
                  <Gap height={10} />
                  <DPicker
                    title="Cara Pengolahan"
                    data={procedureData}
                    value={procedure}
                    onChangeItem={(item) => setProcedure(item.value)}
                  />
                  <Gap height={10} />
                  <DPicker
                    title="Hasil Pengolahan"
                    data={outputData}
                    value={output}
                    onChangeItem={(item) => setOutput(item.value)}
                  />
                  <Gap height={10} />
                  <DPicker
                    title="Grade"
                    data={gradeData}
                    value={grade}
                    onChangeItem={(item) => setGrade(item.value)}
                  />
                  <Gap height={10} />
                  <InputNumber
                    title="Harga"
                    keyboardType="phone-pad"
                    price={amount}
                    setPrice={setAmount}
                  />
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
