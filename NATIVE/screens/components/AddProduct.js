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
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {StoreContext, ListProductContext} from '../../UserContext';

export default function AddProduct() {
  const [title, setTitle] =  useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_type, setProductType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const navigation = useNavigation();
  const {store,setStore} = useContext(StoreContext);
  const {listProduct, setListProduct} = useContext(ListProductContext);

  function addProduct () {
    const entity = {
      title: title,
      product_description: product_description,
      product_type: product_type,
      quantity: quantity,
      price: price
    }
    axios.post("http://10.0.2.2:8000/api/product/create", entity)
      .then((response) => {
        if(response.status == 200 || response.status == 201) {
          Alert.alert(
                "Success",
                "Product saved. Will now redirect you to Dashboard after pressing okay.",
                [{ text: "OK", onPress: () =>  saveRelation(response.data) }],
              );
            console.log(response);
           
        } else {
          console.log(response);
          Alert.alert(
              "Error",
              "Product creation Failed. You might have not filled all the fields.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            );
        }
      });
  }

  function saveRelation(product) {
    const relation = {
        product: product.id,
        store: store.id
    }
   
    axios.post("http://10.0.2.2:8000/api/associate/store/products", relation)
      .then((response) => {
          console.log(response);
          setListProduct(listProduct.concat(product));
          navigation.navigate('home', { screen: 'Dashboard'});
       });
  }

  return(
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <View style={styles.logoView}>
                  <Image style={styles.profile}source={require('../assets/essentials.png')} />
                </View>
                <Text style={styles.logo}>ADD PRODUCT</Text>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>TITLE: </Text>
                    <TextInput  
                      style={styles.inputText}
                      placeholder="name of your product..." 
                      placeholderTextColor="#003f5c"
                      onChangeText={text => setTitle(text)}/>
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelAdress}>DESCRIPTION: </Text>
                    <TextInput  
                      style={styles.inputAddressText}
                      placeholder="give a short description..." 
                      placeholderTextColor="#003f5c"
                      onChangeText={text => setProductDescription(text)}/>
                </View>

               <View style={styles.inputView}>
                    <Text style={styles.labelInput}>TYPE: </Text>
                    <TextInput  
                      style={styles.inputText}
                      placeholder="type of product..." 
                      placeholderTextColor="#003f5c"
                      onChangeText={text => setProductType(text)}/>
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>QUANTITY LEFT: </Text>
                    <TextInput  
                      style={styles.inputText}
                      placeholder="quantity..." 
                      placeholderTextColor="#003f5c"
                      onChangeText={text => setQuantity(text)}/>
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>PRICE: </Text>
                    <TextInput  
                      style={styles.inputText}
                      placeholder="price..." 
                      placeholderTextColor="#003f5c"
                      onChangeText={text => setPrice(text)}/>
                </View>

                <TouchableOpacity style={styles.loginBtn}> 
                    <Text style={styles.buttonText} onPress={() => addProduct()}>Add Product</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
  scroll: {
    width:400,
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
  logoView: {
    width:"97%",
    height: 100,
    alignItems: 'center',
    marginTop: 40
  },
  profile: {
    alignItems: 'center',
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
    width:400,
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
