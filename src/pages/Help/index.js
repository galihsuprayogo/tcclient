import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components';
import { colors, fonts } from '../../utils';

const Help = ({ navigation }) => (
    <View style={styles.container}>
         <Header
           title="Bantuan"
           type="icon-button"
           icon="icon-back-light"
           width={24}
           onPress={() => navigation.goBack()}
         />
         <View style={styles.content}>
            <Text style={styles.text}> This is a Pain full </Text>
         </View>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: fonts.Akkurat.bold,
    fontSize: 40
  }
});

export default Help;
