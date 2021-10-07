import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,  
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UnderwritingService from 'services/UnderwritingService';
import FeedbackService from 'services/FeedbackService';

import Loading from 'library/components/Loading'
import { RNToasty } from 'react-native-toasty'
import { StackActions } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import PaystackWebView from 'react-native-paystack-webview'

import { formatCurrency } from 'library/utils/StringUtils';

import R from 'res/R';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ISMaterialPicker from 'library/components/ISMaterialPicker';


 export default class PayScreen extends Component {
 
   

  constructor(props) {
    super(props);
    this.state = {
      
      loading: true,
      showFeedback: false,
      user: null,
    }

    this.params = this.props.route.params.params;
    console.log(this.params);
    
  
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);


     /*test purpose only */
     /*this.params = {
      productName: 'Vehicle Insurance',
      coverType: 'Third Party',
      premiumCost: 5000,
      orderId: 30,
      clientId: 26
    };
    */
    
    

  }
  

  async componentDidMount() {
    
    //console.log(this.params);
    let user = await AsyncStorage.getItem('@user');
    user = JSON.parse(user);
    this.setState({user, loading: false});
    
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

 
  _onChange = form => {
    console.log(form);
  }

  confirmPayment = async () => {
   
    await this.setState({loading: true});
    const req = await UnderwritingService.updatePayment(this.params.orderId);
    //console.log(req);
    const res = req.data;
    console.log(res);
    await this.setState({loading: false});

    if (typeof res == 'undefined') {
      RNToasty.Error({
        title: 'Network error, check your internet connection and try again',
        duration: 1
     });
    }
    else if (res.success == true) {
      this.setState({showFeedback: true});
    }
  }
  

  render() {
    const { loading, user, showFeedback } = this.state; 
   
    
    if (loading) {
      return (
        <Loading text="" />
      );
    }
    else if (showFeedback) {
      return (
       <FeedbackForm {...this.props} email={this.state.user.email} userId={this.state.user.id} />
      );
    }
   else return (

    
     
      
           <View style={styles.container}>
             <View>
                <ScrollView style={styles.infoCard}>
                    <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                      <View>
                        <Text style={styles.cardText}>Paying for</Text>
                        <Text style={styles.cardText}>Car Insurance, {this.params.selectedCover}</Text>
                      </View>
                      <Text style={[styles.cardText, styles.price]}>{formatCurrency(this.params.premium)}</Text>
                    </View>

                    <PaystackWebView
                      buttonText='Pay Now'
                      paystackKey={R.constants.DEV ? R.constants.paymentKeys.paystackTestPublicKey: R.constants.paymentKeys.paystackLivePublicKey}
                      paystackSecretKey={R.constants.DEV ? R.constants.paymentKeys.paystackLiveSecretKey : R.constants.paymentKeys.paystackLiveSecretKey}
                      amount={this.params.premium}
                      billingEmail={user.email}
                      billingMobile={user.phone}
                      billingName={user.last_name +' '+user.first_name}
                      ActivityIndicatorColor='green'
                      showPayButton={true}
                      btnStyles={[R.pallete.appButton, {backgroundColor: R.constants.appGreen}]}
                      textStyles ={{
                        color: 'white',
                        textAlign: 'center'
                      }}
                      refNumber={(new Date().getTime())}
                      onSuccess={(tranRef)=>{this.confirmPayment(tranRef)}}
                      onCancel={()=>{console.log('payment was cancelled')}}
                    />
                  </ScrollView>

                  
                 
                  
               
               </View>

              <View style={styles.securedPayment}> 
                <Text style={{textAlign: "center"}}>Your card and payment details are secured by paystack. We do not store your card/payment details</Text>

                <View>
                  <Text style={{fontWeight: 'bold', textAlign: "center", marginTop: 10}}><Ionicons name="ios-lock-closed-outline" size={20}/> Secured by PayStack</Text>
                </View>
              </View>


              </View>
       
   )
  }
}

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);

    this.ratings = [
      {name: "Very Poor"},
      {name: "Poor"},
      {name: "Good"},
      {name: "Very Good"},
      {name: "Excellent"},
    ];

      this.state = {
        rating: null,
        notes: null,
        ratingError: null,
        loading: false,
      }


    
  }
  handleAlertClose = () => {
    this.props.navigation.navigate("InsuredItems");
  }

  sendFeedback = async () => {
    if (!this.validateForm()) return;
    this.setState({loading: true});
    const { rating, notes } = this.state;
    const req = await FeedbackService.sendFeedback(rating, notes);
    console.log(req);
    const res = req.data;
    console.log(res);


    this.setState({loading: false});

    Alert.alert('Thank you !', 
        'Thank you for your feedback.',
        [
        {text: 'Ok', onPress: () => this.props.navigation.navigate('InsuredItems'), style: 'cancel'},
        ]
        );


  }

  validateForm = () => {
    let formValid = true;
    this.setState({ratingError:null});
    if (!this.state.rating) {
      this.setState({ratingError: 'Please provide a rating from the dropdown'});
        formValid = false;
    }

    return formValid;
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading text="Sending your feedback..." />
    }
    return (
      <View style={styles.modal}>
        <ScrollView>
        <View >
          <Text style={styles.successTitle}>Transaction Successful</Text>
          <View style={styles.successImg}>
              <Image
                  style={{width:100, height:100, margin: 15}}
                  source={R.images.success}
              />
          </View>
          <Text style={{textAlign: "center"}}>{`Your insurance certificate has been sent your email address: ${this.props.email}`}</Text>
        </View>

        <View style={{marginTop: 30}}>
        <Text style={styles.successTitle}>Rate Your Experience</Text>
        <ISMaterialPicker 
                items={this.ratings} 
                label="Your Rating:"
                errorText={this.state.ratingError}
                onValueChange={async (rating, index) => {
                  if (index === 0) return this.setState({rating: null});
                 await this.setState({rating})
                  

                }}
                />
          <Text>Additional Notes (Optional)</Text>
          <TextInput  style={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
            }} editable 
            onChangeText={(notes) => this.setState({notes})}
            
            />

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity style ={[R.pallete.appButton, {backgroundColor: '#ccc'}]} onPress={() => this.props.navigation.navigate('InsuredItems')}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style ={[R.pallete.appButton, {backgroundColor: R.constants.appGreen}]} onPress={() => this.sendFeedback()}>
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    </View>
      
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: "center"
    
  },

  infoCard : {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    
    
  },
  cardText: {
    fontSize: 13,
    color: '#000',
    fontWeight: "bold",
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  securedPayment: {
    flexDirection: "column",
    alignContent: "center",
    padding: 10,
    backgroundColor: "#E3E9F3",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  modal: {
    flex: 1,
    marginTop: 20,
    padding: 10,
  },
  successTitle: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    color: 'darkgreen',
    marginBottom: 10,
    marginTop: 10,
  },
  cancelBtn: {
    marginRight: 15,
  },
  successImg : {
    justifyContent: "center",
    alignItems: "center"
  }
  
});


