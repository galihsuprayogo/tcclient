import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import {
  colors, showError, showSuccess
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
import { getUser, storeUser } from '../../config';

const ChooseCoffee = ({ navigation }) => {
  const categories = useSelector((state) => state.categoriesReducer);
  const category = useSelector((state) => state.setCategoryReducer);
  const consumer = useSelector((state) => state.consumerReducer);
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');

  useEffect(() => {
    const unsubscribe = setTimeout(async () => {
      await getUser('consumer').then((res) => {
        if (res.address === '') {
          const data = res;
          data.address = '[Belum dilengkapi, klik di atas]';
          dispatch({ type: globalAction.SET_CONSUMER, value: res });
          storeUser('consumer', res);
        } else {
          setAddress(res.address);
          dispatch({ type: globalAction.SET_CONSUMER, value: res });
          storeUser('consumer', res);
        }
      }, 100);
    });
    return () => clearTimeout(unsubscribe);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await getUser('consumer').then((res) => {
        setAddress(res.address);
        dispatch({ type: globalAction.SET_CONSUMER, value: res });
      }, 500);
    });
    return () => clearTimeout(timeout);
  }, [consumer]);

  const resetForm = () => {
    dispatch({ type: globalAction.SET_TYPE, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_PROCEDURE, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_OUTPUT, value: '-- Pilih --' });
    dispatch({ type: globalAction.SET_GRADE, value: '-- Pilih --' });
  };

  const onContinue = () => {
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Decision Support System"
        type="icon-button"
        icon="icon-back-light"
        width={24}
        onPress={() => navigation.goBack()}
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
                  title="Grade"
                  data={categories.grade}
                  value={category.grade}
                  onChangeItem={(item) => dispatch({ type: globalAction.SET_GRADE, value: item.value })}
                />
                <Gap height={10} />
            <PriceSlider type="minimum" />
            <Gap height={10} />
            <View style={styles.locWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('MapCls', { type: 'dss' })}>
                <InputLocation type="text1" icon="near" text="Ubah lewat peta [klik]" />
              </TouchableOpacity>
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
