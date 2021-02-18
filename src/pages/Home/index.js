import React from 'react';
import { useSelector } from 'react-redux';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { Gap, Header } from '../../components';
import { colors, fonts } from '../../utils';
import { ILLogo } from '../../assets';
import { storeUser } from '../../config';

const Home = ({ navigation }) => {
  const consumer = useSelector((state) => state.consumerReducer);
  const onContinue = () => {
    storeUser('consumer', consumer);
    navigation.navigate('ChooseCoffee');
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
          <AwesomeButton
            width={150}
            height={45}
            backgroundColor={colors.secondary}
            backgroundDarker={colors.fourth}
            backgroundShadow={colors.primary}
            backgroundProgress={colors.primary}
            progress
            onPress={(next) => {
              onContinue();
              next();
            }}
          >
          <Text style={styles.textButton}> Klik Ya ! </Text>
          </AwesomeButton>
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
