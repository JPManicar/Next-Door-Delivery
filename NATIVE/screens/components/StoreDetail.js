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
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function StoreDetail({prop}) {
  const navigation = useNavigation();
  const [product, setProduct] = useState({});
  
  function cart () {
    Alert.alert(
      "Success",
      "Product added to cart. Please click the back button on top to go back.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    );
  }

  return(
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <View style={styles.logoView}>
                  <Image style={styles.profile}source={require('../assets/packedGoods.png')} />
                </View>
                <Text style={styles.logo}>STORE DETAILS</Text>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>NAME: </Text>
                    <Text style={styles.inputText}>{prop.Name}</Text>
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelAdress}>DESCRIPTION: </Text>
                    <Text style={styles.inputAddressText}>{prop.details}</Text>
                </View>
               
                <View style={styles.inputView}>
                    <Text style={styles.labelAdress}>ADDRESS: </Text>
                    <Text style={styles.inputAddressText}>{prop.address}</Text>
                </View>

                <View style={styles.inputView}>
                     <Text style={styles.labelInput}>OPENING HOURS: </Text>
                    <Text style={styles.inputText}>{prop.opening_hours}</Text>
                </View>
            </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
  scroll: {
    width:400,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo:{
    fontWeight:"bold",
    fontSize:15,
    color:"#808080",
    marginBottom:10,
    marginLeft: 10
  },
  logoView: {
    width:"97%",
    height: 100,
    alignItems: 'center',
    marginTop: 40
  },
  profile: {
    alignItems: 'center',
  },
  inputView:{
    width:380,
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    margin:0,
    marginBottom: 10,
    marginLeft: 10
  },
  inputAddressView:{
    width:380,
    height: 80,
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    margin:0,
    marginBottom: 10,
    marginLeft: 10
  },
  labelAdress: {
    height: 80,
    fontSize:13,
    color:"black",
    borderColor: '#a6a6a6',
    borderRadius:2,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    margin:0,
    marginBottom:10,
    padding: 5,
    width: 120
  },
  inputAddressText:{
    height:80,
    fontSize:15,
    color:"black",
    borderColor: '#a6a6a6',
    borderRadius:2,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    width:250,
    justifyContent:"center",
    margin:0,
    marginBottom:10,
    padding: 10,
  },
  labelInput: {
    height: 45,
    fontSize:13,
    color:"black",
    borderColor: '#a6a6a6',
    borderRadius:2,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    margin:0,
    marginBottom:10,
    padding: 5,
    width: 120
    },
  inputText:{
    height: 45,
    fontSize:15,
    color:"black",
    borderColor: '#a6a6a6',
    borderRadius:2,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    width:250,
    justifyContent:"center",
    margin:0,
    marginBottom:10,
    padding: 10,
  },
  loginBtn:{
    width:400,
    borderColor: "#ffdb58",
    backgroundColor:"#ffdb58",
    borderRadius:3,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    fontWeight:"bold",
  },
  loginText:{
    color:"white"
  }
});
