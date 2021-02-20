import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { Header, ListProduct } from '../../components';
import { getUser } from '../../config';
import { globalAction } from '../../redux';
import { colors, fonts, formatNumbro } from '../../utils';

const Product = ({ navigation }) => {
  const products = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = async () => {
      await getUser('products').then((res) => {
        dispatch({ type: globalAction.SET_PRODUCT, value: res });
      });
    };
    unsubscribe();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await getUser('products').then((res) => {
        dispatch({ type: globalAction.SET_PRODUCT, value: res });
      }, 100);
    });
    return () => clearTimeout(timeout);
  }, [products.product]);

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
      products.product.map((product, index) => (
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
          {products.product[0].type === null
           && <Text style={styles.text}> Masukkan Produk Kamu </Text>}
          {products.product[0].type !== null && renderProducts()}
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
