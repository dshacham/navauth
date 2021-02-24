import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

const Home = ({navigation}) => {
  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Email Not Verified!</Text>
        <Text style={styles.subTitle}>Please verify your email with the link that was sent to you and
            <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}> sign in </Text>
        again to proceed</Text>
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
