import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Context from './components/Context';
import About from './components/About';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { createTabsNotLogged, createTabsLogged } from './components/Navigation';

const Drawer = createDrawerNavigator();

// Database:
const usersCollection = firestore().collection('users');

// RegEx for password rules:
const passValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const App = () => {
  // Set an initializing state whilst Firebase connects:
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');
  // Fetch data from firestore database:
  const [userData, setUserData] = useState('');
  // Data for registration and/or updating info:
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  // Check if email is verified to show "verify email" msg or not:
  const [isVerified, setIsVerified] = useState(false);
  // First time logged in redirects to creating profile:
  const [newUser, setNewUser] = useState(false);
  // When editing data, show editing mode:
  const [edit, setEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
      
  // Handle user state changes:
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

  // Fetch user data from database:
  const getUser = async () => {
    if (user) {
      const getCurrentUser = await usersCollection.doc(user.uid).get();
      setUserData(getCurrentUser._data);
      setUsername(getCurrentUser._data.username);
      setName(getCurrentUser._data.name);
      setCountry(getCurrentUser._data.country);
    };
  };

  const handleRegister = () => {
    if (
      (email === confirmEmail) && (password === confirmPassword) && (password.match(passValidator))) {
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
      Alert.alert('Check that Email and password match and that password is legit');
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

  const handleSignOut = () => {
    auth()
    .signOut()
    .then(() => {
      setUser('');
      setUserData('');
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
          console.log('Document successfully written!');
      })
      .catch((error) => {
          console.error('Error writing document: ', error);
      });
  
      setEdit(false);
      setNewUser(false);
    } else {
      Alert.alert('Username can not be empty');
    };
  };

  // Edit profile data:
  const handleEdit = async () => {
    if (username !== '') {
      usersCollection.doc(user.uid).update({
        username,
        name,
        country,
      })
      .then(() => {
          console.log('Document successfully written!');
      })
      .catch((error) => {
          console.error('Error writing document: ', error);
      });
  
      setEdit(false);
      getUser();
    } else {
      Alert.alert('Username can not be empty');
    };
  };

  const handleChangePassword = (password, newPassword) => {
    const credentials = auth.EmailAuthProvider.credential(user.email, password);
    if (newPassword.match(passValidator)) {
      user.reauthenticateWithCredential(credentials)
      .then(() => {
        user.updatePassword(newPassword)
        .then(() => {
          console.log('Password updated!');
          Alert.alert('Password updated!');
          setEditPassword(false);
        }).catch((error) => { 
          console.log("er 1: ", error); 
          Alert.alert('Old password incorrect');
        });
      }).catch((error) => { 
        console.log("er 2: ", error); 
        Alert.alert('Old password incorrect');
      });
    } else {
      Alert.alert('Check that new password and confirmation are legit');
    };
  };

  // Show this if user not logged in:
  if (!user) {
    return (
      <Context.Provider value={{ 
        handleRegister, handleSignIn, setEmail, setPassword, setConfirmEmail, setConfirmPassword, user 
      }}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Main" children={createTabsNotLogged} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="Register" component={Register} />
            <Drawer.Screen name="Sign In" component={SignIn} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Context.Provider>
    );
  };

  // Show this if user is logged in:
  return (
    <Context.Provider value={{ 
      getUser, handleRegister, handleSignOut, handleEdit, handleNewUser, handleChangePassword, 
      setEdit, setEmail, setPassword, setUsername, setName, setCountry, setEditPassword, setConfirmPassword, setNewPassword, 
      userData, editPassword, edit, newUser, isVerified, user, username, name, country, password, newPassword  
    }}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Home" children={() => createTabsLogged(newUser)} />
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
