import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { colors } from '../../../utils';

const DrawerContent = (props) => (
    <View style={styles.container}>
        <View style={styles.content}>
            <DrawerContentScrollView {...props}>
                <Text> Main Content </Text>
            </DrawerContentScrollView>
        </View>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  content: {
    flex: 1,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default DrawerContent;
