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

import { UserContext } from '../../UserContext';

export default function Payment () {
  const {user,setUser} = useContext(UserContext);
  const nav = useNavigation();

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
    //TODO: ?prod_state= to payment
    fetch("http://10.0.2.2:8000/api/associate/user/"+ user.id +"/products?prod_state= payment", {
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
    //TODO: edit prod_state to rider
    var success = 0;
    for (let i = 0; i < cartList.length; i++) {
      const entity = {
        user: user.id,
        product: cartList[i].id,
        prod_state: 'rider'
      }
      axios.put("associate/user/"+ user.id +"/products/details", entity)
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
              success = 1;
          } else {
              success = 0
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
  
  function orderNow () {
    nav.navigate('Order Details');
  }
  return(
    <View style={styles.container}>
      <Text style={styles.logo}>ITEMS IN CHECKOUT</Text>
      <ScrollView style={styles.scroll}>
        {card}
      </ScrollView>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={() => orderNow()}>payment</Text>
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