import React from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert
} from 'react-native';
import {
  fonts, colors, showError, showSuccess
} from '../../../utils';
import { ImageResource, Gap, Icon } from '../..';
import { service, storeUser } from '../../../config';
import { globalAction } from '../../../redux';

const ListProduct = ({
  source, type, procedure, output, grade, price, id, index
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onAlert = () => {
    Alert.alert(
      'Peringatan',
      'Apakah Anda Yakin ?',
      [
        {
          text: 'Tidak',
          onPress: () => console.log('did cancel'),
          style: 'cancel'
        },
        {
          text: 'Ya',
          onPress: () => { onDelete(); }
        }
      ],
      { cancelable: true }
    );
  };
  const onUpdate = () => {
    navigation.navigate('UpdateProduct', { index, id });
  };

  const onDelete = async () => {
    dispatch({ type: globalAction.SET_LOADING, value: true });
    const token = await AsyncStorage.getItem('@token');
    const data = {
      id
    };
    service.post('/api/auth/deleteProduct', data, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      // dispatch({ type: globalAction.SET_PRODUCT, value: response.data.products });
      console.log(response);
      const temp = response.data.products;
      storeUser('products', temp);
      showSuccess('Berhasil menghapus produk');
      dispatch({ type: globalAction.SET_LOADING, value: false });
    }).catch((error) => {
      console.log(error);
      showError('Terjadi kesalahan');
      dispatch({ type: globalAction.SET_LOADING, value: false });
    });
  };

  return (
    <View style={styles.container}>
        <ImageResource source={source} />
        <View style={styles.contentWrapper}>
          <Gap height={4} />
            <View style={{ alignSelf: 'center' }}>
                <Text style={styles.titleText}>
                  {' '}
                  {type}
                  {' '}
                </Text>
            </View>
          <Gap height={3} />
            <View style={styles.textWrapper}>
                  <View>
                      <Text style={styles.boldText}>
                          {' '}
                          {'Cara Pengolahan'}
                          {' '}
                      </Text>
                      <Text style={styles.boldText}>
                          {' '}
                          {'Hasil Pengolahan'}
                          {' '}
                      </Text>
                      <Text style={styles.boldText}>
                          {' '}
                          {'Grade'}
                          {' '}
                      </Text>
                      <Text style={styles.boldText}>
                          {' '}
                          {'Harga'}
                          {' '}
                      </Text>
                  </View>
                  <Gap width={25} />
                  <View>
                      <Text style={styles.separatorText}> : </Text>
                      <Text style={styles.separatorText}> : </Text>
                      <Text style={styles.separatorText}> : </Text>
                      <Text style={styles.separatorText}> : </Text>
                  </View>
                  <Gap width={25} />
                  <View>
                      <Text style={styles.normalText}>
                          {' '}
                          {procedure}
                          {' '}
                      </Text>
                      <Text style={styles.normalText}>
                          {' '}
                          {output}
                          {' '}
                      </Text>
                      <Text style={styles.normalText}>
                          {' '}
                          {grade}
                          {' '}
                      </Text>
                      <Text style={styles.normalText}>
                          {' '}
                          {price}
                          {' '}
                      </Text>
                  </View>
            </View>
            <View style={styles.wrapperButton}>
                <TouchableOpacity style={styles.buttonOpacity} onPress={onUpdate}>
                    <Text style={styles.buttonText}>
                        {' '}
                        Ubah
                        {' '}
                    </Text>
                    <Gap width={1} />
                    <Icon icon="forward" />
                </TouchableOpacity>
                <Gap width={8} />
                <TouchableOpacity style={styles.buttonOpacity} onPress={onAlert}>
                    <Text style={styles.buttonText}>
                        {' '}
                        Hapus
                        {' '}
                    </Text>
                    <Gap width={1} />
                    <Icon icon="forward" />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: '10%',
    backgroundColor: colors.primary,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  textWrapper: {
    flexDirection: 'row',
  },
  titleText: {
    fontFamily: fonts.sfProDisplay.bold,
    fontSize: 17,
    color: colors.text.default,
    //     maxWidth: 208,
  },
  boldText: {
    fontFamily: fonts.Akkurat.bold,
    fontSize: 14,
    color: colors.text.default,
    //     maxWidth: 208,
  },
  normalText: {
    fontFamily: fonts.Akkurat.bold,
    fontSize: 13,
    color: colors.text.default,
    //     maxWidth: 128,
  },
  separatorText: {
    fontFamily: fonts.Akkurat.bold,
    fontSize: 13,
    color: colors.text.default,
  },
  wrapperButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
    left: 10
  },
  buttonText: {
    fontFamily: fonts.Akkurat.bold,
    fontSize: 12,
    color: 'white',
  },
  buttonOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 4
  }
});

export default ListProduct;
