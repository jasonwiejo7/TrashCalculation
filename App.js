import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './component/Home';
import HasilScreen from './component/Hasil';
import DashboardScreen from './component/Dashboard';
import HasilTumpukanScreen from './component/HasilTumpukan';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function Root() {
  return(
      <Drawer.Navigator useLegacyImplementation>
        <Drawer.Screen name="Perhitungan Sampah" component={HomeScreen}/>
        <Drawer.Screen name="Informasi TPS" component={DashboardScreen}/>
      </Drawer.Navigator>
  )
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name ="Root" component = {Root} options = {{headerShown: false}} />
          <Stack.Screen name ="HasilScreen" component = {HasilScreen} options = {{headerTitle: "Hasil Identifikasi"}}/>
          <Stack.Screen name ="HasilTumpukanScreen" component = {HasilTumpukanScreen} options = {{headerTitle: "Hasil Identifikasi"}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
