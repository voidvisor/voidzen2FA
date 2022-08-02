import React, { Component } from 'react';
import Auth from './components/views/Auth';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Button, StatusBar } from 'react-native';
import Colors from './components/Colors';

const Tab = createMaterialBottomTabNavigator();

const authLock = () => {
  return (
    <Button 
      title='Lock'
    />
  )
}

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle="light-content"
      />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Auth"
          activeColor={Colors.white}
          inactiveColor={Colors.lightGray}
          barStyle={{ backgroundColor: Colors.primary }}
        >
          <Tab.Screen name="Codes" component={Auth} options={{tabBarIcon: 'shield-key'}} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;