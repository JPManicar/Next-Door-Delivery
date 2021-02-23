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
import ProductCard from '../components/ProductCard';

export default function Payment () {
  const {user,setUser} = useContext(UserContext);

  const [address, setAddress] = useState(user.address);
  const [City, setCity] = useState(user.City);
  const [Province, setProvince] = useState(user.Province);
  const [Country, setCountry] = useState(user.Country);
  const navigation = useNavigation();
  var total = 0;
  var card = [];

  const [cartList, setCartList] = useState([]);
  if (cartList.length) {
      for (let i = 0; i < cartList.length; i++) {
      card.push(
          <ProductCard prop={cartList[i]}/>
      );
      total += cartList[i].price;
    }
  }

  useEffect(() => {
    getProductsList();
  }, []);

  function getProductsList () {
    fetch("http://10.0.2.2:8000/api/associate/user/"+ user.id +"/products?prod_state=payment", {
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
  function paymentProduct () {
    var success = 0;
    for (let i = 0; i < cartList.length; i++) {
      const entity = {
        id: cartList[i].associates_id,
        user: user.id,
        product: cartList[i].id,
        prod_state: 'rider'
      }
      axios.put("http://10.0.2.2:8000/api/associate/user/"+ cartList[i].associates_id +"/products/details", entity)
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            console.log(response);
            if (i == cartList.length-1) {
              Alert.alert(
                "Success",
                "Products moved to checkout",
                [{ text: "OK", onPress: () => navigation.navigate('Order Details') }],
              );
            }
          } else {
            console.log(response);
          }
        });
    }
    if (success) {
      Alert.alert(
        "Success",
        "Products moved to checkout",
        [{ text: "OK", onPress: () =>navigation.navigate('payment') }],
      );
    }
  }
  
  return(
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
      <Text style={styles.logo}>ITEMS IN PAYMENT</Text>
        {card}
      <Text style={styles.logo}>COMPLETE ADDRESS</Text>
      <View style={styles.inputAddressView}>
          <Text style={styles.labelAdress}>Address: </Text>
          <Text style={styles.inputAddressText}>
          {address}
          </Text>
      </View>

      <View style={styles.inputView}>
          <Text style={styles.labelInput}>City: </Text>
          <Text style={styles.inputText}>
          {City}
          </Text>
      </View>
      <View style={styles.inputView}>
          <Text style={styles.labelInput}>Province: </Text>
          <Text style={styles.inputText}>
          {Province}
          </Text>
      </View>

      <Text style={styles.logo}>Total: {total}</Text>
      <Text style={styles.logo}>Payment Mode: Cash on delivery</Text>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={() => paymentProduct()}>comfirm payment</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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