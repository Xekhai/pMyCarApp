import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import R from 'res/R'
//import UserService from 'services/UserService'

import Icon from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';



export default class CustomDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {

            loading: false,
            user: null,
        }

     
         
        

    }

    componentDidMount() {
     this.getUser();

    }

    getUser = async() => {
      let user = await AsyncStorage.getItem('@user');
      user = JSON.parse(user);
      this.setState({user});
    }
    

     render() {
       const { user } = this.state;

      if (user) return (
       <View style={[styles.containHeader, { backgroundColor: R.colors.appPrimary, marginTop: -5, paddingTop: 10, paddingBottom: 10 }]}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{uri:R.constants.FILE_SERVER+user.photo}} style={[R.pallete.avatar, { width: 85, height: 85 }]} />
          <Text style={{ color: '#fff', marginTop: '3%', fontFamily: 'Segoe-UI' }}>{`Hi ${user.first_name}`}</Text>
          <Text style={{ color: '#fff', fontFamily: 'Segoe-UI' }}>{user.email}</Text>
        </View>
      </View>
       )

       return (
        <View style={{ backgroundColor: '#fff', paddingLeft: 16, paddingTop: 10, paddingBottom: 10 }}>
         <View>
         <Icon name="chevron-circle-down" size={45} style={styles.menuIcon} color="#000" />
           <Text style={{ color: '#000', marginTop: '3%', fontSize: 24, fontFamily: 'Segoe-UI' }}>{`PMyCar`}</Text>
           <Text style={{ color: '#000', fontFamily: 'Segoe-UI' }}>Specialized car insurance.</Text>
         </View>
       </View>
        );
    }
}

const styles = StyleSheet.create({
    containHeader: {

    }
});

