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
import { UserContext, ProductContext, TypeContext } from '../../UserContext';
import axios from "axios";

export default function ProductDetail() {
  const navigation = useNavigation();
  const {product, setProduct} = useContext(ProductContext);
  const {user, setUser} = useContext(UserContext);
  const {types, setTypes} = useContext(TypeContext);

  console.log('PRODUCT',product);

  function cart () {
    const relation = {
      product: product.id,
      user: user.id,
      prod_state: 'cart'
    }
    axios.post("http://10.0.2.2:8000/api/associate/user/products", relation)
      .then((response) => {
        if(response.status == 200 || response.status == 201) {

        Alert.alert(
          "Success",
          "Product added to cart. Please click the back button on top to go back.",
          [{ text: "OK" }],
        );
          console.log(response);
        }
        
        else {
          console.log(response);
          Alert.alert(
              "Failed",
              "Failed to add product. Please try again.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            );
        }
      });
  }

  if (types == 'User')  {
    return(
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image style={styles.profile}source={require('../assets/packedGoods.png')} />
          </View>
          <Text style={styles.logo}>PRODUCT DETAILS</Text>

          <View style={styles.inputView}>
              <Text style={styles.labelAdress}>TITLE: </Text>
              <Text style={styles.inputAddressText}>{product.title}</Text>
          </View>

          <View style={styles.inputView}>
              <Text style={styles.labelAdress}>DESCRIPTION: </Text>
              <Text style={styles.inputAddressText}>{product.product_description}</Text>
          </View>
         
          <View style={styles.inputView}>
              <Text style={styles.labelAdress}>QUANTITY LEFT: </Text>
              <Text style={styles.inputAddressText}>{product.quantity}</Text>
          </View>

          <View style={styles.inputView}>
               <Text style={styles.labelInput}>PRICE: </Text>
              <Text style={styles.inputText}>Php {product.price}</Text>
          </View>

          <TouchableOpacity style={styles.loginBtn}> 
              <Text style={styles.buttonText} onPress={() => cart()}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>    
    );
  } else {
    const [title, setTitle] = useState(product.title);
    const [product_description, setProductDescription] = useState(product.product_description);
    const [quantity, setQuantity] = useState(product.quantity.toString());
    const [price, setPrice] = useState(product.price.toString());

    function update () {
    const entity = {
      id: product.id,
      title: title,
      product_description: product_description,
      product_type: product.product_type,
      quantity: quantity,
      price: price
    };
    axios.put("http://10.0.2.2:8000/api/product/"+ product.id +"/details", entity)
      .then((response) => {
          if (response.status == 200 || response.status == 201) {
              Alert.alert(
                "Success",
                "Product Update. Redirecting you to dashboard.",
                [{ text: "OK", onPress: () => navigation.navigate('home', {screen: 'Dashboard'}) }],
              );
          } else {
              Alert.alert(
                "Failed",
                "Failed to add product. Please try again.",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              );
          }
      });
  }

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image style={styles.profile}source={require('../assets/packedGoods.png')} />
          </View>
          <Text style={styles.logo}>PRODUCT DETAILS</Text>

          <View style={styles.inputView}>
              <Text style={styles.labelInput}>TITLE: </Text>
              <TextInput style={styles.inputText}
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="title"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
          </View>

          <View style={styles.inputView}>
              <Text style={styles.labelAdress}>DESCRIPTION: </Text>
              <TextInput style={styles.inputAddressText}
                    onChangeText={(text) => setProductDescription(text)}
                    value={product_description}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Description"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
          </View>
         
          <View style={styles.inputView}>
              <Text style={styles.labelInput}>QUANTITY LEFT: </Text>
              <TextInput style={styles.inputText}
                    onChangeText={(text) => setQuantity(text)}
                    value={quantity}
                    keyboardType='numeric'
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="quantity"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
          </View>

          <View style={styles.inputView}>
              <Text style={styles.labelInput}>PRICE: </Text>
              <TextInput style={styles.inputText}
                    onChangeText={(text) => setPrice(text)}
                    keyboardType='numeric'
                    value={price}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Price"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
          </View>

          <TouchableOpacity style={styles.loginBtn}> 
              <Text style={styles.buttonText} onPress={() => update()}>Update Product Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    width:400,
    height: 500,
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
    height: 80,
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
    height:80,
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
