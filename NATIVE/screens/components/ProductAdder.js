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
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function ProductAdder() {
  const navigation = useNavigation();
  function goToProductDetail () {
    navigation.navigate('add product');
  }
  return (
    <TouchableOpacity onPress={() => goToProductDetail()}>
      <View style={styles.container} >   
          <Text style={styles.title}>+ Add another product</Text>
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
