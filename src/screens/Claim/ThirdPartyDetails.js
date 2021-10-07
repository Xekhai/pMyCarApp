import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
} from 'react-native';

import R from 'res/R'

import { TextField } from 'react-native-material-textfield';
import ISMaterialPicker from 'library/components/ISMaterialPicker';


import Loading from 'library/components/Loading'


 export default class ThirdPartyDetailsScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      errors:{},
      thirdPartyFullname:"",
      thirdPartyAddress:"",
      thirdPartyPhone:"",
      thirdPartyDriversLicence: "",
    }
    this.params = this.props.route.params.params;
    console.log(this.params);
  }

  continue = async () => {
      const formValid = await this.validateForm();
      const { thirdPartyFullname, thirdPartyPhone, thirdPartyAddress, thirdPartyDriversLicence } = this.state;

      const params = {...this.params, thirdPartyFullname, thirdPartyPhone, thirdPartyAddress, thirdPartyDriversLicence}
        this.props.navigation.navigate('SupportingDocuments', {params});
      
  }

  validateForm = async () => {
    let formValid = false;
   let  errors  = {};
   
   await this.setState({errors});


   const { thirdPartyFullname, thirdPartyAddress, thirdPartyPhone, thirdPartyDriversLicence } = this.state;


  
    if (!thirdPartyFullname) {
      errors.fullnameError = `Please input full name of the third party`;
    }
    if (!thirdPartyAddress) {
        errors.addressError = `Please input address of the third party`;
      }
      if (!thirdPartyPhone  ) {
        errors.phoneNumberError = `Please input phone number of the third party`;
      }
     
      if (!thirdPartyDriversLicence  ) {
        errors.driverLicenceError = `Please select whether or not the third party has a drivers licence`;
      }


   await this.setState({errors});

   if (Object.keys(errors).length == 0) {
     formValid = true;
   }

   console.log(errors);

   return formValid;

  }

  render() {
      const { errors, thirdPartyFullname, thirdPartyAddress, thirdPartyPhone, thirdPartyDriversLicence } = this.state;
   return (
      
           <View style={styles.container}>
                <View style={styles.infoCard}>

                <Text style={styles.cardText}>Input details of third party. If there was no third party damage, tap the continue button</Text>
                </View>
                <ScrollView>
                   
                              <TextField
                                label='Third Party Fullname'
                                error={errors.fullnameError}
                                ref={this.firstNameRef}
                                keyboardType="default"
                                onChangeText={(thirdPartyFullname) => {
                                    this.setState({ thirdPartyFullname });
                                }}
                                value={thirdPartyFullname}
                                {...R.pallete.textFieldStyle}
                            />

                                <TextField
                                    label='Address'
                                    error={errors.addressError}
                                    ref={this.firstNameRef}
                                    keyboardType="default"
                                    onChangeText={(thirdPartyAddress) => {
                                        this.setState({ thirdPartyAddress });
                                    }}
                                    value={thirdPartyAddress}
                                    {...R.pallete.textFieldStyle}
                                />

                            <TextField
                                label='Phone number'
                                error={errors.phoneNumberError}
                                ref={this.firstNameRef}
                                keyboardType="number-pad"
                                onChangeText={(thirdPartyPhone) => {
                                    this.setState({ thirdPartyPhone });
                                }}
                                value={thirdPartyPhone}
                                {...R.pallete.textFieldStyle}
                            />

                          
                            <ISMaterialPicker 
                                items={[{name: 'Yes'}, {name: 'No'}]} 
                                label="Does the driver have a drivers licence ?"
                                errorText={errors.driverLicenceError}
                                onValueChange={async (thirdPartyDriversLicence, index) => {
                                if (index === 0) return this.setState({thirdPartyDriversLicence: null});
                                await this.setState({thirdPartyDriversLicence});

                                }}
                                value={thirdPartyDriversLicence}
                                {...R.pallete.textFieldStyle}
                            />
                </ScrollView>
                <TouchableHighlight onPress={() => this.continue()} style ={[R.pallete.appButton, {marginTop: 10, marginBottom: 35, width: '100%'}]}>
                <Text style={{textAlign: "center", color: '#fff'}}>Continue</Text>
                </TouchableHighlight>

            </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    margin: 10
  },
  infoCard : {
    backgroundColor: 'purple',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: "100",
  },
});

