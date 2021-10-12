import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import Icon from 'react-native-vector-icons/FontAwesome5';

import { formatCurrency } from 'library/utils/StringUtils'

import {  ScrollView } from 'react-native';
import R from 'res/R'

import styles from './style'

class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user:null,
    };

    const istylew = {
      color: '#fff',
      alignSelf: 'center'
    }
    const istyleb = {
      color: '#3F3F3F',
      alignSelf: 'center'
    }
    const cstylew = {
      width: 140,
      height: 140,
      backgroundColor : '#fff',
      padding: 10,
      borderRadius: 4,
      elevation: 4,
      margin: 4,

      justifyContent: 'space-evenly'
    }


    const cstyleb = {
      width: 140,
      height: 140,
      backgroundColor : '#3F3F3F',
      padding: 10,
      borderRadius: 4,
      margin: 4,

      justifyContent: 'space-evenly'}

    this.actionItems = [
      {
        actionName: 'Insure My Car',
        icon: 'car',
        img: 'https://firebasestorage.googleapis.com/v0/b/tikka-1f350.appspot.com/o/car.png?alt=media&token=4587fd44-146f-486f-90e6-5aadc06167a6',
        onPress : () => {
          this.props.navigation.navigate('VehicleInfo')
        },
        id: 1,
        cstyle: cstylew,
        istyle: istyleb

      },
      {
        actionName: 'File a Claim',
        icon: 'car-crash',
        img: 'https://firebasestorage.googleapis.com/v0/b/tikka-1f350.appspot.com/o/claim.png?alt=media&token=f24b302e-5537-4a97-970a-c6b084ff9575',
        onPress : () => {
          this.props.navigation.navigate('SelectCarScreen');
        },
        id: 2,
        cstyle: cstyleb,
        istyle: istylew

      },
      {
        actionName: 'Get a Quote',
        icon: 'money-check',
        img: 'https://firebasestorage.googleapis.com/v0/b/tikka-1f350.appspot.com/o/quote-request.png?alt=media&token=02c1cfa8-5cf4-4460-8d13-bb9e29484ecf',
        onPress : () => {},
        id: 3,
        cstyle: cstylew,
        istyle: istyleb

      },
      {
        actionName: 'Manage Your ID',
        icon: 'address-card',
        img: 'https://firebasestorage.googleapis.com/v0/b/tikka-1f350.appspot.com/o/user-data.png?alt=media&token=2ad81073-977a-4f94-be68-799eb232ccee',
        onPress : () => {},
        id: 4,
        cstyle: cstyleb,
        istyle: istylew


      },
      {
        actionName: 'Chat with Us.',
        icon: 'headset',
        img: 'https://firebasestorage.googleapis.com/v0/b/tikka-1f350.appspot.com/o/chat.png?alt=media&token=a40ad037-5d5e-484a-b6a5-5d9ff78ca68f',
        onPress : () => {},
        id: 5,
        cstyle: cstylew,
        istyle: istyleb


      },
      {
        actionName: 'Send Us a Message',
        icon: 'whatsapp',
        img: 'https://firebasestorage.googleapis.com/v0/b/tikka-1f350.appspot.com/o/chat.png?alt=media&token=a40ad037-5d5e-484a-b6a5-5d9ff78ca68f',
        onPress : () => {},
        id: 6,
        cstyle: cstyleb,
        istyle: istylew

      },
      {
        actionName: 'Find a Mechanic',
        icon: 'wrench',
        img: 'https://firebasestorage.googleapis.com/v0/b/tikka-1f350.appspot.com/o/mechanic.png?alt=media&token=eccf8c96-bbae-475d-9d5c-5a93127e5636',
        onPress : () => {},
        id: 7,
        cstyle: cstyleb,
        istyle: istylew

      },
    ]



  }

  componentDidMount() {
  
  }

  renderActionItem = (item) => {

    console.log(item);

    return (
      <TouchableOpacity key={item.id} style={item.cstyle} onPress={() => item.onPress()}>
        {/* <Icon style={item.istyle} name={item.icon} size={40} /> */}
        <Image style={{height:40,width:40,alignSelf:'center'}} source={{uri:item.img}} />
        <Text style={styles.actionTitle}>{item.actionName}</Text>
      </TouchableOpacity>
    )
  }


  


  render() {

    return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="chevron-circle-down" size={25} style={styles.menuIcon} color="#fff" />
              {/* <Text style={{color: '#fff', marginTop: 4, marginLeft:-4, fontSize: 12}}>MENU</Text> */}
            </TouchableOpacity>

            <Text style={styles.headerText} >PMyCar</Text>
            <Icon name="inbox" size={25} style={{marginRight: 20,
        height: 30}} color="#fff" />

          </View>
           <Text style={styles.sloganText}>Specialized car insurance.</Text>



        </View>

        <View style={styles.content}>
            <Text style={styles.greetingTitle}>Good Evening</Text>
            <Text style={styles.greetingSub}>How can we help you today ?</Text>

            <View style={styles.actionItemWrapper}>
              {this.actionItems.slice(0, 2).map(actionItem => {
                return this.renderActionItem(actionItem);
              })}

            </View>
            <View style={styles.actionItemWrapper}>
              {this.actionItems.slice(2, 4).map(actionItem => {
                return this.renderActionItem(actionItem);
              })}

            </View>
        </View>



        <View style={styles.content}>
            <Text style={styles.greetingTitle}>Help & Support</Text>
            <Text style={styles.greetingSub}>How can we help you today ?</Text>

            <View style={styles.actionItemWrapper}>
              {this.actionItems.slice(4, 6).map(actionItem => {
                return this.renderActionItem(actionItem);
              })}

            </View>
            <View style={styles.actionItemWrapper}>
              {this.actionItems.slice(6, 7).map(actionItem => {
                return this.renderActionItem(actionItem);
              })}

            </View>
        </View>


      

        </ScrollView>

        <View style={styles.insureIcon}>
          <Text>Insure</Text>
          <Icon name="bell" size={25} style={styles.menuIcon} color="#fff" />
        </View>

      

    </View>
    );
  }
} 






export default HomeScreen;




