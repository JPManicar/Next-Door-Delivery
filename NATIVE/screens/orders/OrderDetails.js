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
import OrderCard from '../components/OrderCard'
import axios from "axios";

export default function OrderDetails () {
  const [address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [Province, setProvince] = useState("");
  const [Country, setCountry] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const navigation = useNavigation();

  var card = [];
  if (card.length) {
      for (let i = 0; i < 5; i++) {
      card.push(
          <OrderCard />
      );
    }
  }

  function orderNow () {
    navigation.navigate('home',{ screen: 'tracker' })
  }

  return(
    <View style={styles.container}>
      <Text style={styles.logo}>ORDER DETAILS</Text>
         <View style={styles.detailsView}>
          <View style={styles.inputAddressView}>
                <Text style={styles.labelAdress}>Address: </Text>
              <TextInput style={styles.inputAddressText}
              onChangeText={(text) => setAddress( text.target.value)}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter Address"
              placeholderTextColor="#003f5c"
              selectionColor="#fff"
              multiline
              />
          </View>

          <View style={styles.inputView}>
              <Text style={styles.labelInput}>City: </Text>
              <TextInput style={styles.inputText}
              onChangeText={(text) => setCity(text.target.value)}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter City"
              placeholderTextColor = "#002f6c"
              selectionColor="#fff"
              />
          </View>
          <View style={styles.inputView}>
              <Text style={styles.labelInput}>Province: </Text>
              <TextInput style={styles.inputText}
              onChangeText={(text) => setProvince(text.target.value)}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter Province"
              placeholderTextColor = "#002f6c"
              selectionColor="#fff"
              />
          </View>

          <View style={styles.inputView}>
              <Text style={styles.labelInput}>Contact No: </Text>
              <TextInput style={styles.inputText}
              onChangeText={(text) => setContactNo(text.target.value)}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter Contact No"
              placeholderTextColor = "#002f6c"
              selectionColor="#fff"
              />
          </View>
        </View>
      <ScrollView style={styles.scroll}>
        {card}
      </ScrollView>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={()=> orderNow()}>Track Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width:"100%",
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
  detailsView: {
    width:"97%",
    height:330,
  },
  inputView:{
    width:"97%",
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    margin:0,
    marginBottom: 5,
    marginLeft: 10
  },
  inputAddressView:{
    width:"97%",
    height: 140,
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    margin:30,
    marginBottom: 10,
    marginLeft: 10
  },
  labelAdress: {
    height: 130,
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
    width: "30%"
  },
  inputAddressText:{
    height:130,
    fontSize:15,
    color:"black",
    borderColor: '#a6a6a6',
    borderRadius:2,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    width:"65%",
    justifyContent:"center",
    margin:0,
    marginBottom:10,
    padding: 10
  },
  labelInput: {
    height: 30,
    fontSize:13,
    color:"black",
    borderColor: '#a6a6a6',
    borderRadius:2,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    margin:0,
    marginBottom:5,
    padding: 5,
    width: "30%"
    },
  inputText:{
    height: 30,
    fontSize:15,
    color:"black",
    borderColor: '#a6a6a6',
    borderRadius:2,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    width:"65s%",
    justifyContent:"center",
    margin:0,
    marginBottom:5,
    padding: 10
  },
  loginBtn:{
    width:"100%",
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