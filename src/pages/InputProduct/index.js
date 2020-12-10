import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../utils';
import {
  Gap,
  Header,
  InputNumber,
  Profile,
  Button,
  CoffeePicker,
} from '../../components';

const InputProduct = ({ navigation }) => {
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
        title="Tambah Produk"
        type="icon-button"
        icon="icon-back-light"
        width={24}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center' }}>
              <Profile icon="add-photo" />
            </View>
            <Gap height={25} />
              <CoffeePicker
                title="Jenis Kopi (Arabica/Robusta)"
                datacoffees={coffees}
                target="type"
              />
              <Gap height={10} />
              <CoffeePicker
                title="Cara Pengolahan"
                datacoffees={coffees}
                target="procedure"
              />
              <Gap height={10} />
              <CoffeePicker
                title="Hasil Pengolahan"
                datacoffees={coffees}
                target="output"
              />
              <Gap height={10} />
              <CoffeePicker
                title="Grade"
                datacoffees={coffees}
                target="grade"
              />
              <Gap height={10} />
              <InputNumber title="Harga" />
            <Gap height={25} />
            <View>
              <Button title="Simpan" onPress={() => alert('meki')} />
            </View>
        </ScrollView>
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
    paddingHorizontal: 50,
    paddingVertical: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  }
});

export default InputProduct;
