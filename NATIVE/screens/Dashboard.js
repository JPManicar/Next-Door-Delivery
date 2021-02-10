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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import axios from "axios";
import Categories from './posts/Categories';
import StoreDetail from './components/StoreDetail';
import ProductCard from './components/ProductCard';

import {UserContext, TypeContext, StoreContext, ProductContext} from '../UserContext';
import ProductAdder from './components/ProductAdder';

export default function Dashboard() { 
  const {user,setUser} = useContext(UserContext);
  const {types, setTypes} = useContext(TypeContext);
  const {store, setStore} = useContext(StoreContext);
  const {prod, setProd} = useContext(ProductContext);

  const [search, setSearch] = useState("");
  const storeId = (types == 'Seller') ? store.id : 0;
  const [product, setProduct] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getProductsList();
  }, []);

  function getProductsList() {
    const url = {'User': "http://10.0.2.2:8000/api/product/create",
                'Seller': "http://10.0.2.2:8000/api/associate/store/"+ storeId +"/products",
                'Rider': "http://10.0.2.2:8000/api/associate/rider/"+ user.id +"/user"}
    return fetch(url[types], {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        setProduct(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function orderNow () {
    navigation.navigate('Product Details');
  }



  var card = [];
  if (product.length) {
    for (let i = 0; i < product.length; i++) {
      card.push(
          <ProductCard prop={product[i]} onPress={() => orderNow()} />
      );
    }
  }

  if (types == 'User') {
    return ( 
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View>
            <SearchBar
              placeholder="Type Here to Search..." 
              onChangeText={text => setSearch(text)}
              />
          </View>

          <View>
            <Text style={styles.logo}>CATEGORIES</Text>
            <Categories prop={product}/>
          </View>

          <View>
             <Text style={styles.logo}>PRODUCTS</Text>
              {card}
          </View>
        
        </ScrollView>
      </View>
    );  
  } else {
      return ( 
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View>
            <TextInput  
              style={styles.inputText}
              placeholder="Search..." 
              placeholderTextColor="#003f5c"
              onChangeText={text => setSearch(text.target.value)}/>
          </View>

          <View>
            <StoreDetail prop={store}/>
          </View>

          <View>
             <Text style={styles.logo}>PRODUCTS</Text>
              {card}
          </View>
          <ProductAdder />
        </ScrollView>
      </View>
    );
  }
  
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
    marginLeft: 10,
    marginTop: 10,
  },
  inputText:{
    height: 30,
    fontSize:15,
    color:"black",
    borderColor: '#a6a6a6',
    borderRadius:5,
    backgroundColor: '#fff',
    borderWidth: 1,
    width:200,
    margin:0,
    marginBottom:10,
    padding: 10,
  },
});