import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, BackHandler
} from 'react-native';
import { Gap, Header } from '../../components';
import {
  colors, fonts, showInfoSecond, showError
} from '../../utils';
import { ILLogo } from '../../assets';
import { storeUser, service } from '../../config';
import { globalAction } from '../../redux';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const onContinue = () => {
    dispatch({ type: globalAction.SET_LOADING, value: true });
    service.get('/api/auth/minMax', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
    }).then((response) => {
      const randomId = Math.floor(Math.random() * 1000) + 1;
      if (response.data.minimum === null && response.data.maximum === null) {
        const data = {
          consumerId: randomId,
          minimum: 0,
          maximum: 0,
          minimumLimit: 0,
          maximumLimit: 0,
          address: '',
          latitude: 0,
          longitude: 0
        };
        storeUser('consumer', data);
      } else {
        const data = {
          consumerId: randomId,
          minimum: response.data.minimum,
          maximum: response.data.maximum,
          minimumLimit: response.data.minimum,
          maximumLimit: response.data.maximum,
          address: '',
          latitude: 0,
          longitude: 0
        };
        storeUser('consumer', data);
      }
      dispatch({ type: globalAction.SET_LOADING, value: false });
      navigation.navigate('ChooseCoffee');
      showInfoSecond('Silahkan pilih kriteria yang kamu inginkan');
      // navigation.navigate('Helper');
    }).catch((error) => {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      console.log(error);
      showError('Terjadi kesalahan');
    });
  };

  useEffect(() => {
    BackHandler.addEventListener('backPress', onBackHandling);
    return () =>
      BackHandler.removeEventListener('backPress', onBackHandling);
  });

  const onBackHandling = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <Header title="Beranda" type="icon-button" icon="no-icon" />
      <View style={styles.content}>
        <Gap height={20} />
        <Image source={ILLogo} style={styles.image} />
        <Gap height={5} />
        <View style={styles.textWrapper}>
          <Text style={styles.text}> Selamat Datang </Text>
          <Text style={styles.detailText}>
            Silahkan pilih kopi kesukaanmu dari berbagai
            katalog di Temanggung, klik di bawah ini
          </Text>
          <Gap height={15} />
          <TouchableOpacity
            style={styles.button}
            onPress={onContinue}
          >
          <Text style={styles.textButton}> Klik Ya ! </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  image: {
    height: 230,
    width: 300,
  },
  button: {
    width: 120,
    height: 45,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  textWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 30,
    fontFamily: fonts.sfProDisplay.black,
    color: colors.text.default,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.Akkurat.bold
  },
  detailText: {
    fontFamily: fonts.Akkurat.light,
    fontSize: 18,
    maxWidth: 300,
    textAlign: 'center',
  },
});

export default Home;
