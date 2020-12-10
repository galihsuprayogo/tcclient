import React from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ILLogo } from '../../assets';
import { Button, Gap } from '../../components';
import { colors, fonts } from '../../utils';

const GetIn = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.headerContent}>
        <Animatable.Image
          animation="fadeInDownBig"
          duration={1500}
          source={ILLogo}
          style={styles.image}
        />
      </View>
      <Gap height={200} />
      <Animatable.View
        style={styles.footerContent}
        animation="fadeInUpBig"
      >
        <Text style={styles.textOne}>Mulai kenalkan kopi anda kepada Nusantara</Text>
        <Text style={styles.textTwo}>Silahkan Masuk</Text>
        <Gap height={30} />
        <View style={{ flexDirection: 'row' }}>
          <Button title="Masuk" scope="get-in" onPress={() => navigation.navigate('SignIn')} />
          <Gap width={15} />
          <Button title="Daftar" scope="get-in" onPress={() => navigation.navigate('SignUp')} />
        </View>
      </Animatable.View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  image: {
    height: 250,
    width: 320,
  },
  textOne: {
    fontFamily: fonts.Akkurat.bold,
    fontSize: 30,
    color: colors.text.primary,
  },
  textTwo: {
    fontFamily: fonts.sfProDisplay.light,
    fontSize: 16,
    color: colors.text.primary,
  },
  headerContent: {
    // flex: 1
  },
  footerContent: {
    flex: 1,
    backgroundColor: colors.primary,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 70,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
});

export default GetIn;
