import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

const About = () => {
  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.txt}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim lacus eget consectetur accumsan. 
          Praesent aliquet iaculis lectus ut euismod. Etiam dapibus nec dui ac gravida. Nunc tellus libero, 
          efficitur a magna et, finibus volutpat leo. Praesent congue est dolor, nec bibendum sapien placerat at. 
          Vestibulum ornare euismod mattis. Integer tempus ex sodales velit semper, eget accumsan risus tincidunt. 
          Aenean sed velit nec ex aliquet finibus vel elementum augue. Donec rutrum dolor a turpis rutrum, 
          a pellentesque felis tempus. Nam vel lorem sit amet erat lobortis consequat. Nam pulvinar molestie porttitor. 
          Nam finibus, sapien vel luctus ultrices, urna arcu varius augue, sed ultricies nunc ipsum lacinia dolor. 
          Donec justo neque, aliquet quis euismod at, finibus eget ligula.
        </Text>
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
    fontSize: 35,
  },
  txt: {
    textAlign: 'justify',
    fontSize: 20,
    margin: 40,
  }
});

export default About;
