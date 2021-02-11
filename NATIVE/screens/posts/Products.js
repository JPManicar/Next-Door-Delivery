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
import { ListProductContext, filterTypeContext } from '../../UserContext';
import { SearchBar } from 'react-native-elements';

export default function Products () {
  const [search, setSearch] = useState("");
  const {listProduct, setListProduct} = useContext(ListProductContext);
  const {filterType, setFilterType} = useContext(filterTypeContext);
  const filters = ['raw', 'vegetable', 'Packed Goods', 'Essentials', 'Cooked Goods'];
  const nav = useNavigation();

  console.log(listProduct);
  var card = [];
  if (listProduct.length && filters.includes(filterType)) {
      console.log('filter', listProduct);
      const arr = listProduct.filter((item) =>  item.product_type.includes(filterType) )
      for (let i = 0; i < arr.length; i++) {
      card.push(
          <ProductCard prop={arr[i]} />
      );
    }
  } else if (listProduct.length) {
    Keyboard.dismiss()
    for (let i = 0; i < listProduct.length; i++) {
      if (listProduct[i].title.includes(filterType)) {
        card.push(
          <ProductCard prop={listProduct[i]} />
        );
      }
    }
  }

  return(
    <View style={styles.container}>
      <View>
          <SearchBar
              placeholder="Type Here to Search..." 
              onChangeText={text => setFilterType(text)}
              />
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