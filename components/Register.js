import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Context from './Context';

const Register = ({ navigation }) => {
const { handleRegister, setEmail, setPassword, setConfirmEmail, setConfirmPassword } = useContext(Context);
  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View>
            <TextInput style={styles.txtInput} placeholder="Email..." onChangeText={text => setEmail(text)} />
            <TextInput style={styles.txtInput} placeholder="Confirm Email..." onChangeText={text => setConfirmEmail(text)} />
            <TextInput style={styles.txtInput} placeholder="Password..." onChangeText={text => setPassword(text)} />
            <TextInput style={styles.txtInput} placeholder="Confirm Password..." onChangeText={text => setConfirmPassword(text)} />
            <Button title="Create" onPress={handleRegister} />
        </View>
        <Text>Already have an account? <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>Sign in</Text></Text>
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

export default Register;
