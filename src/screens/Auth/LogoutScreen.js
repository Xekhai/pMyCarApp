
import React, { useEffect } from 'react';
import {  Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseService from '../../services/BaseService';
import  { BackHandler } from 'react-native';



function  LogoutScreen (props) {

    

    useEffect(() => {
        showModal();

      props.navigation.addListener(
        'focus',
        () => {
          showModal();
        }
      );
    });

    const showModal = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to log out ?",
            [
              {
                text: "Cancel",
                onPress: () => props.navigation.goBack(),
                style: "cancel"
              },
              { text: "Log Out", onPress: async () => {
                  await AsyncStorage.removeItem('@user');
                  BackHandler.exitApp();

                } }
            ],
            { cancelable: false }
          );

    }


    return null;
    
}

export default LogoutScreen;