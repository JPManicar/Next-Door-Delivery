import React, {useState, createRef}  from 'react';
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
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
  
export default function SignUp () {
  const navigation = useNavigation();
  const [Username, setUsername] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [RPassword, setRPassword] = React.useState('');

  function saveData(type) {
  if (Password === RPassword) {
    if (Username !== '') {
      navigation.navigate('entity',{
            itemId: 1,
            user: Username,
            pass: Password,
            type: type,
      });
    }
  } 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
      <View style={styles.inputView} >    
            <TextInput  
              style={styles.inputText}
              placeholder="sample@sample.com"
              value={Username}
              placeholderTextColor="#003f5c"
              onChangeText={e => setUsername(e)}
              />
        </View>
        <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              value={Password}
              placeholder="My Password..." 
              placeholderTextColor="#003f5c"
              onChangeText={e => setPassword(e)}/>
        </View>

        <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              value={RPassword}
              placeholder=" My Password..." 
              placeholderTextColor="#003f5c"
              onChangeText={e => setRPassword(e)}/>
        </View>
        <Text> Sign up as a: </Text>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={() => saveData('User')}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={() => saveData('Rider')}>Rider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={() => saveData('Seller')}>Seller</Text>
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
    marginTop:80,
  },
  inputView:{
    width: 300,
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    margin:0,
    marginBottom: 10
  },
  inputText:{
    height: 50,
    fontSize:18,
    color:"black",
    borderColor: '#a6a6a6',
    borderWidth: 1,
    width:300,
    borderRadius:25,
    justifyContent:"center",
    margin:0,
    padding: 10,
  },
  loginBtn:{
    width:320,
    borderColor: "#ffdb58",
    backgroundColor:"#ffdb58",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginBottom: 10
  },
  loginText:{
    color:"white"
  }
});
