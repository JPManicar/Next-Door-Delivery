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

export default function Checkout () {
  const {user,setUser} = useContext(UserContext);
  const navigation = useNavigation();
  var card = [];

  const [cartList, setCartList] = useState([]);
  if (cartList.length) {
      for (let i = 0; i < cartList.length; i++) {
      card.push(
          <ProductCard prop={cartList[i]}/>
      );
    }
  }

  useEffect(() => {
    getProductsList();
  }, []);

  

  function getProductsList () {
    fetch("http://10.0.2.2:8000/api/associate/user/"+ user.id +"/products?prod_state=checkout", {
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
        prod_state: 'payment'
      }
      axios.put("http://10.0.2.2:8000/api/associate/user/"+ cartList[i].associates_id +"/products/details", entity)
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            console.log(response);
            if (i == cartList.length-1) {
              Alert.alert(
                "Success",
                "Products moved to payment",
                [{ text: "OK", onPress: () => navigation.navigate('Payment') }],
              );
            }
          } else {
              console.log(response);
          }
        });
    }
  }
  
  return(
    <View style={styles.container}>
      <Text style={styles.logo}>ITEMS IN CHECKOUT</Text>
      <ScrollView style={styles.scroll}>
        {card}
      </ScrollView>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={() => paymentProduct()}>proceed to payment</Text>
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