import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  colors, showError, showSuccess, useForm
} from '../../utils';
import { ILNullPhoto } from '../../assets';
import { service } from '../../config';
import {
  Gap,
  Header,
  InputNumber,
  Profile,
  Button,
  DPicker,
  Loading
} from '../../components';

const InputProduct = ({ navigation }) => {
  const [form, setForm] = useForm({
    type: '',
    procedure: '',
    output: '',
    grade: ''
  });
  const [amount, setAmount] = useState(0);
  const [type] = useState([
    { label: 'Arabica', value: 'Arabica' },
    { label: 'Robusta', value: 'Robusta' }
  ]);
  const [procedure] = useState([
    { label: 'Fullwash', value: 'Fullwash' },
    { label: 'Semiwash', value: 'Semiwash' }
  ]);
  const [output] = useState([
    { label: 'Green Bean', value: 'Green Bean' },
    { label: 'Roasted Bean', value: 'Roasted Bean' }
  ]);
  const [grade] = useState([
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' }
  ]);

  const [loading, setLoading] = useState(false);
  const [photoDB, setPhotoDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    launchImageLibrary({
      includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200
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

  const onContinue = async () => {
    setLoading(true);
    if (hasPhoto) {
      const token = await AsyncStorage.getItem('@token');
      console.log(token);
      const data = {
        type: form.type,
        procedure: form.procedure,
        output: form.output,
        grade: form.grade,
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
        console.log(response);
        setLoading(false);
        showSuccess('Berhasil menambahkan produk baru');
      }).catch((error) => {
        console.log(error);
        setLoading(false);
        showError('Terjadi kesalahan');
      });
    } else {
      setLoading(false);
      showError('photo tidak boleh kosong');
    }
  };
  return (
    <>
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
                    data={type}
                    value={form.type}
                    onChangeItem={(item) => setForm('type', item.value)}
                  />
                  <Gap height={10} />
                  <DPicker
                    title="Cara Pengolahan"
                    data={procedure}
                    value={form.procedure}
                    onChangeItem={(item) => setForm('procedure', item.value)}
                  />
                  <Gap height={10} />
                  <DPicker
                    title="Hasil Pengolahan"
                    data={output}
                    value={form.output}
                    onChangeItem={(item) => setForm('output', item.value)}
                  />
                  <Gap height={10} />
                  <DPicker
                    title="Grade"
                    data={grade}
                    value={form.grade}
                    onChangeItem={(item) => setForm('grade', item.value)}
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
      {loading && <Loading />}
    </>
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
