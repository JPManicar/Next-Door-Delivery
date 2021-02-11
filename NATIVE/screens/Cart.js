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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

import { UserContext, TypeContext } from '../UserContext';
import ProductCard from './components/ProductCard';

export default function Cart() {
  const {user,setUser} = useContext(UserContext);
  const {types, setTypes} = useContext(TypeContext);

  const [cartList, setCartList] = useState([]);
  var nav = useNavigation();
  var card = [];
  if (cartList.length) {
      for (let i = 0; i < cartList.length; i++) {
      card.push(
          <ProductCard prop={cartList[i]}/>
      );
    }
  }

  function getList () {
    fetch("http://10.0.2.2:8000/api/associate/user/"+ user.id +"/products?prod_type=cart", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        setCartList(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function checkoutProduct () {
    //TODO: add some functionality to update status to checkout
    nav.navigate('Checkout');
  }
  if (prop.user.active_buyer) {
    return(
      <View style={styles.container}>
        <Text style={styles.logo}>ITEMS IN CART</Text>
        <ScrollView style={styles.scroll}>
          {card}
        </ScrollView>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={() => checkoutProduct()}>Checkout</Text>
        </TouchableOpacity>
      </View>
    );
  } 
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