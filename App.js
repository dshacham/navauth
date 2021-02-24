import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
import Profile from './components/Profile';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const usersCollection = firestore().collection('users');

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  // create stack of screens for navigation
  const createHomeStack = () => {
        return (
          <Stack.Navigator initialRouteName={!user ? "Home" : newUser ? "Profile" : "Home "}>
            <Stack.Screen name={!user ? "Home" : newUser ? "Profile" : "HomeL "} component={!user ? Home : newUser ? Profile : HomeLogged} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="About" component={About} />
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
          </Stack.Navigator>
        )
      };
      
  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user && user.emailVerified) setIsVerified(true);
  };
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const getUser = async () => {
    if (user) {
      const getCurrentUser = await usersCollection.doc(user.uid).get();
      setUserData(getCurrentUser);
      setUsername(getCurrentUser._data.username);
      setName(getCurrentUser._data.name);
      setCountry(getCurrentUser._data.country);
    };
  };

  const handleRegister = () => {
    if ((email === confirmEmail) && (password === confirmPassword)) {
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then((currentUser) => {
        auth().currentUser.sendEmailVerification();
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        };
  
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        };
  
        console.error(error);
      });
      setNewUser(true);
    } else {
      Alert.alert('Email or password does not match');
    };
  };

  const handleSignIn = () => {
    auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
    if (userCredential.user.emailVerified) {
      setIsVerified(true);
      setUser(userCredential.user);
    };
    })
    .catch((error) => {
      if (error.code === 'auth/wrong-password') {
          Alert.alert('Wrong password');
        };

      if (error.code === 'auth/user-not-found') {
        Alert.alert('No user with that email!');
      };

        console.error(error);
    });
  };

  // console.log(user, isVerified)

  const handleSignOut = () => {
    auth()
    .signOut()
    .then(() => {
      setUser('');
      console.log('User signed out!');
    });
  };

  const handleNewUser = async () => {
    if (username !== '') {
      usersCollection.doc(user.uid).set({
      username,
      name,
      country,
      })
      .then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
  
      setEdit(false);
      setNewUser(false);
    } else {
      Alert.alert('Username can not be empty');
    };
  };

  const handleEdit = async () => {
    if (username !== '') {
      usersCollection.doc(user.uid).update({
      username,
      name,
      country,
      })
      .then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
  
      setEdit(false);
      getUser();
    } else {
      Alert.alert('Username can not be empty');
    };
  };

  const handleChangePassword = (password, newPassword) => {
    const credentials = auth.EmailAuthProvider.credential(user.email, password);

    user.reauthenticateWithCredential(credentials)
    .then(() => {
      user.updatePassword(newPassword)
      .then(() => {
        console.log("Password updated!");
        Alert.alert("Password updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  };



  if (!user) {
    return (
      <Context.Provider value={{ handleRegister, handleSignIn, setEmail, setPassword, setConfirmEmail, setConfirmPassword, user }}>
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
  };

  return (
    <Context.Provider value={{ getUser, handleRegister, handleSignOut, handleEdit, handleNewUser, handleChangePassword, setEdit, setEmail, setPassword, setUsername, setName, setCountry, setEditPassword, setConfirmPassword, setNewPassword, userData, editPassword, edit, newUser, isVerified, user, username, name, country, password, newPassword  }}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Home " children={createHomeStack} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="Profile" component={Profile} />
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
