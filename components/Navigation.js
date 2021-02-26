import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import HomeLogged from './HomeLogged';
import About from './About';
import Register from './Register';
import SignIn from './SignIn';
import Profile from './Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const createHomeNotLoggedStack = () => {
    return (
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    );
  };

export const createHomeLoggedStack = (newUser) => {
    return (
      <Stack.Navigator initialRouteName={newUser ? "Profile" : "Home"}>
        <Stack.Screen name={newUser ? "Profile" : "Home"} component={newUser ? Profile : HomeLogged} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    );
  };

export const createTabsNotLogged = () => {
    return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 40;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home-sharp'
                : 'ios-home-outline';
            } else if (route.name === 'Register') {
              iconName = focused ? 'ios-person-add' : 'ios-person-add-outline';
            };

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" children={createHomeNotLoggedStack} />
        <Tab.Screen name="Register" component={Register} />
      </Tab.Navigator>
    );
  };

export const createTabsLogged = (newUser) => {
    return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 40;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home-sharp'
                : 'ios-home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            };

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" children={() => createHomeLoggedStack(newUser)} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  };
