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
import { SearchBar, Icon } from 'react-native-elements';
import axios from "axios";
import Categories from './posts/Categories';
import StoreDetail from './components/StoreDetail';
import ProductCard from './components/ProductCard';
import UserCard from './components/UserCard';

import {UserContext, TypeContext, StoreContext, ListProductContext, UserReqContext, filterTypeContext} from '../UserContext';
import ProductAdder from './components/ProductAdder';

export default function Dashboard() { 
  const {user,setUser} = useContext(UserContext);
  const {types, setTypes} = useContext(TypeContext);
  const {store, setStore} = useContext(StoreContext);
  const {listProduct, setListProduct} = useContext(ListProductContext);
  const {userReq, setUserReq} = useContext(UserReqContext);
  const {filterType, setFilterType} = useContext(filterTypeContext);

  const [search, setSearch] = useState("");
  const storeId = (types == 'Seller') ? store.id : 0;
  const [product, setProduct] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getProductsList();
    if (types == 'Rider') {
      getRiderAccepted();
    }
  }, []);

  function getProductsList() {
    const url = {'User': "http://10.0.2.2:8000/api/product/create",
                'Seller': "http://10.0.2.2:8000/api/associate/store/"+ storeId +"/products",
                'Rider': "http://10.0.2.2:8000/api/associate/user/pending/products?prod_state=rider"}
    return fetch(url[types], {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        setProduct(json);
        setListProduct(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getRiderAccepted() {
    return fetch("http://10.0.2.2:8000/api/associate/rider/"+ user.id +"/user", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        setUserReq(json);
        console.log("ACCEPTED: ", json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function orderNow () {
    navigation.navigate('Product Details');
  }

  function searchIt () {
      setFilterType(search);
      navigation.navigate('list product');
  }

  var card = [];
  var accept = [];
  if (product.length && !types.includes('Rider')) {
    for (let i = 0; i < product.length; i++) {
      card.push(
          <ProductCard prop={product[i]} onPress={() => orderNow()} />
      );
    }
  } else if (product.length && types.includes('Rider')) {
    for (let i = 0; i < product.length; i++) {
      if (accept.filter(obj => obj.id == product[i].id).length > 0) {
        card.push(
          <UserCard prop={{product: product[i], type: 'pending'}} />
        );
      }
    }
    for (let j = 0; j < userReq.length; j++) {
      accept.push(
          <UserCard prop={{product: userReq[j], type: 'accepted'}} />
      );
    }
  }

  if (types == 'User') {
    return ( 
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View>
            <SearchBar
              style={styles.searchpane}
              placeholder="Type Here to Search..." 
              value={search}
              onChangeText={text => setSearch(text)}
              onKey = {(event) => searchIt(event)}
              />
             <TouchableOpacity style={styles.loginBtn}> 
                <Text style={styles.buttonText} onPress={() => searchIt() }>Search</Text>
              </TouchableOpacity>
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
  } else if (types == 'Seller'){
      return ( 
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View>
            <SearchBar
              style={styles.searchpane}
              placeholder="Type Here to Search..." 
              value={search}
              onChangeText={text => setSearch(text)}
              onKey = {(event) => searchIt(event)}
              />
             <TouchableOpacity style={styles.loginBtn}> 
                <Text style={styles.buttonText} onPress={() => searchIt() }>Search</Text>
              </TouchableOpacity>
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
  } else {
    return ( 
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View>
             <Text style={styles.logo}>USERS PENDING</Text>
              {card}
          </View>
          <View>
             <Text style={styles.logo}>USERS ACCEPTED</Text>
              {accept}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    width:400,
  },
  searchTab: {
    flexDirection:'row',
    alignItems: 'center',
    margin:0,
    marginBottom: 10,
  },
  searchpane: {
    width: 300
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
  loginBtn:{
    width:400,
    borderColor: "#909090",
    backgroundColor:"#909090",
    borderRadius:3,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:0,
    fontWeight:"bold",
  },
  loginText:{
    color:"white"
  }
});