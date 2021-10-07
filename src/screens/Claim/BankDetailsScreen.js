import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import {
  TextField,
} from 'react-native-material-textfield';

import ISMaterialPicker from 'library/components/ISMaterialPicker';



import ClaimService from 'services/ClaimService'

import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import { RNToasty } from 'react-native-toasty'

import { StackActions } from '@react-navigation/native';


import { BackHandler } from 'react-native';

import R from 'res/R'




import Loading from 'library/components/Loading'

 export default class BankDetailsScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      loading: false,
      bankName: null,
      accountType: null,
      errors: {},
    }
    this.params = this.props.route.params.params;
    console.log(this.params);
    this.banks = [{ "id": "1", "name": "Access Bank" ,"code":"044" },
    { "id": "2", "name": "Citibank","code":"023" },
    { "id": "3", "name": "Diamond Bank","code":"063" },
    { "id": "4", "name": "Dynamic Standard Bank","code":"" },
    { "id": "5", "name": "Ecobank Nigeria","code":"050" },
    { "id": "6", "name": "Fidelity Bank Nigeria","code":"070" },
    { "id": "7", "name": "First Bank of Nigeria","code":"011" },
    { "id": "8", "name": "First City Monument Bank","code":"214" },
    { "id": "9", "name": "Guaranty Trust Bank","code":"058" },
    { "id": "10", "name": "Heritage Bank Plc","code":"030" },
    { "id": "11", "name": "Jaiz Bank","code":"301" },
    { "id": "12", "name": "Keystone Bank Limited","code":"082" },
    { "id": "13", "name": "Providus Bank Plc","code":"101" },
    { "id": "14", "name": "Polaris Bank","code":"076" },
    { "id": "15", "name": "Stanbic IBTC Bank Nigeria Limited","code":"221" },
    { "id": "16", "name": "Standard Chartered Bank","code":"068" },
    { "id": "17", "name": "Sterling Bank","code":"232" },
    { "id": "18", "name": "Suntrust Bank Nigeria Limited","code":"100" },
    { "id": "19", "name": "Union Bank of Nigeria","code":"032" },
    { "id": "20", "name": "United Bank for Africa","code":"033" },
    { "id": "21", "name": "Unity Bank Plc","code":"215" },
    { "id": "22", "name": "Wema Bank","code":"035" },
    { "id": "23", "name": "Zenith Bank","code":"057" }];

    this.accountTypes = [{"name":"Savings"}, {"name":"Current"}];
    this.accountNameRef = this.updateRef.bind(this, 'account_number_ref');
    this.accountNumberRef = this.updateRef.bind(this,'account_name_ref');

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);



     
  }

  

  updateRef(name, ref) {
    this[name] = ref;
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

  continue = async() => {
    let errors = {};
    this.setState({errors});
    const {bankName, accountType, accountName, accountNumber} = this.state;
   

    if (!accountName) {
      errors.accountNameError = "Account name is required";
    }
    if (!accountNumber) {
      errors.accountNumberError = "Account number is required";
    }

    if (bankName == null) {
        errors.bankNameError = "Please select a bank";
    }
    if (accountType == null) {
      errors.accountTypeError = "Please select account type";
  }


    if(JSON.stringify(errors) === '{}') {
     this.fileClaim();
      
    }
    else {
      console.log("inputs contain error")
      this.setState({errors});
      console.log(errors);

    }

  }

  fileClaim = async () => {
    this.setState({loading: true});
    console.log("filing claim ....");
    
     const {bankName, accountType, accountName, accountNumber} = this.state;

     const params = {...this.params, bankName, accountType, accountName, accountNumber};

   
    const req = await ClaimService.fileClaim(params);
     
    const res = req.data;
    console.log(req);
    await this.setState({loading: false});
    if (typeof res === 'undefined') {
      console.log(res);
      RNToasty.Error({
        title: 'Network error, check your internet connection and try again',
        duration: 1
     });
    }
    else if (res.success == true) {
      console.log("Success is true");
      this.setState({showAlert: true});
    }
   
  }

  handleClose = () => {
    this.setState({ showAlert: false });
    this.props.navigation.navigate('Claims');
  }
  

  render() {
    

    if (this.state.loading) {
      return (
        <View style={styles.container}>
        <Loading text="Submitting claim..."/>
        </View>
      );
    }
   else return (
      
           <View style={styles.container}>
              <ScrollView>
             <Text style={{fontWeight: 'lighter', fontSize: 14, margin: 7}}>Please input your bank details to receive payment</Text>
             <ISMaterialPicker 
                items={this.banks} 
                label="Select a Bank"
                errorText={this.state.errors.bankNameError}
                onValueChange={(bankName, index) => {
                  if (index === 0) return this.setState({bankName: null});
                  this.setState({bankName})

                }}
                />

            <ISMaterialPicker 
                items={this.accountTypes} 
                label="Select Account Type"
                errorText={this.state.errors.accountTypeError}
                onValueChange={(accountType, index) => {
                  if (index === 0) return this.setState({accountType: null});
                  this.setState({accountType})
                }}
                />
              <TextField
                    label='Name on Account'
                    error={this.state.errors.accountNameError}
                    onSubmitEditing={this.onSubmit}
                    ref={this.accountNameRef}
                    containerStyle={styles.textField}
                    onChangeText={(accountName) => {
                      this.setState({accountName});
                    }}
                  />
               
                <TextField
                    label='Account Number'
                    error={this.state.errors.accountNumberError}
                    keyboardType='phone-pad'
                    formatText={this.formatText}
                    onSubmitEditing={this.onSubmit}
                    ref={this.accountNumberRef}
                    containerStyle={styles.textField}
                    onChangeText={(accountNumber) => {
                      this.setState({accountNumber});
                    }}

                  />

<TouchableHighlight onPress={this.continue} style ={[R.pallete.appButton, {backgroundColor: R.constants.appGreen}]}>
                        <Text style={{textAlign: "center", color: '#fff'}}>SUBMIT</Text>
                      </TouchableHighlight>
            

                  <SCLAlert
          theme="success"
          show={this.state.showAlert}
          title="Claim Filed"
          subtitle="Your will receive a response shortly" >
          <SCLAlertButton theme="success" onPress={this.handleClose}>Done</SCLAlertButton>
        </SCLAlert>
        </ScrollView>

            </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    marginTop: 8,
    marginStart: 15,

  },
  textField: {
     marginStart: 10
   },
  
});

