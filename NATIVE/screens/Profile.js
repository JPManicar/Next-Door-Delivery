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
import {UserContext, TypeContext, StoreContext} from '../UserContext';

export default function Profile() { 
  const {user,setUser} = useContext(UserContext);
  const {types, setTypes} = useContext(TypeContext);
  const navigation = useNavigation();
   const urls = {"User": "http://10.0.2.2:8000/api/user/",
                "Rider": "http://10.0.2.2:8000/api/rider/",
                "Seller" :"http://10.0.2.2:8000/api/seller/"}
  const active = (types == 'User') ? 'active_buyer' : 
                 (types == 'Rider') ? 'active_rider' :
                 'active_seller';
  const no = (types == 'User') ? 'UserNo' : 
                 (types == 'Rider') ? 'RiderNo' :
                 'SellerNo';

  const [UserNo, setUserNo] = useState(user.UserNo)      
	const [FirstName, setFirstName] = useState(user.FirstName);
  const [LastName, setLastName] = useState(user.LastName);
  const [preferred_name, setPreferredName] = useState(user.preferred_name);
  const [address, setAddress] = useState(user.address);
  const [City, setCity] = useState(user.City);
  const [Province, setProvince] = useState(user.Province);
  const [Country, setCountry] = useState(user.Country);
  const [ContactNo, setContactNo] = useState(user.ContactNo);
  const [SecondaryContactNo, setSecondaryContactNo] = useState(user.SecondaryContactNo);
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState(user.Password);

  
		

	function saveData() {
    const entity = {
      id: user.id,
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
      Password: Password,
      Longitude: user.Longitude,
      Latitude: user.Latitude	
    };

    entity[active] = true;
    entity[no] =  "023912";
		axios.put(urls[types]+Username+"/details", entity)
      .then((response) => {
          console.log("here")
          if (response.status == 200 || response.status == 201) {
              Alert.alert(
                "Success",
                "User profile updated",
                [{ text: "OK", onPress: () => setUser(entity) }],
              );
              navigation.navigate('home', { screen: 'Dashboard'})
          } else {
              console.log(response)
          }
      });
	}

    return(
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <View style={styles.logoView}>
                  <Image style={styles.profile}source={require('./assets/user.png')} />
                </View>
                <Text style={styles.logo}>PERSONAL DETAILS</Text>

                <View style={styles.inputView}>
                    <Text style={styles.labelAdress}>Preferred Name: </Text>
                    <TextInput style={styles.inputAddressText}
                    value={preferred_name}
                    onChangeText={(text) => setPreferredName(text)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter Preffered Name"
                    placeholderTextColor="#003f5c"
                    selectionColor="#fff"
                    />
                </View>

                <Text style={styles.logo}>CONTACT DETAILS</Text>
                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>Address: </Text>
                    <TextInput style={styles.inputText}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter Contact No"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.labelInput}>Contact No: </Text>
                    <TextInput style={styles.inputText}
                    value={ContactNo}
                    onChangeText={(text) => setContactNo(text)}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter Contact No"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#fff"
                    />
                </View>
               
                <View style={styles.inputView}>
                    <Text style={styles.labelAdress}>Secondary Contact No: </Text>
                    <TextInput style={styles.inputAddressText}
                    onChangeText={(text) => setSecondaryContactNo(text)}
                    value={SecondaryContactNo}
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

                <TouchableOpacity style={styles.loginBtn} onPress={() => saveData()}> 
                    <Text style={styles.buttonText} >Save User Profile</Text>
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
