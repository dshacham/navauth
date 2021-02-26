import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const Home = ({navigation}) => {
  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>WELCOME!</Text>
        <Text style={styles.subTitle}>Please  
            <Text style={styles.link} onPress={() => navigation.navigate('Sign In')}> sign in </Text>
        or 
            <Text style={styles.link} onPress={() => navigation.navigate('Register')}> register </Text>
        to proceed</Text>
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
    fontSize: 60,
  },
  subTitle: {
    fontSize: 20,
    marginTop: 10,
  },
  link: {
      fontWeight: 'bold',
  },
});

export default Home;
