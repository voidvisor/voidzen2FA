import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StatusBar, useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { themeColors, lightTheme } from './components/core/Themes';
import Auth from './components/views/Auth';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const Colors = isDarkMode ? themeColors.dark : themeColors.light;

  return (
    <PaperProvider theme={lightTheme}>
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
    </PaperProvider>
  );
}

export default App;