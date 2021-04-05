import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useDispatch } from 'react-redux';
import {
  View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { colors, fonts } from '../../../utils';
import { globalAction } from '../../../redux';
import { DataIntro, Gap } from '../..';

const Intro = () => {
  const dispatch = useDispatch();
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {' '}
        {item.title}
        {' '}
      </Text>
      <Gap height={23} />
      <Text style={styles.contentText}>
        {' '}
        {item.text}
        {' '}
      </Text>
      { item.description !== '' && (
        <>
          <Gap height={13} />
          <Text style={styles.contentText}>
            {' '}
            {item.description}
            {' '}
          </Text>
        </>
      )}
      { item.photo !== '' && item.key === 'two' && (
        <>
          <Gap height={30} />
          <Image source={item.photo} style={styles.photo} />
        </>
      )}
      { item.photo !== '' && item.photoSecond !== '' && item.key === 'three' && (
       <>
        <Gap height={30} />
        <View style={styles.photoThreeWrapper}>
          <Image source={item.photo} style={styles.photoSecond} />
          <Gap width={8} />
          <Image source={item.photoSecond} style={styles.photoSecond} />
        </View>
       </>
      )}
      {item.key === 'one' && (
       <>
        <Gap height={5} />
        <TouchableOpacity onPress={() => alert('meki')}>
          <Text style={styles.linkText}>
          {' '}
          {'Kebijakan Privasi'}
          {' '}
          </Text>
        </TouchableOpacity>
       </>
      )}
    </View>
  );

  const onDone = () => {
    dispatch({ type: globalAction.SET_INTRO, value: true });
  };

  const nextButton = () => (
    <Text style={styles.buttonText}> Lewati </Text>
  );

  const doneButton = () => (
    <Text style={styles.buttonText}> Setuju </Text>
  );

  return (
    <AppIntroSlider
      data={DataIntro.data}
      renderItem={renderItem}
      onDone={onDone}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      dotClickEnabled={false}
      showNextButton
      renderNextButton={nextButton}
      renderDoneButton={doneButton}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderRadius: 5,
    padding: 40,
  },
  buttonText: {
    color: colors.secondary,
    fontFamily: fonts.sfProDisplay.heavy
  },
  dot: {
    backgroundColor: colors.secondary,
    width: 7,
    height: 7,
    borderRadius: 20,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 15,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 9,
    height: 9,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 15,
  },
  headerText: {
    fontFamily: fonts.sfProDisplay.heavy,
    fontSize: 16,
    textAlign: 'center',
    color: colors.text.default
  },
  contentText: {
    fontFamily: fonts.sfProDisplay.regular,
    fontSize: 14,
    textAlign: 'center'
  },
  linkText: {
    fontFamily: fonts.sfProDisplay.regular,
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: 'blue'
  },
  photo: {
    height: '60%',
    width: '65%'
  },
  photoSecond: {
    height: '75%',
    width: '60%'
  },
  photoThreeWrapper: {
    flex: 1,
    marginTop: -50,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default Intro;
