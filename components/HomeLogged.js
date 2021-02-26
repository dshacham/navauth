import React, { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Button } from 'react-native';
import Context from './Context';

const HomeLogged = ({navigation}) => {
  const { getUser, user, username, handleSignOut, isVerified } = useContext(Context);

  useEffect(() => {
        if (user) {
            getUser();
        }
    }, []);

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>WELCOME, {username !== '' ? username : user.email}!</Text>
        <Text style={styles.subTitle}>You are signed in!</Text>
        <Text>
            {
                (!isVerified) ?
                    <Text style={styles.notVerified}>Please verify your email</Text>
                    :
                    null
            }
        </Text>
        <Text style={styles.goProfile} onPress={() => navigation.navigate('Profile')}>Go to your profile</Text>
        <Button title="Sign out" onPress={handleSignOut} />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    margin: 40,
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
