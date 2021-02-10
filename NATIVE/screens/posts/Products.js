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

import ProductCard from '../components/ProductCard';
import { ProductContext } from '../../UserContext';


export default function Products () {
  const [search, setSearch] = useState("");
  const {product, setProduct} = useContext(ProductContext);
  const nav = useNavigation();

  console.log(product);
  var card = [];
  if (product.length) {
      for (let i = 0; i < product.length; i++) {
      card.push(
          <ProductCard prop={product[i]} />
      );
    }
  }
  
  return(
    <View style={styles.container}>
      <View>
          <TextInput  
            style={styles.inputText}
            placeholder="Search..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setSearch(text.target.value)}/>
      </View>
      <Text style={styles.logo}>PRODUCTS</Text>
      <ScrollView style={styles.scroll}>
        {card}
      </ScrollView>
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