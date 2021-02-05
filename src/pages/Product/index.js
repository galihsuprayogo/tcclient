import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../../components';
import { colors } from '../../utils';
import { service } from '../../config';
import IsProduct from './IsProduct';

const Product = ({ navigation }) => {
  const [product] = useState('Os Coffe');

  useEffect(() => {
    const unsubscribe = async () => {
      const token = await AsyncStorage.getItem('@token');
      service.get('/api/auth/product', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json'
        },
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    };
    unsubscribe();
  });
  return (
    <View style={styles.container}>
      <Header
        title="Produk"
        type="icon-button"
        icon="open-drawer"
        width={24}
        onPress={() => navigation.openDrawer()}
      />
      <ScrollView showVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.subDivContent(product)}>
          <IsProduct product={product} navigation={navigation} />
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  subDivContent: (product) => ({
    flex: 1,
    justifyContent: product ? 'center' : 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 45,
    marginVertical: 30,
    borderRadius: 10
  })
});
export default Product;
