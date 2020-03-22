import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import KawalCorona from './pages/KawalCorona';
import KawalCoronaNegara from './pages/KawalCoronaNegara';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={KawalCorona}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Country"
          component={KawalCoronaNegara}
          options={({route}) => ({title: route.params.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
