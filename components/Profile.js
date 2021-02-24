import React, { useEffect, useContext, Fragment } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, TextInput } from 'react-native';
import Context from './Context';

const Profile = ({navigation}) => {
    const { getUser, userData, user, username, name, country, edit, password, newPassword, setPassword, setNewPassword, editPassword, setEdit, setEditPassword, setConfirmPassword, handleEdit, handleNewUser, handleChangePassword, handleSignOut, setUsername, setName, setCountry, newUser } = useContext(Context);
    const data = userData._data;

    useEffect(() => {
        if (user) {
            getUser();
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome to your profile</Text>
            {
                newUser ? 
                    <Fragment>
                        <TextInput style={styles.txtInput} placeholder="Username..." onChangeText={text => setUsername(text)} />
                        <TextInput style={styles.txtInput} placeholder="Name..." onChangeText={text => setName(text)} />
                        <TextInput style={styles.txtInput} placeholder="Country..." onChangeText={text => setCountry(text)} />
                        <Button title="Done" onPress={handleNewUser} />
                    </Fragment>
                    :
                edit ? 
                    <Fragment>
                        <View style={styles.profileContainer}>
                            <TextInput style={styles.txtInput} placeholder={username ? username : "Username..."} onChangeText={text => setUsername(text)} />
                            <TextInput style={styles.txtInput} placeholder={name ? name : "name..."} onChangeText={text => setName(text)} />
                            <TextInput style={styles.txtInput} placeholder={country ? country : "country..."} onChangeText={text => setCountry(text)} />
                        </View>
                        <View style={styles.btns}>
                            <Button title="Done" onPress={handleNewUser} />
                            <Button title="Cancel" onPress={() => setEdit(false)} />
                        </View>
                    </Fragment>
                    :
                editPassword ?
                    <Fragment>
                        <View style={styles.profileContainer}>
                            <TextInput style={styles.txtInput} placeholder="Old Password..." onChangeText={text => setPassword(text)} />
                            <TextInput style={styles.txtInput} placeholder="New Password..." onChangeText={text => setNewPassword(text)} />
                            <TextInput style={styles.txtInput} placeholder="Confirm New Password..." onChangeText={text => setConfirmPassword(text)} />
                        </View>
                        <View style={styles.btns}>
                            <Button title="Done" onPress={() => {handleChangePassword(password, newPassword); setEditPassword(false)}} />
                            <Button title="Cancel" onPress={() => setEditPassword(false)} />
                        </View>
                    </Fragment>
                    :
                    <Fragment>
                        <View style={styles.profileContainer}>
                            <View style={styles.details}><Text style={styles.txtDetails}>Username: {username}</Text></View>
                            <View style={styles.details}><Text style={styles.txtDetails}>Name: {name}</Text></View>
                            <View style={styles.details}><Text style={styles.txtDetails}>Country: {country}</Text></View>
                        </View>
                        <Button title="Edit Profile" onPress={() => setEdit(true)} />
                        <Button title="Change Password" onPress={() => setEditPassword(true)} />
                        <Button title="Sign Out" onPress={handleSignOut} />
                    </Fragment>
            }
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
      fontSize: 35,
  },
  subTitle: {
      fontSize: 25,
      marginTop: 10,
  },
  txtInput: {
      width: 350,
      height: 50,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      paddingLeft: 10,
  },
  profileContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  details: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      width: 300,
      backgroundColor: '#EAEAEA',
      borderBottomWidth: 1,
      borderBottomColor: '#BFBFBF',
  },
  txtDetails: {
      fontSize: 20,
  },
  btns: {
      flexDirection: 'row',
  }
});

export default Profile;
