import React, {useState, useEffect, useContext}  from 'react';
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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

import { UserContext, TypeContext } from '../../UserContext';
import OrderCard from '../components/OrderCard'

export default function OrderDetails () {
  const {user,setUser} = useContext(UserContext);
  const [address, setAddress] = useState(user.address);
  const [City, setCity] = useState(user.City);
  const [Province, setProvince] = useState(user.Province);
  const [Country, setCountry] = useState(user.Country);
  const [ContactNo, setContactNo] = useState(user.ContactNo);
  const navigation = useNavigation();
  var total = 0;
  var card = [];

  const [cartList, setCartList] = useState([]);
  if (cartList.length) {
      for (let i = 0; i < cartList.length; i++) {
      card.push(
          <OrderCard prop={cartList[i]}/>
      );
      total += cartList[i].price;
    }
  }

  useEffect(() => {
    getProductsList();
  }, []);

  function getProductsList () {
    fetch("http://10.0.2.2:8000/api/associate/user/"+ user.id +"/products?prod_state=rider", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setCartList(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function orderNow () {
    navigation.navigate('home',{ screen: 'tracker' })
  }

  return(
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
      <Text style={styles.logo}>ORDER DETAILS</Text>
         <View style={styles.detailsView}>
          <View style={styles.inputAddressView}>
                <Text style={styles.labelAdress}>Address: </Text>
              <TextInput style={styles.inputAddressText}
              onChangeText={(text) => setAddress( text)}
              value={address}
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
              value={City}
              onChangeText={(text) => setCity(text)}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter City"
              placeholderTextColor = "#002f6c"
              selectionColor="#fff"
              />
          </View>
          <View style={styles.inputView}>
              <Text style={styles.labelInput}>Province: </Text>
              <TextInput style={styles.inputText}
              value={Province}
              onChangeText={(text) => setProvince(text)}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter Province"
              placeholderTextColor = "#002f6c"
              selectionColor="#fff"
              />
          </View>

          <View style={styles.inputView}>
              <Text style={styles.labelInput}>Contact No: </Text>
              <TextInput style={styles.inputText}
              value={ContactNo}
              onChangeText={(text) => setContactNo(text)}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter Contact No"
              placeholderTextColor = "#002f6c"
              selectionColor="#fff"
              />
          </View>
        </View>
        {card}
      <Text style={styles.logo}>Total: </Text>
      <Text>{total}</Text>
      <Text style={styles.logo}>Payment Mode: Cash on delivery</Text>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={()=> orderNow()}>Track Order</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
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
    height: 140,
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    margin:0,
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
    width: 120
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