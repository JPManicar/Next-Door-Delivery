import  React, {useState, createRef, useContext} from 'react';
import { Button, View, Text, Image } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Welcome from './screens/Welcome';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import CreateEntity from './screens/CreateEntity';

import Dashboard from  './screens/Dashboard';
import Profile from './screens/Profile';

import Cart from './screens/Cart'; 
import CheckOut from './screens/orders/Checkout';
import Payment from './screens/orders/Payment';
import OrderDetails from './screens/orders/OrderDetails';
import Tracker from './screens/Tracker';
import CreateStore from './screens/components/CreateStore';

import Products from './screens/posts/Products';
import ProductDetail from './screens/components/ProductDetail';
import AddProduct from './screens/components/AddProduct';

import {UserContext, TypeContext, StoreContext, ProductContext, ListProductContext, filterTypeContext, UserReqContext} from './UserContext';

const Tab = createBottomTabNavigator();

function MainTabs() {
  const {types, setTypes} = useContext(TypeContext);
  console.log(types);
  if (types == 'User') {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Dashboard' 
                    component={Dashboard}
                    options={{
                      tabBarIcon: () => (
                        <Image
                          source={require('./screens/assets/home.png')                  
                          }
                          style={styles.profile}/>
                    ), 
                    tabBarLabel: 'Dashboard'             
                    }}
           />
        <Tab.Screen name='cart' 
                    component={Cart}
                    options={{
                      tabBarIcon: () => (
                        <Image
                          source={require('./screens/assets/cart.png')                  
                          }
                          style={styles.profile}/>
                    ), 
                    tabBarLabel: 'Cart'             
                    }} />
        <Tab.Screen name='tracker' 
                    component={Tracker}
                    options={{
                      tabBarIcon: () => (
                        <Image
                          source={require('./screens/assets/mapPointer.png')                  
                          }
                          style={styles.profile}/>
                    ), 
                    tabBarLabel: 'Tracker'             
                    }} />
        <Tab.Screen name='Profile' 
                    component={Profile}
                    options={{
                      tabBarIcon: () => (
                        <Image
                          source={require('./screens/assets/user.png')                  
                          }
                          style={styles.profile}/>
                    ), 
                    tabBarLabel: 'Profile'             
                    }} />
      </Tab.Navigator>
    );
  } else if (types == 'Rider') {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Dashboard' 
                    component={Dashboard}
                    options={{
                      tabBarIcon: () => (
                        <Image
                          source={require('./screens/assets/home.png')                  
                          }
                          style={styles.profile}/>
                    ), 
                    tabBarLabel: 'Dashboard'             
                    }}
           />
        <Tab.Screen name='tracker' 
                    component={Tracker}
                    options={{
                      tabBarIcon: () => (
                        <Image
                          source={require('./screens/assets/mapPointer.png')                  
                          }
                          style={styles.profile}/>
                    ), 
                    tabBarLabel: 'Tracker'             
                    }} />
        <Tab.Screen name='Profile' 
                    component={Profile}
                    options={{
                      tabBarIcon: () => (
                        <Image
                          source={require('./screens/assets/user.png')                  
                          }
                          style={styles.profile}/>
                    ), 
                    tabBarLabel: 'Profile'             
                    }} />
      </Tab.Navigator>
    );
  } else if (types == 'Seller') {
    return (
    <Tab.Navigator>
        <Tab.Screen name='Dashboard' 
                    component={Dashboard}
                    options={{
                      tabBarIcon: () => (
                        <Image
                          source={require('./screens/assets/home.png')                  
                          }
                          style={styles.profile}/>
                    ), 
                    tabBarLabel: 'Dashboard'             
                    }}
           />
        <Tab.Screen name='Profile' 
                    component={Profile}
                    options={{
                      tabBarIcon: () => (
                        <Image
                          source={require('./screens/assets/user.png')                  
                          }
                          style={styles.profile}/>
                    ), 
                    tabBarLabel: 'Profile'             
                    }} />
      </Tab.Navigator>
    );
  }
  
}

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState({});
  const [types, setTypes] = useState('');
  const [store, setStore] = useState({});
  const [product, setProduct] = useState({});
  const [listProduct, setListProduct] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [userReq, setUserReq] = useState([]);

  return (
  <UserContext.Provider value={{user: user, 
                        setUser: ((value) => {setUser(value)})
                         }}>
  <TypeContext.Provider value={{types: types, 
                        setTypes: ((value) => {setTypes(value)})
                         }}>
  <StoreContext.Provider value={{store: store, 
                        setStore: ((value) => {setStore(value)})
                         }}>
  <ProductContext.Provider value={{product: product, 
                        setProduct: ((value) => {setProduct(value)})
                         }}>
  <ListProductContext.Provider value={{listProduct: listProduct, 
                        setListProduct: ((value) => {setListProduct(value)})
                         }}>
  <filterTypeContext.Provider value={{filterType: filterType, 
                        setFilterType: ((value) => {setFilterType(value)})
                         }}>
  <UserReqContext.Provider value={{userReq: userReq, 
                        setUserReq: ((value) => {setUserReq(value)})
                         }}>                       
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='signup' component={SignUp} />
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name='entity' component={CreateEntity} />
        <Stack.Screen name='Checkout' component={CheckOut} />
        <Stack.Screen name='Payment' component={Payment} />
        <Stack.Screen name='Order Details' component={OrderDetails} />
        <Stack.Screen name='Product Details' component={ProductDetail} />
        <Stack.Screen name='create store' component={CreateStore} />
        <Stack.Screen name='add product' component={AddProduct} />
        <Stack.Screen name='list product' component={Products} />
        <Stack.Screen name='home' component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  </UserReqContext.Provider>
  </filterTypeContext.Provider>
  </ListProductContext.Provider>
  </ProductContext.Provider>
  </StoreContext.Provider>
  </TypeContext.Provider>
  </UserContext.Provider>
  );
}

const styles = ({
    profile: {
    width: 20,
    height: 20,
  },
});
export default App;

