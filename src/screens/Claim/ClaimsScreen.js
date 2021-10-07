import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

import ClaimService from 'services/ClaimService';
import NetworkErrorHandler from 'library/components/NetworkErrorHandler';
import R from 'res/R'



import Loading from 'library/components/Loading'
import { StackActions } from '@react-navigation/native';

import { BackHandler } from 'react-native';
var moment = require('moment');



export default class ClaimsScreen extends Component {

 
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Claims History',
      headerLeft: (<Button onPress={() => { navigation.navigate('Home') }} title="Go Home" />)
    }
  }

  constructor(props) {
    super(props);

   
    this.state = {

      claims: null,
      netWorkError: false,
    }


    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }



  componentDidMount = async () => {
    this.getClaims();
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
     //reset back navigation, so when back is pressed, go to home screen
   this.props.navigation.dispatch(StackActions.popToTop());
    return true;
  }

  getClaims = async () => {
    await this.setState({ netWorkError: false });
    const req = await ClaimService.getUserClaims();
    const res = req.data;
    //console.log(res);
    if (typeof res === 'undefined') {
      this.setState({ netWorkError: true });
    }
    else if (res.success == true) {
      this.setState({ claims: res.claims });
    }


  }


  renderClaims() {
    if (this.state.claims !== null && this.state.claims.length == 0) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "center" }}>You have not filed any claims</Text>
        </View>
      )
    }


    else return (
      <FlatList
        style={styles.root}
        data={this.state.claims}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator} />
          )
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(_item) => {
          const item = _item.item;
          console.log(item);
          let statusStyle = '';
          switch (item.status) {
            case 'PAID':
              statusStyle = styles.paid;
              break;
            case 'PENDING':
              statusStyle = styles.pending;
              break;
            case 'REJECTED':
              statusStyle = styles.rejected;
              break;
            default:
              break;
          }
          return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('ClaimInfo', {claimId:  item.id})}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: R.constants.FILE_SERVER + item.summary.cover_img }} style={{width: 55, height: 55}} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.title}>CLAIM ON</Text>
                      <Text style={{}}>{item.summary.vehicle_info.vehicle_make} {item.summary.vehicle_info.vehicle_model}</Text>
                      <Text style={styles.cover_type}>{item.summary.underwriting.cover_type}</Text>
                    </View>
                  </View>


                <View>
                  <Text style={[styles.name,styles.status, statusStyle]}>{item.status}</Text>
                  <Text style={styles.time}>{moment(item.created_at).format('DD MMM Y')} </Text>
                </View>

            </TouchableOpacity>
          );
        }} />
    );
  }


  render() {
    if (this.state.netWorkError) {
      return (
        <NetworkErrorHandler retry={this.getClaims} />
      );
    }
    else return (

      <View style={styles.screenContainer}>
        {/* <Text style={{fontWeight: 'bold', marginBottom: 15, marginTop: 10, marginStart: 20, fontSize: 20}}>Claim History</Text> */}
        {this.state.claims !== null ? this.renderClaims() : <Loading text="Loading..." />}


      </View>

    )
  }
}

const styles = StyleSheet.create({
  root: {
    marginTop: 10,
  },
  screenContainer: {
    flex: 1,
  },
  container: {
    paddingLeft: 10,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    // alignItems: 'flex-start'
    justifyContent: 'space-between',
    borderColor: R.colors.appPrimary,
    borderRadius: 8,
    borderWidth: 1,
    margin: 8,
    marginBottom: 20,
  },
  content: {
    marginLeft: 10,
    flex: 1,
  },
  
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
    marginTop: 6
  },
  status: {
    borderRadius: 8,
    color: 'white',
    padding: 8,
    alignSelf: 'flex-end'
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: R.colors.appPrimary,
  },
  name: {
    fontSize: 13,
    fontWeight: "bold",
  },
  cover_type: {
    borderColor: R.colors.appPrimary,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: R.colors.appPrimary,
    color: 'white',
    padding: 4,
    fontSize: 11,
  },
  rejected: {
    backgroundColor: 'red'
  },
  pending: {
    backgroundColor: 'orange',
  },
  paid: {
    backgroundColor: 'green'
  }
});
