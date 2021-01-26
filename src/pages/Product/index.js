import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
