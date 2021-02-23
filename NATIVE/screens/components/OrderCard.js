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

export default function OrderCard({prop}) {
  const navigation = useNavigation();

  function goToTrackerDetail (prod) {
    navigation.navigate('tracker',{
      id: prop.id,
      product: prod,
    });
  }
  return (
    <TouchableOpacity>
      <View style={styles.container} onPress={() => goToTrackerDetail(prop)}>   
        <Image style={styles.profile}source={require('../assets/vegetable.png')} />
        <View>
          <Text style={styles.title}>{prop.title}</Text>
          <Text style={styles.label}>Type: {prop.product_type}</Text>
        </View>
        <Text style={styles.label}>Php {prop.price}</Text>
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
    height: 40,
    fontSize:13,
    color:'black',
    fontWeight: 'bold',
    margin:0,
    marginBottom:10,
    padding: 5,
  },
  label: {
    fontSize:11,
    color:'black',
    marginBottom:10,
  }
});
