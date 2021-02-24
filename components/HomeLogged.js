import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import Context from './Context';

const HomeLogged = ({navigation}) => {
    const { user, username, handleSignOut, isVerified } = useContext(Context);

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>WELCOME, {username ? username : user.email}!</Text>
        <Text style={styles.subTitle}>You are signed in!</Text>
        <Text>
            {
                (!isVerified) ?
                    <Text style={styles.notVerified}>Verify your email to access profile</Text>
                    :
                    <Text style={styles.goProfile} onPress={() => navigation.navigate('Profile')}>Go to your profile</Text>
            }
        </Text>
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
  notVerified: {
      fontSize: 20,
      color: 'red',
  },
  link: {
      fontWeight: 'bold',
  },
  goProfile: {
      textDecorationStyle: 'solid',
      fontSize: 20,
      fontWeight: 'bold',
  },
});

export default HomeLogged;
