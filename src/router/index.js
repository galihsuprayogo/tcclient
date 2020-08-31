import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
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
    ChooseCoffee
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

const UnsignedApp = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigator {...props}/> }>
            <Tab.Screen name="Beranda" component={Home}/>
            <Tab.Screen name="Masuk" component={GetIn}/>
        </Tab.Navigator>
    )
};
const SignedApp = () => {
    return (
        <Tab.Navigator  tabBar={props => <BottomNavigator {...props}/> }>
            <Tab.Screen name="UMKM" component={Umkm}/>
            <Tab.Screen name="Produk" component={Product}/>
            <Tab.Screen name="Keluar" component={Splash}/>
        </Tab.Navigator>
    )
};

const Router = () => {
    return(
        <Stack.Navigator initialRouteName="UnsignedApp" >
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown:false}}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown:false}}
            />
            <Stack.Screen
                name="UnsignedApp"
                component={UnsignedApp}
                options={{ headerShown:false}}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown:false}}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown:false}}
            />
            <Stack.Screen
                name="SignedApp"
                component={SignedApp}
                options={{ headerShown:false}}
            />
            <Stack.Screen
                name="UpdateUmkm"
                component={UpdateUmkm}
                options={{ headerShown:false}}
            />
            <Stack.Screen
                name="InputProduct"
                component={InputProduct}
                options={{ headerShown:false}}
            />
            <Stack.Screen
                name="ChooseCoffee"
                component={ChooseCoffee}
                options={{ headerShown:false}}
            />
        </Stack.Navigator>
    );
};

export default Router;
