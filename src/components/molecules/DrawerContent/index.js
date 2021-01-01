import React from 'react';
import {
  View, Text, StyleSheet, Image
} from 'react-native';
import {
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { colors, fonts } from '../../../utils';
import { deleteId } from '../../../config';
import { DrawItem, Gap } from '../..';
import { dummycoffe1 } from '../../../assets';

const DrawerContent = (props) => {
  const onClose = () => {
    deleteId();
    props.navigation.replace('Splash');
  };
  return (
    <View style={styles.container}>
        <View style={styles.content}>
        <View>
          <Gap height={40} />
          <View style={styles.header}>
              <View>
                  <Image source={dummycoffe1} style={styles.image} />
              </View>
          <Gap width={15} />
              <View>
                  <Text style={styles.titleText}> OS Coffee </Text>
                  <Text style={styles.detailText}> Pemilik : David Bowie </Text>
              </View>
          </View>
          <Gap height={30} />
          <View style={{ borderTopWidth: 2, borderColor: colors.fourth }} />
          <Gap height={30} />
          <DrawerItemList
            {...props}
            activeBackgroundColor={colors.fourth}
            inactiveBackgroundColor={colors.primary}
            activeTintColor={colors.primary}
            inactiveTintColor={colors.third}
            labelStyle={{ fontSize: 15, fontFamily: fonts.Akkurat.bold }}
          />
        </View>
          <View style={styles.footer}>
            <DrawerItem
              labelStyle={{
                fontSize: 18,
                fontFamily: fonts.sfProDisplay.bold
              }}
              label="Keluar"
              inactiveTintColor={colors.secondary}
              icon={() => <DrawItem icon="Logout" />}
              onPress={onClose}
            />
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2
  },
  content: {
    flex: 1,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 30,
    justifyContent: 'space-between'
  },
  footer: {
    borderTopWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 5,
  },
  titleText: {
    fontFamily: fonts.sfProDisplay.heavyItalic,
    fontSize: 15,
    color: colors.secondary
  },
  detailText: {
    fontFamily: fonts.Akkurat.normalItalic,
    fontSize: 14,
    color: 'white'
  },
  thirdText: {
    fontFamily: fonts.Akkurat.normalItalic,
    fontSize: 13,
    textAlign: 'center'
  }
});
export default DrawerContent;
