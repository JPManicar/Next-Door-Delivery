import React, {useState, useEffect, useContext}  from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
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

import {UserReqContext, UserContext, TypeContext} from '../../UserContext';
import { key } from '../constants/constant';

export default function MapCoord ({props}) {
  const {types, setTypes} = useContext(TypeContext);
  const [startPolyline, setStartPolyline] = (types == 'Rider') ? useState([
  {
    "latitude": 14.64741,
    "longitude": 120.98004,
  },
  {
    "latitude": 14.6475,
    "longitude": 120.98004,
  },
  {
    "latitude": 14.64749,
    "longitude": 120.9802,
  },
  {
    "latitude": 14.64748,
    "longitude": 120.98056,
  },
  {
    "latitude": 14.64744,
    "longitude": 120.98128,
  },
  {
    "latitude": 14.64736,
    "longitude": 120.9837,
  },
  {
    "latitude": 14.64728,
    "longitude": 120.98588,
  },
  {
    "latitude": 14.64724,
    "longitude": 120.9866,
  },
  {
    "latitude": 14.64724,
    "longitude": 120.98728,
  },
  {
    "latitude": 14.64721,
    "longitude": 120.98804,
  },
  {
    "latitude": 14.64864,
    "longitude": 120.98809,
  },
  {
    "latitude": 14.65004,
    "longitude": 120.98811,
  },
  {
    "latitude": 14.65105,
    "longitude": 120.98817,
  },
  {
    "latitude": 14.65145,
    "longitude": 120.98819,
  },
  {
    "latitude": 14.65146,
    "longitude": 120.98743,
  },
  {
    "latitude": 14.6515,
    "longitude": 120.98638,
  },
  {
    "latitude": 14.65154,
    "longitude": 120.9853,
  },
  {
    "latitude": 14.65157,
    "longitude": 120.98459,
  },
  {
    "latitude": 14.65156,
    "longitude": 120.98391,
  },
  {
    "latitude": 14.65157,
    "longitude": 120.98376,
  },
  {
    "latitude": 14.65162,
    "longitude": 120.98233,
  },
  {
    "latitude": 14.65223,
    "longitude": 120.98234,
  },
]) : useState([
  {
    "latitude": 14.65154,
    "longitude": 120.9853,
  },
  {
    "latitude": 14.65157,
    "longitude": 120.98459,
  },
  {
    "latitude": 14.65156,
    "longitude": 120.98391,
  },
  {
    "latitude": 14.65157,
    "longitude": 120.98376,
  },
  {
    "latitude": 14.65162,
    "longitude": 120.98233,
  },
  {
    "latitude": 14.65223,
    "longitude": 120.98234,
  },
]);
  const [endPolyline, setEndPolyline] = useState([]);

  useEffect(() => {
    getStartPolyline();
    getEndPolyline();
    console.log("POLYLINES: ", startPolyline, endPolyline);
  }, []);

  function getStartPolyline () {
    console.log(`LONGLAT: `,props.userRequest.latitude, props.userRequest.longitude,props.store.longitude,props.store.latitude)
    return fetch("https://maps.googleapis.com/maps/api/directions/json?origin="+
      + props.user.latitude + "," + props.user.longitude + "&destination=" + props.store.latitude + "," +
      props.store.longitude + "&key=" + key, {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status != 'NOT_FOUND') {
          console.log('pass: ',json.routes[0]);
          setStartPolyline(decode(json.routes[0].overview_polyline.points.split(' ')[0]));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getEndPolyline () {
    return fetch("https://maps.googleapis.com/maps/api/directions/json?origin="+
      + props.store.latitude + "," + props.store.longitude + "&destination=" + props.userRequest.latitude + "," +
      props.userRequest.longitude + "&key=" + key, {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status != 'NOT_FOUND') {
          console.log('pass: ',json.routes[0].overview_polyline.points.split(' ')[0]);
          setEndPolyline(decode(json.routes[0].overview_polyline.points.split(' ')[0]));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function decode(encoded) {
    var points=[ ]
    var index = 0, len = encoded.length;
    var lat = 0, lng = 0;
    while (index < len) {
        var b, shift = 0, result = 0;
        do {

    b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
              result |= (b & 0x1f) << shift;
              shift += 5;
             } while (b >= 0x20);


       var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
       lat += dlat;
       shift = 0;
       result = 0;
     do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
     var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
     lng += dlng;
 
   points.push({latitude:( lat / 1E5),longitude:( lng / 1E5)})  
 
  }
  return points
  }

  console.log('PROPS',props);

  if('latitude' in props.store) {
    return (
      <View>
        <Polyline
          coordinates={startPolyline}
          strokeColor="#ffdb58"
          strokeWidth={6}
        />
        <Marker
          key={1}
          coordinate={{ latitude : props.user.latitude , longitude : props.user.longitude }}
          title={props.user.preferred_name}
          description={types}
          pinColor={"aqua"}
         />

         <Marker
          key={2}
          coordinate={{ latitude : props.userRequest.latitude , longitude : props.userRequest.longitude }}
          title={props.userRequest.preferred_name}
          description={props.userRequest.address}
          pinColor={'yellow'}
         />

         <Marker
          key={3}
          coordinate={{ latitude : props.store.latitude , longitude : props.store.longitude }}
          title={props.store.Name}
          description={props.store.address}
         />
      </View>
    );
  } else {
    return (
      <View>
        <Marker
          key={1}
          coordinate={{ latitude : props.user.latitude , longitude : props.user.longitude }}
          title={props.user.preferred_name}
          description={types}
         />
      </View>
    )
  }

}