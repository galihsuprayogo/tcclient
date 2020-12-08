import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Home,
  Splash,
  GetIn,
  SignUp,
  SignIn,
  Product,
  Umkm,
  UpdateUmkm,
  InputProduct,
  ChooseCoffee,
} from '../pages';
import {
  Map, MapCls,
  BottomNavigator, DrawerContent, DrawItem
} from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const UnsignedApp = () => (
  <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
    <Tab.Screen name="Beranda" component={Home} />
    <Tab.Screen name="Masuk" component={GetIn} />
  </Tab.Navigator>
);
const SignedApp = () => (
  <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
    <Tab.Screen name="UMKM" component={Umkm} />
    <Tab.Screen name="Produk" component={Product} />
    <Tab.Screen name="Keluar" component={Splash} />
  </Tab.Navigator>
);

const DrawerApp = () => (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="UMKM"
        component={SignedApp}
        options={{
          drawerLabel: 'UMKM',
          drawerIcon: ({ focused }) => <DrawItem icon="UMKM" active={focused} />
        }}
      />
      <Drawer.Screen
        name="Produk"
        component={Umkm}
        options={{
          drawerLabel: 'Produk',
          drawerIcon: ({ focused }) => <DrawItem icon="Produk" active={focused} />
        }}
      />
      <Drawer.Screen
        name="Bantuan"
        component={Umkm}
        options={{
          drawerLabel: 'Bantuan',
          drawerIcon: ({ focused }) => <DrawItem icon="Help" active={focused} />
        }}
      />
    </Drawer.Navigator>
);

const Router = () => (
  <Stack.Navigator initialRouteName="UnsignedApp">
    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UnsignedApp"
      component={UnsignedApp}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignedApp"
      component={DrawerApp}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UpdateUmkm"
      component={UpdateUmkm}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="InputProduct"
      component={InputProduct}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ChooseCoffee"
      component={ChooseCoffee}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Map"
      component={Map}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MapCls"
      component={MapCls}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default Router;
