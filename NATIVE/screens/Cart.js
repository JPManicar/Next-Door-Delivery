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

import { UserContext, TypeContext } from '../UserContext';
import ProductCard from './components/ProductCard';

export default function Cart() {
  const {user,setUser} = useContext(UserContext);
  const {types, setTypes} = useContext(TypeContext);

  const [cartList, setCartList] = useState([]);
  const [success, setSuccess] = useState(0);
  const [isActive, setIsActive] = useState(true);
  var navigation = useNavigation();
  var card = [];

  useEffect(() => {
    getProductsList();
  }, []);

  if (cartList.length) {
      for (let i = 0; i < cartList.length; i++) {
      card.push(
          <ProductCard prop={cartList[i]}/>
      );
    }
  } else {
    card.push(
      <Image
          source={require('./assets/no_items_found.jpg')}
          style={styles.miniProfile}
        />
    );
  }

  function getProductsList () {
    if (isActive) {
      fetch("http://10.0.2.2:8000/api/associate/user/"+ user.id +"/products?prod_state=cart", {
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
        setIsActive(false);
    } else {
      return;
    }
  }
  function checkoutProduct () {
    for (let i = 0; i < cartList.length; i++) {
      const entity = {
        id: cartList[i].associates_id,
        user: user.id,
        product: cartList[i].id,
        prod_state: 'checkout'
      }
      axios.put("http://10.0.2.2:8000/api/associate/user/"+ cartList[i].associates_id +"/products/details", entity)
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
              console.log(response);
              if (i == cartList.length-1) {
                Alert.alert(
                  "Success",
                  "Products moved to checkout",
                  [{ text: "OK", onPress: () => navigation.navigate('Checkout') }],
                );
              }
          } else {
            Alert.alert(
              "Process Failed",
              "Please check it out again",
              [{ text: "OK"}],
            );
          }
        });
    }
    
  }

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

const styles = StyleSheet.create({
  scroll: {
    width:"100%",
  },
  miniProfile: {
    marginTop: 100,
    width:370,
    height: 300,
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