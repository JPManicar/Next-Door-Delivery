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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {prod_types} from '../constants/constant';
import TypeCard from '../components/TypeCard';

export default function  Categories ({prop}) {


  var card = [];
  for (let i = 0; i < 5; i++) {
    card.push(
       <TypeCard prop={{type:prod_types[i], prod:prop}}/>
    );
  }

  return (
    <ScrollView style={styles.scroll} horizontal={true}>
       {card}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width:400,
  },
});