import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import {
  View, StyleSheet, ScrollView, BackHandler
} from 'react-native';
import {
  colors, showError, showInfo
} from '../../utils';
import {
  Header,
  DPicker,
  Gap,
  PriceSlider,
  InputLocation,
  Button,
} from '../../components';
import { globalAction } from '../../redux';
import { getUser, service, storeUser } from '../../config';

const ChooseCoffee = ({ navigation }) => {
  const categories = useSelector((state) => state.categoriesReducer);
  const category = useSelector((state) => state.setCategoryReducer);
  const consumer = useSelector((state) => state.consumerReducer);
  const dispatch = useDispatch();
  const pesan = 'TCoffee App menampilkan peta lokasi petani berupa petunjuk arah dan navigasi. Klik Petunjuk arah untuk mengetahui rute, lalu klik navigasi untuk memulai';
  const [address, setAddress] = useState('');
  const [minimum, setMinimum] = useState(consumer.minimumLimit);
  const [maximum, setMaximum] = useState(consumer.maximumLimit);
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const unsubscribe = setTimeout(async () => {
      initialPosition();
    }, 50);
    return () => clearTimeout(unsubscribe);
  }, []);

  useEffect(() => {
    const unsubscribe = setTimeout(async () => {
      await getUser('consumer').then((res) => {
        const data = res;
        data.address = address;
        data.latitude = markerPosition.latitude;
        data.longitude = markerPosition.longitude;
        setMinimum(res.minimumLimit);
        setMaximum(res.maximumLimit);
        dispatch({ type: globalAction.SET_CONSUMER, value: res });
        storeUser('consumer', res);
      });
    }, 100);
    return () => clearTimeout(unsubscribe);
  }, []);

  useEffect(() => {
    const unsubscribe = setTimeout(async () => {
      await getUser('consumer').then((res) => {
        const data = res;
        data.address = address;
        data.latitude = markerPosition.latitude;
        data.longitude = markerPosition.longitude;
        dispatch({ type: globalAction.SET_CONSUMER, value: res });
        storeUser('consumer', res);
      });
    }, 100);
    return () => clearTimeout(unsubscribe);
  }, [consumer]);

  useEffect(() => {
    BackHandler.addEventListener('backPress', onBackHandling);
    return () =>
      BackHandler.removeEventListener('backPress', onBackHandling);
  });

  const initialPosition = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const newPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setMarkerPosition(newPosition);
        const NY = {
          id: 1,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        Geocoder.fallbackToGoogle('');
        await Geocoder.geocodePosition(NY).then((res) => {
          setAddress(res[1].formattedAddress.toString());
        }).catch((err) => {
          setAddress(`${markerPosition.latitude.toString()},${markerPosition.longitude.toString()}`);
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 3000 },
    );
  };

  const onBackHandling = () => {
    resetForm();
    navigation.goBack();
  };

  const onBackPressHandling = () => {
    resetForm();
    navigation.goBack();
  };

  const resetForm = () => {
    dispatch({ type: globalAction.SET_TYPE, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_PROCEDURE, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_OUTPUT, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_GRADE, value: '-- Pilih --' });
    setMinimum(consumer.minimumLimit);
    setMaximum(consumer.maximumLimit);
    dispatch({ type: globalAction.SET_LOADING, value: false });
  };

  const getRank = () => {
    service.post('/api/auth/rank', {
      consumerId: consumer.consumerId
    }).then((response) => {
      const data = response.data.ranking.map((coffee) => {
        const customData = {
          id: Number(coffee.id),
          name: coffee.name,
          image: coffee.image,
          latitude: Number(coffee.latitude),
          longitude: Number(coffee.longitude),
          address: coffee.address,
          score: coffee.score,
        };
        return customData;
      });
      storeUser('coffees', data);
    }).catch((error) => {
      resetForm();
      showError('Terjadi kesalahan');
    });
  };

  const getStatus = () => {
    service.post('/api/auth/isAvailable', {
      consumerId: consumer.consumerId,
      type: category.type,
      procedure: category.procedure,
      output: category.output,
      grade: category.grade,
      latitude: consumer.latitude,
      longitude: consumer.longitude,
      minimum,
      maximum
    }).then((response) => {
      const status = response.data.message;
      if (status === 'empty') {
        showError('Produk tidak tersedia');
        resetForm();
      } else if (status === 'unavailable') {
        showError('Jumlah produk belum mencukupi');
        resetForm();
      } else if (status === 'available') {
        onPostData();
      }
    }).catch((error) => {
      showError('Terjadi Kesalahan');
    });
  };

  const onPostData = () => {
    dispatch({ type: globalAction.SET_LOADING, value: true });
    service.post('/api/auth/index', {
      consumerId: consumer.consumerId,
      type: category.type,
      procedure: category.procedure,
      output: category.output,
      grade: category.grade,
      latitude: consumer.latitude,
      longitude: consumer.longitude,
      minimum,
      maximum
    }).then((response) => {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      showInfo(pesan);
      getRank();
      navigation.navigate('MapCenter');
      resetForm();
    }).catch((error) => {
      console.log(error);
      resetForm();
      showError('Terjadi kesalahan');
    });
  };

  const onContinue = () => {
    dispatch({ type: globalAction.SET_LOADING, value: true });
    if (category.type !== '-- Pilih --' && category.procedure !== '-- Pilih --'
    && category.output !== '-- Pilih --' && category.grade !== '-- Pilih --' && address !== '[Belum dilengkapi, klik di atas]') {
      getStatus();
    } else {
      dispatch({ type: globalAction.SET_LOADING, value: false });
      showError('form tidak boleh kosong');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Decision Support System"
        type="icon-button"
        icon="icon-back-light"
        width={24}
        onPress={onBackPressHandling}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          <View style={styles.subDivContent}>
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
                  title="Grade (Opsional)"
                  data={categories.grade}
                  value={category.grade}
                  onChangeItem={(item) => dispatch({ type: globalAction.SET_GRADE, value: item.value })}
                />
                <Gap height={10} />
                <PriceSlider
                  type="minimum"
                  minimum={minimum}
                  maximum={maximum}
                  setMinimum={setMinimum}
                  setMaximum={setMaximum}
                  initialMaximum={consumer.maximumLimit}
                />
            <Gap height={10} />
            <View style={styles.locWrapper}>
              <View>
                <InputLocation type="text1" icon="unVisible" text="Lokasi Kamu (Deteksi Otomatis)" />
              </View>
              <InputLocation type="text2" icon="loc2" text={address} />
            </View>
            <Gap height={20} />
            <Button title="DSS Result [Klik]" scope="dss" onPress={onContinue} />
          </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20
  },
  subDivContent: {
    flex: 1,
    paddingVertical: 30,
    marginVertical: 60,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: colors.secondary,
  },
  locWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.secondary,
  }
});

export default ChooseCoffee;
