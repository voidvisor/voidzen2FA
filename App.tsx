import React, { Component } from 'react';
import Auth from './components/views/Auth';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Button, StatusBar, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
export {styles};