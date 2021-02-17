import React, { useState, useEffect } from 'react';
import {
  StyleSheet, ScrollView, View, Text, BackHandler
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ILNullPhoto } from '../../assets';
import { colors } from '../../utils';
import { Header } from '../../components';

const UpdateProduct = () => {
  const navigation = useNavigation();
  const [photoDB, setPhotoDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);

  useEffect(() => {
    BackHandler.addEventListener('backPress', onBackHandling);
    return () =>
      BackHandler.removeEventListener('backPress', onBackHandling);
  });

  const onBackHandling = () => {

  };

  return (
    <View style={styles.container}>
      <Header
        title="Ubah Produk"
        type="icon-button"
        icon="icon-back-light"
        width={24}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.subDivContent}>
          <Text>  Halaman ubah produk </Text>
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
