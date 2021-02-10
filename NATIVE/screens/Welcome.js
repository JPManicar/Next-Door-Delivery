import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Welcome () {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
          <View style={styles.inputView} >
            <Text style={styles.logo}>Welcome</Text>
          </View>
           
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText} onPress={() => navigation.navigate('signup')}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText} onPress={() => navigation.navigate('login')}>Log In</Text>
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
    tinyLogo: {
      width: 250,
      height: 250,
    },
    logo:{
      fontWeight:"bold",
      fontSize:30,
      color:"black",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      height: 250
    },
    loginBtn:{
      width:"80%",
      borderColor: "#ffdb58",
      backgroundColor:"#ffdb58",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
});