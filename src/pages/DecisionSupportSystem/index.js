import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../utils';
import { ListFarmer, Gap, Header } from '../../components';

const DecisionSupportSystem = ({ navigation }) => {
  const [farmers] = useState([
    {
      id: 1,
      score: 666126,
      name: 'Umkm X',
      address: 'Messachuchets, United States of America, 6666 ',
    },
    {
      id: 2,
      score: 666127,
      name: 'Umkm Y',
      address: 'Messachuchets, United States of America, 6666 ',
    },
    {
      id: 3,
      score: 666127,
      name: 'Umkm Y',
      address: 'Messachuchets, United States of America, 6666 ',
    },
    {
      id: 4,
      score: 666127,
      name: 'Umkm Y',
      address: 'Messachuchets, United States of America, 6666 ',
    },
    {
      id: 5,
      score: 666127,
      name: 'Umkm Y',
      address: 'Messachuchets, United States of America, 6666 ',
    },
  ]);
  return (
    <View style={styles.container}>
      <Header
        title="Kembali"
        type="icon-button"
        icon="icon-back-light"
        width={24}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {
                        farmers.map((farmer) => (
                          <>
                            <ListFarmer
                              key={farmer.id}
                              score={farmer.score}
                              name={farmer.name}
                              address={farmer.address}
                              onPress={() => navigation.navigate('TL')}
                            />
                            <Gap height={10} />
                          </>
                        ))
                    }
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
    paddingHorizontal: 25,
    paddingVertical: 60,
  },
});
export default DecisionSupportSystem;
