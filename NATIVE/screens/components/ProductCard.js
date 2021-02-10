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
import {ProductContext} from '../../UserContext';

export default function ProductCard({prop}) {
  const navigation = useNavigation();
  const {product, setProduct} = useContext(ProductContext);

  function goToProductDetail () {
    setProduct(prop);
    navigation.navigate('Product Details');
  }
  return (
    <TouchableOpacity onPress={() => goToProductDetail()}>
      <View style={styles.container}>   
        <Image style={styles.profile}source={require('../assets/vegetable.png')} />
        <View>
          <Text style={styles.title}>{prop.title}</Text>
          <Text style={styles.label}>Type: {prop.product_type}</Text>
          <Text style={styles.label}>Price: {prop.price}</Text>
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
    marginLeft: 10
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
    marginBottom:10,
    marginLeft: 10
  }
});
