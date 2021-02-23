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
import axios from "axios";
import {StoreContext, UserContext} from '../../UserContext';


export default function CreateStore({prop}) {
    const [StoreNo, setStoreNo] =  useState("");
    const [Name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [address, setAddress] = useState("");
    const [opening_hours, setOpeningHours] = useState("");

    const navigation = useNavigation();
    const {user,setUser} = useContext(UserContext);
    const {store,setStore} = useContext(StoreContext);

    function saveData() {
        const entity = {
            StoreNo: StoreNo,
            Name: Name,
            details: details,
            address: address,
            opening_hours: opening_hours
        }
        axios.post("http://10.0.2.2:8000/api/store/create", entity)
      .then((response) => {
        if(response.status == 200 || response.status == 201) {
          console.log(response);
          saveRelation(response.data);
        }
        
        else {
          console.log(response);
          Alert.alert(
              "Failed",
              "User creation Failed. You might have not filled all the fields.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            );
        }
      });
    }

    function saveRelation(s) {
        setStore(s);
        const relation = {
            seller: user.id,
            store: store.id
        }
        console.log(user, store);
        axios.post("http://10.0.2.2:8000/api/associate/seller/store", relation)
            .then((response) => {
                console.log(response, relation);
                setStore(store);
                Alert.alert(
                "Success",
                "Store saved",
                [{ text: "OK", onPress: () => navigation.navigate('home', { screen: 'Dashboard'}) }],
              );
              
             });
    }
  
    return (
        <ScrollView style={styles.scroll}>
        <View style={styles.container}>
            <View style={styles.logoView}>
                <Image style={styles.profile}source={require('../assets/cart.png')} />
            </View>

            <Text style={styles.logo}>STEP 2: CREATE YOUR STORE</Text>

            <View style={styles.inputView}>
                <Text style={styles.labelInput}>Store No: </Text>  
                <TextInput style={styles.inputText}
                onChangeText={(name) => setStoreNo(name)}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Enter Store No"
                placeholderTextColor="#003f5c"
                selectionColor="#fff"
                />
            </View>
            
            <View style={styles.inputView}>
                <Text style={styles.labelInput}>Name: </Text>  
                <TextInput style={styles.inputText}
                onChangeText={(name) => setName(name)}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Enter Name"
                placeholderTextColor="#003f5c"
                selectionColor="#fff"
                />
            </View>

            <View style={styles.inputView}>
                <Text style={styles.labelInput}>Details: </Text>  
                <TextInput style={styles.inputText}
                onChangeText={(name) => setDetails(name)}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Enter Details"
                placeholderTextColor="#003f5c"
                selectionColor="#fff"
                />
            </View>

            <View style={styles.inputView}>
                <Text style={styles.labelInput}>Address: </Text>  
                <TextInput style={styles.inputText}
                onChangeText={(name) => setAddress(name)}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Enter Address"
                placeholderTextColor="#003f5c"
                selectionColor="#fff"
                />
            </View>

            <View style={styles.inputView}>
                <Text style={styles.labelInput}>Opening Hours: </Text>  
                <TextInput style={styles.inputText}
                onChangeText={(name) => setOpeningHours(name)}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Enter Opening Hours"
                placeholderTextColor="#003f5c"
                selectionColor="#fff"
                />
            </View>

            <TouchableOpacity style={styles.loginBtn}> 
                <Text style={styles.buttonText} onPress={() => saveData() }>Create Store</Text>
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
