import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
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
  colors, showError, showSuccess, unFormatNumbro
} from '../../utils';
import { globalAction } from '../../redux';

const InputProduct = ({ navigation }) => {
  const categories = useSelector((state) => state.categoriesReducer);
  const category = useSelector((state) => state.setCategoryReducer);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const [photoDB, setPhotoDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    launchImageLibrary({
      includeBase64: true, quality: 0.5, maxWidth: 400, maxHeight: 400
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
    dispatch({ type: globalAction.SET_LOADING, value: false });
    setPhoto(ILNullPhoto);
    setHasPhoto(false);
    setAmount(0);
    dispatch({ type: globalAction.SET_TYPE, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_PROCEDURE, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_OUTPUT, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_GRADE, value: '-- Pilih --' });
  };

  const onContinue = async () => {
    dispatch({ type: globalAction.SET_LOADING, value: true });
    if (hasPhoto && category.type !== '-- Pilih --' && category.procedure !== '-- Pilih --'
    && category.output !== '-- Pilih --' && category.grade !== '-- Pilih --') {
      const token = await AsyncStorage.getItem('@token');
      const price = unFormatNumbro(amount);
      const data = {
        type: category.type,
        procedure: category.procedure,
        output: category.output,
        grade: category.grade,
        price,
        photo: photoDB
      };
      service.post('/api/auth/createProduct', data, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.data.address === null) {
          showError('Silahkan lengkapi dahulu profile UMKM');
        }
        if (response.data.address !== null) {
          if (response.data.isExist === true) {
            showError('oops, produk sudah tersedia');
          } else {
            storeUser('products', response.data.products);
            showSuccess('Berhasil menambahkan produk baru');
          }
        }
        resetForm();
      }).catch((error) => {
        console.log(error);
        resetForm();
        showError('Terjadi kesalahan');
      });
    } else if (category.type === '-- Pilih --' || category.procedure === '-- Pilih --'
    || category.output === '-- Pilih --' || category.grade === '-- Pilih --') {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      showError('Form tidak boleh kosong');
    } else {
      dispatch({ type: globalAction.SET_LOADING, value: false });
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
                    data={categories.type}
                    value={category.type}
                    onChangeItem={(item) => dispatch({ type: globalAction.SET_TYPE, value: item.value })}
                  />
                  <Gap height={10} />
                  <DPicker
                    title="Cara Pengolahan"
                    data={categories.procedure}
                    value={category.procedure}
                    onChangeItem={(item) => dispatch({ type: globalAction.SET_PROCEDURE, value: item.value })}
                  />
                  <Gap height={10} />
                  <DPicker
                    title="Hasil Pengolahan"
                    data={categories.output}
                    value={category.output}
                    onChangeItem={(item) => dispatch({ type: globalAction.SET_OUTPUT, value: item.value })}
                  />
                  <Gap height={10} />
                  <DPicker
                    title="Grade"
                    data={categories.grade}
                    value={category.grade}
                    onChangeItem={(item) => dispatch({ type: globalAction.SET_GRADE, value: item.value })}
                  />
                  <Gap height={10} />
                  <InputNumber
                    title="Harga (kg)"
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
