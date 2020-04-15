import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddNoteScreen from './AddNoteScreen'
import NoteListScreen from './NoteListScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notes">
        <Stack.Screen name="Notes" component={NoteListScreen} options={{ title: "Welcome to Notes" }} />
        <Stack.Screen name="Add Note" component={AddNoteScreen} options={{ title: "Welcome to Notes" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;