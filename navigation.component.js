import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DrawerItem,
  Layout,
  Text,
  Divider,
  Icon,
  IndexPath,
} from '@ui-kitten/components';

import { HomeScreen } from './screens/home.component';
import { DetailScreen } from './screens/detail.component';
import { PdfScreen } from './screens/pdf.component';
import { AudioScreen } from './screens/audio.component';
// import {AboutScreen} from './screens/about.component';
const { Navigator, Screen } = createDrawerNavigator();
const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleAlign: 'center',
        headerTintColor: 'green',
        headerBackTitle: 'Back',
      }}
      headerShown={false}
    >

      <Stack.Screen
        name="Home"
        component={HomeScreen}
      // options={{
      //   title: 'Hom',
      // }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
      // options={{
      //   title: 'Hom',
      // }}
      />
      <Stack.Screen name="Pdf" component={PdfScreen} />
      <Stack.Screen name="Audio" component={AudioScreen} />
    </Stack.Navigator>
    
      
			// <Drawer.Navigator initialRouteName="Home">
			// 	<Drawer.Screen name="Home" component={HomeScreen} />
			// 	{/* <Drawer.Screen name="Details" component={DetailsScreen} /> */}
			// 	{/* <Drawer.Screen name="Contact" component={ContactScreen} /> */}
			// </Drawer.Navigator>
    
    // <Tab.Navigator>
    // <Tab.Screen name="Home" component={HomeScreen} />
    // </Tab.Navigator>
  );
};
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};



