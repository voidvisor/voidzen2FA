/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import Auth from './components/Auth';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

const authLock = () => {
  return (
    <Button 
      title='Lock'
    />
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9966CC',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          name='Auth'
          component={Auth}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
