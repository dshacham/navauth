import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack';
import Context from './components/Context';
import Home from './components/Home';
import HomeLogged from './components/HomeLogged';
import About from './components/About';
import Register from './components/Register';
import SignIn from './components/SignIn';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // create stack of screens for navigation
  const createHomeStack = () => {
        return (
          <Stack.Navigator initialRouteName={!user ? "Home" : "HomeLogged"}>
            <Stack.Screen name={!user ? "Home" : "HomeLogged"} component={!user ? Home : HomeLogged} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="About" component={About} />
          </Stack.Navigator>
        )
      };
      
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const handleRegister = () => {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }

      console.error(error);
    });
  };

  const handleSignIn = () => {
    auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
    setUser(userCredential.user);
    // ...
  })
  .catch((error) => {
    if (error.code === 'auth/wrong-password') {
        Alert.alert('Wrong password')
      }

    if (error.code === 'auth/user-not-found') {
      Alert.alert('No user with that email!')
    }

      console.error(error);
  });
  };

  const handleSignOut = () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  };

  if (!user) {
    return (
      <Context.Provider value={{ handleRegister, handleSignIn, setEmail, setPassword, user }}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Home" children={createHomeStack} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="Register" component={Register} />
            <Drawer.Screen name="SignIn" component={SignIn} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Context.Provider>
    );
  }

  return (
    <Context.Provider value={{ handleRegister, handleSignOut, setEmail, setPassword, user }}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="HomeLogged" children={createHomeStack} />
            <Drawer.Screen name="About" component={About} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
  },
  subTitle: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default App;
