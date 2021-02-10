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
import CreateStore from './components/CreateStore';
import axios from "axios";
import {UserContext, TypeContext} from '../UserContext';


export default function CreateEntity({route}) { 
        
	const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [preferred_name, setPreferredName] = useState("");
  const [address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [Province, setProvince] = useState("");
  const [Country, setCountry] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [SecondaryContactNo, setSecondaryContactNo] = useState("");
  const [type, setType] = useState(route.params.type);
  const [Username, setUsername] = useState(route.params.user);
  const [Password, setPassword] = useState(route.params.pass);

  const {setUser} = useContext(UserContext);
  const {setTypes} = useContext(TypeContext);

  const navigation = useNavigation();
  const urls = {"User": "http://10.0.2.2:8000/api/user/create",
                "Rider": "http://10.0.2.2:8000/api/rider/create",
                "Seller" :"http://10.0.2.2:8000/api/seller/create"}
	const active = (type == 'User') ? 'active_buyer' : 
                 (type == 'Rider') ? 'active_rider' :
                 'active_seller';
  const no = (type == 'User') ? 'UserNo' : 
                 (type == 'Rider') ? 'RiderNo' :
                 'SellerNo';

	function saveData() {
    const entity = {
      FirstName: FirstName,
      LastName: LastName,
      preferred_name: preferred_name,
      address: address,
      City: City, 
      Province: Province,
      Country: Country,
      ContactNo: ContactNo,
      SecondaryContactNo: SecondaryContactNo,
      Username: Username,
      Password: Password	
    };

    entity[active] = true;
    entity[no] =  "023912";
    console.log(entity, urls[type]);
		axios.post(urls[type], entity)
      .then((response) => {
        if(response.status == 200 || response.status == 201) {
          Alert.alert(
              "Success",
              "User message saved",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            );
          console.log(response.data);
          if (type == 'User' || type == 'Rider') {
            setUser(response.data);
            setTypes(type);
            navigation.navigate('home', { screen: 'Dashboard'});
          } else {
            setUser(response.data);
            setTypes(type);
            navigation.navigate('create store');
          }
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

    return(
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <Text style={styles.logo}>PERSONAL DETAILS</Text>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>First Name: </Text>  
                    <TextInput style={styles.inputText}
                    onChangeText={(name) => setFirstName(name)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter First Name"
                    placeholderTextColor="#003f5c"
                    selectionColor="#fff"
                    />
                </View>
                
                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>Last Name: </Text>  
                    <TextInput style={styles.inputText}
                    onChangeText={(name) => setLastName(name)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter Last Name"
                    placeholderTextColor="#003f5c"
                    selectionColor="#fff"
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>Preferred Name: </Text>
                    <TextInput style={styles.inputText}
                    onChangeText={(text) => setPreferredName( text)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter Preffered Name"
                    placeholderTextColor="#003f5c"
                    selectionColor="#fff"
                    />
                </View>

              <Text style={styles.logo}>ADDITIONAL SHIPPING DETAILS</Text>
                <View style={styles.inputAddressView}>
                     <Text style={styles.labelAdress}>Address: </Text>
                    <TextInput style={styles.inputAddressText}
                    onChangeText={(text) => setAddress(text)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter Address"
                    placeholderTextColor="#003f5c"
                    selectionColor="#fff"
                    multiline
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>City: </Text>
                    <TextInput style={styles.inputText}
                    onChangeText={(text) => setCity(text)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter City"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>Province: </Text>
                    <TextInput style={styles.inputText}
                    onChangeText={(text) => setProvince(text)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter Province"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>Country: </Text>
                    <TextInput style={styles.inputText}
                    onChangeText={(text) => setCountry(text)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter Country"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>Contact No: </Text>
                    <TextInput style={styles.inputText}
                    onChangeText={(text) => setContactNo(text)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter Contact No"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>Secondary Contact No: </Text>
                    <TextInput style={styles.inputText}
                    onChangeText={(text) => setSecondaryContactNo(text)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter Contact no.."
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
                </View>

                <Text style={styles.logo}>SIGN UP DETAILS</Text>
                <View style={styles.inputView}>
                     <Text style={styles.labelInput}>Username: </Text>
                    <TextInput style={styles.inputText}
                    onChangeText={(text) => setUsername(text)}
                    value={Username}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Username"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>Password: </Text>
                    <TextInput style={styles.inputText}
                    onChangeText={(text) => setPassword(text)}
                    value={Password}
                    secureTextEntry
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Password"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn}> 
                    <Text style={styles.buttonText} onPress={() => saveData() }>Create User</Text>
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
