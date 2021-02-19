import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import Context from './Context';

const HomeLogged = ({navigation}) => {
    const { user, handleSignOut } = useContext(Context);

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>WELCOME, {user.email}!</Text>
        <Text style={styles.subTitle}>You are signed in!</Text>
        <Button title="Sign out" onPress={handleSignOut} />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
  subTitle: {
    fontSize: 20,
    marginTop: 10,
  },
  link: {
      fontWeight: 'bold',
  },
});

export default HomeLogged;
