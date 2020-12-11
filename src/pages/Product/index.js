import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../components';
import { colors } from '../../utils';
import IsProduct from './IsProduct';

const Product = ({ navigation }) => {
  const [product] = useState('Os Coffe');

  return (
    <View style={styles.container}>
      <Header
        title="Produk"
        type="icon-button"
        icon="open-drawer"
        width={24}
        onPress={() => navigation.openDrawer()}
      />
      <View style={styles.content(product)}>
        <View style={styles.subDivContent}>
          <IsProduct product={product} navigation={navigation} />
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
  content: (product) => (
    {
      paddingTop: product ? 0 : 0,
      flex: 1,
      backgroundColor: colors.primary,
      justifyContent: product ? 'center' : 'center',
      paddingHorizontal: 30,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    }
  ),
  subDivContent: {
    backgroundColor: colors.secondary,
    paddingVertical: 45,
    borderRadius: 10
  }
});
export default Product;
