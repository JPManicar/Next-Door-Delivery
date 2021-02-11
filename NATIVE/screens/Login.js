import React, {useState, createRef, useContext}  from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {UserContext, TypeContext, StoreContext} from '../UserContext';


export default function Login () {
  const navigation = useNavigation();

  const [Username, setUsername] = React.useState('');
  const [Password, setPassword] = React.useState('');

  const {user,setUser} = useContext(UserContext);
  const {types, setTypes} = useContext(TypeContext);
  const {store,setStore} = useContext(StoreContext);

  const url = {'User': "http://10.0.2.2:8000/api/user/"+ Username +"/details",
               'Rider': "http://10.0.2.2:8000/api/rider/"+ Username +"/details",
               'Seller': "http://10.0.2.2:8000/api/seller/"+ Username +"/details"}
  const storeURL = "http://10.0.2.2:8000/api/associate/seller/"+ user.id +"/store"

  function login (type) {
    setTypes(type);
    fetch(url[type], {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
        if (user.Password == Password) {
          if (type == 'User' || type == 'Rider') {
            Alert.alert(
                "Success",
                "Redirecting you to dashboard.",
                [{ text: "OK", onPress: () => navigation.navigate('home',{ screen: 'Dashboard' }) }],
              );
          } else {
            Alert.alert(
                "Success",
                "Welcome Seller. Redirecting you to dashboard.",
                [{ text: "OK", onPress: () => getStore() }],
              );
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getStore () {
    fetch(storeURL, {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json[0]);
        setStore(json[0]);
        navigation.navigate('home',{ screen: 'Dashboard' });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Login</Text>
      <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Email..." 
              placeholderTextColor="#003f5c"
              onChangeText={text => setUsername(text)}/>
        </View>
        <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..." 
              placeholderTextColor="#003f5c"
              onChangeText={text => setPassword(text)}/>
        </View>
        <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text> Sign up as a: </Text>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={() => login('User')}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={() => login('Rider')}>Rider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={() => login('Seller')}>Seller</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:30,
      color:"black",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      height: 60
    },
    inputText:{
      height:50,
      fontSize:18,
      color:"black",
      borderColor: 'black',
      borderWidth: 1,
      width:"80%",
      borderRadius:25,
      justifyContent:"center",
      padding:10
    },
    forgot:{
      color:"white",
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      borderColor: "#ffdb58",
      backgroundColor:"#ffdb58",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
});
