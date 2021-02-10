import  React, {useState, createRef} from 'react';

export const UserContext = React.createContext({user: {}, 
                        setUser: ((value) => {})
                    });
export const TypeContext = React.createContext({types: '',
                        setTypes: ((value) => {})
                    });

export const StoreContext = React.createContext({store: {},
                        setStore: ((value) => {}) });

export const ProductContext = React.createContext({product: {},
                        setProduct: ((value) => {}) });
