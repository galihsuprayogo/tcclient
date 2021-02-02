import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { colors, fonts, useForm } from '../../utils';
import {
  Header,
  DPicker,
  Gap,
  PriceSlider,
  InputLocation,
  Button,
} from '../../components';

const ChooseCoffee = ({ navigation }) => {
  const [form, setForm] = useForm({
    type: '',
    procedure: '',
    output: '',
    grade: ''
  });
  const [type] = useState([
    { label: 'Arabica', value: 'Arabica' },
    { label: 'Robusta', value: 'Robusta' }
  ]);
  const [procedure] = useState([
    { label: 'Fullwash', value: 'Fullwash' },
    { label: 'Semiwash', value: 'Semiwash' }
  ]);
  const [output] = useState([
    { label: 'Green Bean', value: 'Green Bean' },
    { label: 'Roasted Bean', value: 'Roasted Bean' }
  ]);
  const [grade] = useState([
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' }
  ]);

  const onContinue = () => {
    // console.log(form);
    navigation.replace('Map');
  };
  return (
    <View style={styles.container}>
      <Header
        title="Decision Support System"
        type="icon-button"
        icon="icon-back-light"
        width={24}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          <View style={styles.subDivContent}>
                <DPicker
                  title="Jenis Kopi (Arabica/Robusta)"
                  data={type}
                  value={form.type}
                  onChangeItem={(item) => setForm('type', item.value)}
                />
                <Gap height={10} />
                <DPicker
                  title="Cara Pengolahan"
                  data={procedure}
                  value={form.procedure}
                  onChangeItem={(item) => setForm('procedure', item.value)}
                />
                <Gap height={10} />
                <DPicker
                  title="Hasil Pengolahan"
                  data={output}
                  value={form.output}
                  onChangeItem={(item) => setForm('output', item.value)}
                />
                <Gap height={10} />
                <DPicker
                  title="Grade"
                  data={grade}
                  value={form.grade}
                  onChangeItem={(item) => setForm('grade', item.value)}
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
            <Button title="DSS Result [Klik]" scope="dss" onPress={onContinue} />
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
    paddingVertical: 5,
    paddingHorizontal: 20
  },
  subDivContent: {
    flex: 1,
    paddingVertical: 30,
    marginVertical: 30,
    paddingHorizontal: 15,
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
