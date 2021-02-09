import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, Text
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Header, ListProduct } from '../../components';
import { colors, fonts } from '../../utils';
import { getUser } from '../../config';
import { ILNullPhoto } from '../../assets';

const Product = ({ navigation }) => {
  const [products, setProducts] = useState([{
    id: 0,
    store_id: 0,
    type: '',
    procedure: '',
    output: '',
    grade: '',
    price: '',
    image: null
  }]);

  useEffect(() => {
    const unsubscribe = async () => {
      await getUser('products').then((res) => {
        setProducts(res);
      });
    };
    unsubscribe();
  }, []);

  const renderPagination = (index, total, context) => (
      <View style={styles.paginationNumber}>
        <Text style={{ color: colors.text.default }}>
          <Text style={styles.paginationText}>{index + 1}</Text>
          /
          {total}
        </Text>
      </View>
  );
  const renderProducts = () => (
      <Swiper
        showsPagination
        loop={false}
        dot={(<View style={styles.dot} />)}
        activeDot={(<View style={styles.activeDot} />)}
        renderPagination={renderPagination}
      >
      {
        products.map((product, index) => (
          <ListProduct
            key={index}
            source={{ uri: product.image }}
            type={product.type}
            procedure={product.procedure}
            output={product.output}
            grade={product.grade}
            price={product.price}
          />
        ))
      }
      </Swiper>
  );

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
        <View style={styles.subDivContent}>
            {!Array.isArray(products) && <Text style={styles.text}> Masukkan Produk Kamu </Text>}
            {Array.isArray(products) && renderProducts()}
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
  dot: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    width: 5,
    height: 5,
    borderRadius: 20,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 15,
    // marginBottom: 6
  },
  activeDot: {
    backgroundColor: 'white',
    width: 6,
    height: 6,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 15,
    // marginBottom: 6
  },
  paginationNumber: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'white',
    fontFamily: fonts.Akkurat.normal,
    fontSize: 18
  },
  text: {
    fontFamily: fonts.sfProDisplay.heavy,
    color: colors.text.secondary,
    fontSize: 18,
    textAlign: 'center'
  },
});
export default Product;
