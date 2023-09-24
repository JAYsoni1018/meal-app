import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetails from '../screens/RecipeDetails';

const Stack = createNativeStackNavigator();
function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="RecipesData" component={RecipeDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;