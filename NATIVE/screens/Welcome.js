import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  Modal,
  ScrollView
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Welcome () {
  const navigation = useNavigation();
  var scrollX = new Animated.Value(0);
  var illustrations = [require('./assets/welcome.png'),]
  
  return (
    <View style={styles.container}>
          <View style={styles.inputView} >
            <Image
                  source={require('./assets/connect.jpg')}
                  style={styles.miniProfile}
                />
            <Text style={styles.miniLogo}>Get your food by connecting with others</Text>
          </View>
           
            <TouchableOpacity style={styles.loginBtn}  onPress={() => navigation.navigate('signup')}>
                <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('login')}>
                <Text style={styles.loginText}>Log In</Text>
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
    logoView: {
    width:1,
    height: 2,
    alignItems: 'center',
    marginTop: 5
    },
    miniLogo:{
      fontSize:17,
      color:"#808080",
      marginBottom:10,
      alignItems: 'center',
    },
    miniProfile: {
      marginLeft: 75,
      alignItems: 'center',
      width:150,
      height: 150,
    },
    profile: {
      alignItems: 'center',
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