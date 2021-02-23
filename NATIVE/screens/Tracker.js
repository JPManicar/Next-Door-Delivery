import React, {useState, useEffect, useContext}  from 'react';
import MapView, {Marker} from 'react-native-maps';
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
  Alert,
  Dimensions,
  Modal,
  Pressable
} from 'react-native';

import {UserReqContext, UserContext, TypeContext} from '../UserContext';
import MapCoord from './components/MapCoord';
import { key } from './constants/constant';

export default function Tracker () {
  const {userReq, setUserReq} = useContext(UserReqContext);
  const {user, setUser} = useContext(UserContext);
  const {types, setTypes} = useContext(TypeContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [userRequest, setUserRequest] = useState({});
  const [store, setStore] = useState({});
  const [region, setRegion] = useState({
         latitude: user.latitude,
         longitude: user.longitude,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421});
  

  
  
  useEffect(() => {
    getProductsList();
  }, []);

  function getProductsList() {
    const url = {'User': "http://10.0.2.2:8000/api/associate/user/"+ user.id +"/rider",
                'Rider': "http://10.0.2.2:8000/api/associate/rider/"+ user.id +"/user"}
    return fetch(url[types], {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        setUserRequest(json[0]);
        getStore(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  function getStore (request) {
    return fetch("http://10.0.2.2:8000/api/associate/product/"+ 
      request[0].associates_id_product +"/store", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        setStore(json[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (types == 'Rider') {
    return (
    <View style={styles.container}>
      <MapView
         style={styles.map}
         initialRegion={region}
         >
         <MapCoord props={{user: user, userRequest: userRequest, store: store }}/>
         
      </MapView>
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.profile}source={require('./assets/user.png')} />
            <View style={styles.details}>
              <Text style={styles.modalText}>{userRequest.preferred_name}</Text>
              <Text style={styles.miniLogo}>{userRequest.address}, {userReq[0].City}</Text>
              <Text style={styles.miniLogo}>{userRequest.ContactNo}</Text>
            </View>
          </View>
        </View>
      </View>
    );  
  } else {
    return (
    <View style={styles.container}>
      <MapView
         style={styles.map}
         initialRegion={region}
         >
         <MapCoord props={{user: user, userRequest: userRequest, store: store }}/>
         
      </MapView>
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.profile}source={require('./assets/user.png')} />
            <View style={styles.details}>
              <Text style={styles.modalText}>{user.preferred_name}</Text>
              <Text style={styles.miniLogo}>{user.address}, {user.City}</Text>
              <Text style={styles.miniLogo}>{user.ContactNo}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  
  
}

const styles = StyleSheet.create({
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"20%",
    borderColor: "#ffdb58",
    backgroundColor:"#ffdb58",
    position: 'absolute',
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    left:275
  },
  profile: {
    marginLeft: 10
  },
  centeredView: {
    justifyContent: "flex-end",
    position: 'absolute',
    bottom: 10,
    width: 400,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    marginLeft: 10
  },
  miniLogo:{
    fontSize:15,
    color:"#808080",
    marginBottom:5,
    alignItems: 'center',
  },
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end",
  },
  map: {
    flex:3,
    width: 400,
    height: 600,
  },
  modalView: {
    margin: 20,
    flexDirection:'row',
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontWeight:"bold",
    fontSize:20,
    color:"black",
    marginBottom: 5
  }
});
