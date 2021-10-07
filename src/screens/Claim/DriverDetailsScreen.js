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
const driverTypes = [
    {name: 'Me'}, {name: 'Someone else'},
]

 export default class DriverDetailsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      loading: false,
      errors:{},
      driverFullname:null,
      driverAddress:null,
      driverPhone:null,
      driversRelToInsured:null,
      driversLicence: null,
      driverType:null,
    }
    this.origParams = this.props.route.params.policy;
    this.params = {underwriting_id: this.origParams.id, cover_type: this.origParams.cover_type};
    console.log(this.params);
  }

  continue = async () => {
      const formValid = await this.validateForm();

      if (formValid) {
          const { driverType, driverFullname, driverAddress, driverPhone, driversRelToInsured, driversLicence } = this.state;
          const params = { ...this.params, driverFullname, driverAddress, driverPhone, driversRelToInsured, driversLicence, driverType };
          // console.log(params);
          this.props.navigation.navigate('AccidentDetails', {params});
      }
  }

  validateForm = async () => {
    let formValid = false;
   let  errors  = {};
   
   await this.setState({errors});

   const driverTypes_ = {me: 'Me', someone: 'Someone else'};

   const { driverType, driverFullname, driverAddress, driverPhone, driversRelToInsured, driversLicence } = this.state;

   if (!driverType) {
       errors.driverTypeError = 'Please select who was driving the car at the time of the accident'
   }
    if (!driverFullname && driverType == driverTypes_.someone) {
      errors.fullnameError = `Please input full name of who was driving your ${this.origParams.details.vehicle_make} ${this.origParams.details.vehicle_model}`;
    }
    if (!driverAddress && driverType == driverTypes_.someone) {
        errors.addressError = `Please input address of driver`;
      }
      if (!driverPhone && driverType == driverTypes_.someone) {
        errors.phoneNumberError = `Please input phone number of driver`;
      }
      if (!driversRelToInsured && driverType == driverTypes_.someone) {
        errors.relationshipError = `Please input drivers' relationship to the you.`;
      }
      if (!driversLicence && driverType == driverTypes_.someone) {
        errors.driverLicenceError = `Please select whether or not the driver has a drivers licence`;
      }


   await this.setState({errors});

   if (Object.keys(errors).length == 0) {
     formValid = true;
   }

   console.log(errors);

   return formValid;

  }

  render() {
      const { errors, driverType, driverFullname, driverAddress, driverPhone, driversRelToInsured, driversLicence } = this.state;
   return (
      
           <View style={styles.container}>
                <ScrollView>
                    <ISMaterialPicker 
                    items={driverTypes} 
                    label="Who was driving the car ?"
                    errorText={errors.driverTypeError}
                    onValueChange={async (driverType, index) => {
                    if (index === 0) return this.setState({driverType: null});
                    await this.setState({driverType});

                    }}
                    />
                    {

                        driverType == 'Someone else' && 
                        <>
                              <TextField
                                label='Driver Fullname'
                                error={errors.fullnameError}
                                ref={this.firstNameRef}
                                keyboardType="default"
                                onChangeText={(driverFullname) => {
                                    this.setState({ driverFullname });
                                }}
                                value={driverFullname}
                                {...R.pallete.textFieldStyle}
                            />

                                <TextField
                                    label='Address'
                                    error={errors.addressError}
                                    ref={this.firstNameRef}
                                    keyboardType="default"
                                    onChangeText={(driverAddress) => {
                                        this.setState({ driverAddress });
                                    }}
                                    value={driverAddress}
                                    {...R.pallete.textFieldStyle}
                                />

                            <TextField
                                label='Phone number'
                                error={errors.phoneNumberError}
                                ref={this.firstNameRef}
                                keyboardType="number-pad"
                                onChangeText={(driverPhone) => {
                                    this.setState({ driverPhone });
                                }}
                                value={driverPhone}
                                {...R.pallete.textFieldStyle}
                            />

                            <TextField
                                label='Drivers Relationship to insured'
                                error={errors.relationshipError}
                                ref={this.firstNameRef}
                                keyboardType="default"
                                onChangeText={(driversRelToInsured) => {
                                    this.setState({ driversRelToInsured });
                                }}
                                value={driversRelToInsured}
                                {...R.pallete.textFieldStyle}
                            />

                            <ISMaterialPicker 
                                items={[{name: 'Yes'}, {name: 'No'}]} 
                                label="Does the driver have a drivers licence ?"
                                errorText={errors.driverLicenceError}
                                onValueChange={async (driversLicence, index) => {
                                if (index === 0) return this.setState({driversLicence: null});
                                await this.setState({driversLicence});

                                }}
                                value={driversLicence}
                                {...R.pallete.textFieldStyle}
                            />

                        </>

                    }
              
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
  
});

