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
import {ProductContext, UserContext} from '../../UserContext';

export default function UserCard({prop}) {
  const navigation = useNavigation();
  const {product, setProduct} = useContext(ProductContext);
  const {user, setUser} = useContext(UserContext);
  console.log(prop);
  function createRecord () {
    setProduct(prop.product);
    console.log('PROD CARD', product);
    var entity = {
      user: product.id,
      rider: user.id,
      rider_state: 'toShop'
    }
    console.log(entity);
    if (prop.type == 'pending') {
      axios.post('http://10.0.2.2:8000/api/associate/user/rider', entity)
      .then((response) => {
        if(response.status == 200 || response.status == 201) {
          Alert.alert(
              "Success",
              "User message saved",
              [{ text: "OK", onPress: () =>navigation.navigate('home', {screen: 'tracker'}) }],
            );
          console.log(response.data);
        } else {
          console.log(response);
          Alert.alert(
              "Failed",
              "User creation Failed. You might have not filled all the fields.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            );
        }
    });
    } else {
      navigation.navigate('home', {screen: 'tracker'});
    }
    
  }
  return (
    <TouchableOpacity onPress={() => createRecord()}>
      <View style={styles.container}>   
        <Image style={styles.profile}source={require('../assets/user.png')} />
        <View>
          <Text style={styles.title}>{prop.product.preferred_name}</Text>
          <Text style={styles.label}>Address: {prop.product.address} {prop.product.City}, {prop.product.Country}</Text>
          <Text style={styles.label}>Latitude: {prop.product.latitude}</Text>
          <Text style={styles.label}>Longitude: {prop.product.longitude}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    margin:0,
    marginBottom: 10,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  profile: {
    alignItems: 'center',
  },
  title: {
    height: 35,
    fontSize:18,
    color:'black',
    fontWeight: 'bold',
    margin:0,
    marginBottom:5,
    padding: 5,
  },
  label: {
    fontSize:14,
    color:'black',
    marginBottom:5,
    marginLeft: 10
  }
});
