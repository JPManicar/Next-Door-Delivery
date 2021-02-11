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
import axios from "axios";

export default function Checkout () {
  const nav = useNavigation();
  var card = [];
  if (card.length) {
      for (let i = 0; i < 5; i++) {
      card.push(
          <OrderCard />
      );
    }
  }
  
  function orderNow () {
    nav.navigate('Order Details');
  }
  return(
    <View style={styles.container}>
      <Text style={styles.logo}>ITEMS IN CART</Text>
      <ScrollView style={styles.scroll}>
        {card}
      </ScrollView>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={() => orderNow()}>Place Order</Text>
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