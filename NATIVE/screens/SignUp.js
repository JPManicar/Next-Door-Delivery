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
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Image
          source={require('./assets/login.png')}
          style={styles.miniProfile}
        />
        <View style={styles.inputView} > 
             <Text style={styles.miniLogo}> Email: </Text>  
              <TextInput  
                style={styles.inputText}
                placeholder="sample@sample.com"
                value={Username}
                placeholderTextColor="#003f5c"
                onChangeText={e => setUsername(e)}
                />
          </View>
          <View style={styles.inputView} >
             <Text style={styles.miniLogo}> Password: </Text>
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                value={Password}
                placeholder="My Password..." 
                placeholderTextColor="#003f5c"
                onChangeText={e => setPassword(e)}/>
          </View>

          <View style={styles.inputView} >
             <Text style={styles.miniLogo}> Repeat Password: </Text>
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                value={RPassword}
                placeholder=" My Password..." 
                placeholderTextColor="#003f5c"
                onChangeText={e => setRPassword(e)}/>
          </View>
          <Text style={styles.txt}> Sign up as a: </Text>
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
     </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width:400,
    height: 600
  },
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
    marginBottom: 20
  },
  txt:{
    fontSize:17,
    color:"#808080",
    marginTop:50,
    marginBottom: 15
  },
  inputView:{
    width: 300,
    margin:0,
    marginBottom: 10,
    height: 70
  },
  miniProfile: {
    marginTop: 30,
    alignItems: 'center',
    width:150,
    height: 150,
  },
  miniLogo:{
    fontSize:17,
    color:"#808080",
    marginBottom:5,
    alignItems: 'center',
  },
  inputText:{
    height: 50,
    fontSize:18,
    color:"black",
    borderColor: '#a6a6a6',
    borderBottomWidth: 1,
    width:300,
    borderRadius:5,
    justifyContent:"center",
    margin:0,
    padding: 10,
  },
  loginBtn:{
    width:320,
    borderColor: "#ffdb58",
    backgroundColor:"#ffdb58",
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginBottom: 10
  },
  loginText:{
    color:"white"
  }
});
