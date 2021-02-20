import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet, ScrollView, View, BackHandler
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { ILNullPhoto } from '../../assets';
import {
  colors, showError, showSuccess, unFormatNumbro, formatNumbro
} from '../../utils';
import { getUser, storeUser, service } from '../../config';
import {
  Header, Profile, Gap, DPicker, InputNumber, Button
} from '../../components';
import { globalAction } from '../../redux';

const UpdateProduct = ({ navigation, route }) => {
  const products = useSelector((state) => state.productReducer);
  const categories = useSelector((state) => state.categoriesReducer);
  const category = useSelector((state) => state.setCategoryReducer);
  const dispatch = useDispatch();

  const [id] = useState(route.params?.id);
  const [index] = useState(route.params?.index);
  const [photoDB, setPhotoDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [amount, setAmount] = useState(0);

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

  useEffect(() => {
    const unsubscribe = setTimeout(async () => {
      await getUser('products').then((res) => {
        dispatch({ type: globalAction.SET_PRODUCT, value: res });
        dispatch({ type: globalAction.SET_TYPE, value: products.product[index].type });
        dispatch({ type: globalAction.SET_PROCEDURE, value: products.product[index].procedure });
        dispatch({ type: globalAction.SET_OUTPUT, value: products.product[index].output });
        dispatch({ type: globalAction.SET_GRADE, value: products.product[index].grade });
        setAmount(formatNumbro(products.product[index].price));
        setPhoto({ uri: products.product[index].image });
        setPhotoDB(products.product[index].image);
        setHasPhoto(true);
      }, 100);
    });
    return () => clearTimeout(unsubscribe);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('backPress', onBackHandling);
    return () =>
      BackHandler.removeEventListener('backPress', onBackHandling);
  });

  const resetForm = () => {
    dispatch({ type: globalAction.SET_TYPE, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_PROCEDURE, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_OUTPUT, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_GRADE, value: '-- Pilih --' });
    setPhoto(ILNullPhoto);
    setHasPhoto(false);
    setAmount(0);
  };

  const onBackHandling = () => {
    resetForm();
    console.log('did cancel');
  };

  const onBackNavigation = () => {
    resetForm();
    navigation.goBack();
  };

  const onContinue = async () => {
    dispatch({ type: globalAction.SET_LOADING, value: true });
    if (category.type !== '-- Pilih --' || category.procedure !== '-- Pilih --'
    || category.output !== '-- Pilih --' || category.grade !== '-- Pilih --') {
      const token = await AsyncStorage.getItem('@token');
      const price = unFormatNumbro(amount);
      const data = {
        id,
        type: category.type,
        procedure: category.procedure,
        output: category.output,
        grade: category.grade,
        price,
        photo: photoDB
      };
      service.post('/api/auth/updateProduct', data, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json'
        },
      }).then((response) => {
        if (response.data.isExist === true) {
          showError('oops, produk sudah tersedia');
        } else {
          const temp = response.data.products;
          storeUser('products', temp);
          showSuccess('Berhasil mengubah produk');
        }
        dispatch({ type: globalAction.SET_LOADING, value: false });
      }).catch((error) => {
        console.log(error);
        showError('Terjadi kesalahan');
        dispatch({ type: globalAction.SET_LOADING, value: false });
      });
    } else if (!hasPhoto) {
      showError('Photo tidak boleh kosong');
      dispatch({ type: globalAction.SET_LOADING, value: false });
    } else {
      showError('Form tidak boleh kosong');
      dispatch({ type: globalAction.SET_LOADING, value: false });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Ubah Produk"
        type="icon-button"
        icon="icon-back-light"
        width={24}
        onPress={onBackNavigation}
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
export default UpdateProduct;
