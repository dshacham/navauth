import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Context from './Context';

const SignIn = ({ navigation }) => {
const { handleSignIn, setEmail, setPassword } = useContext(Context);
  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>SignIn</Text>
        <View>
            <TextInput style={styles.txtInput} placeholder="Email..." onChangeText={text => setEmail(text)} />
            <TextInput style={styles.txtInput} placeholder="Password..." onChangeText={text => setPassword(text)} />
            <Button title="Sign In" onPress={handleSignIn} />
        </View>
        <Text>Don't have an account? <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Register</Text></Text>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
  },
  title: {
      fontSize: 30,
      marginBottom: 30,
  },
  txtInput: {
      width: 300,
      height: 50,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      paddingLeft: 10,
  },
  link: {
      fontWeight: 'bold',
  },
});

export default SignIn;
