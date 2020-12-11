import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { colors, fonts } from '../../utils';
import {
  Header,
  CoffeePicker,
  Gap,
  PriceSlider,
  InputLocation,
  Button,
} from '../../components';

const ChooseCoffee = ({ navigation }) => {
  const [coffees] = useState([
    {
      id: 1,
      type: 'Arabica',
      procedure: 'Fullwash',
      output: 'Roasted bean',
      grade: 'A',
    },
    {
      id: 2,
      type: 'Robusta',
      procedure: 'Wine',
      output: 'Green Bean',
      grade: 'B',
    },
  ]);

  return (
    <View style={styles.container}>
      <Header
        title="Decision Support System"
        type="icon-button"
        icon="icon-back-light"
        width={24}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.divWrapper}>
            <CoffeePicker
              title="Jenis Kopi (Arabica/Robusta"
              datacoffees={coffees}
              target="type"
              labelType="dss"
            />
            <Gap height={10} />
            <CoffeePicker
              title="Cara Pengolahan"
              datacoffees={coffees}
              target="procedure"
              labelType="dss"
            />
            <Gap height={10} />
            <CoffeePicker
              title="Hasil Pengolahan"
              datacoffees={coffees}
              target="output"
              labelType="dss"
            />
            <Gap height={10} />
            <CoffeePicker
              title="Grade"
              datacoffees={coffees}
              target="grade"
              labelType="dss"
            />
            <Gap height={10} />
            <PriceSlider type="minimum" />
            <Gap height={10} />
            <View style={styles.locWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('MapCls')}>
                <InputLocation type="text1" icon="near" text="Ubah lewat peta [klik]" />
              </TouchableOpacity>
              <InputLocation type="text2" icon="loc2" text="Texas US 666, klik di atas untuk ubah" />
            </View>
            <Gap height={20} />
            <Button title="DSS Result [Klik]" scope="dss" onPress={() => navigation.replace('Map')} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50
  },
  divWrapper: {
    paddingVertical: 30,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: colors.secondary,
  },
  locWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.secondary,
  }
});

export default ChooseCoffee;
