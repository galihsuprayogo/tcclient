import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { Header, ListProduct, Gap } from '../../components';
import { getUser } from '../../config';
import { globalAction } from '../../redux';
import { colors, fonts, formatNumbro } from '../../utils';

const Product = ({ navigation }) => {
  const products = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = setTimeout(async () => {
      await getUser('products').then((res) => {
        dispatch({ type: globalAction.SET_PRODUCT, value: res });
      }, 1000);
    });
    return () => clearTimeout(unsubscribe);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await getUser('products').then((res) => {
        dispatch({ type: globalAction.SET_PRODUCT, value: res });
      }, 500);
    });
    return () => clearTimeout(timeout);
  }, [products.product]);

  return (
    <View style={styles.container}>
    <Header
      title="Produk"
      type="icon-button"
      icon="open-drawer"
      width={24}
      onPress={() => navigation.openDrawer()}
    />
    <View style={styles.content}>
          {products.product[0].type === null
          && (
            <View style={styles.subDivContent}>
                  <Text style={styles.text}> Masukkan Produk Kamu </Text>
            </View>
          )}
          {products.product[0].type !== null
            && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {
                products.product.map((product, index) => (
                <View key={index} style={styles.viewScrollWrapper}>
                  <ListProduct
                    key={index}
                    source={{ uri: product.image }}
                    type={product.type}
                    procedure={product.procedure}
                    output={product.output}
                    grade={product.grade}
                    price={formatNumbro(product.price)}
                    id={product.id}
                    index={index}
                    storeId={product.store_id}
                  />
                </View>
                ))
              }
              </ScrollView>
            )}
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
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  subDivContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
    borderWidth: 3,
    // paddingVertical: 30,
    marginVertical: 30,
    borderRadius: 10
  },
  text: {
    fontFamily: fonts.sfProDisplay.heavy,
    color: colors.text.secondary,
    fontSize: 18,
    textAlign: 'center'
  },
  scrollWrapper: {
    // marginVertical: 30,
  },
  viewScrollWrapper: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
  }
});
export default Product;
