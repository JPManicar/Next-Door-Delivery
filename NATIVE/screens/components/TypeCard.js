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
import { filterTypeContext } from '../../UserContext';


export default function TypeCard({prop}) {
  const navigation = useNavigation();
  const {filterType, setFilterType} = useContext(filterTypeContext);

  function goToProducts () {
    setFilterType(prop.type.value);
    navigation.navigate('list product');
  }
  return (
    <TouchableOpacity onPress={() => goToProducts() }>
      <View style={styles.container}>
        <Image style={styles.profile} source={prop.type.image} />
        <Text style={styles.label}>{prop.type.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: 120,
    borderRadius:2,
    width: 100,
    margin: 10,
    padding: 10
  },
  profile: {
    width: 50,
    height: 50,
  },
  label: {
    height: 40,
    fontSize:13,
    color:"black",
    margin:0,
    marginBottom:10,
    padding: 5,
  },
});
