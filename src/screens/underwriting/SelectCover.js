import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  CheckBox,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { formatCurrency } from 'library/utils/StringUtils'
import { TextField } from 'react-native-material-textfield';

import AppService from 'services/AppService';


import R from 'res/R'



import Loading from 'library/components/Loading'

const coverTypes = {
  thirdParty: 'Third Party',
  comprehensive: 'Comprehensive'
}


 export default class SelectCoverScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      
      selectedCover : null,
      premium:null,
      vehicleCost:0,
      loading: false,
      rate: 0,
      errors: {

      }
    }
   
  }

  componentDidMount() {
    this.getComprehensiveRate();
  }

  getComprehensiveRate = async () => {

    const req = await AppService.getSetting('rate');
    const res = req.data;
    if(res.success) {
      console.log('Comprehensive rate is: '+ res.setting.value);
      this.setState({rate: res.setting.value, loading: false});
    }
  }

  selectCover = async (selectedCover) => {
   
   await this.setState({selectedCover: null, premium: null});
   if (selectedCover == coverTypes.thirdParty) {
     this.setState({premium: 5000});
   }
    this.setState({selectedCover});

  }

  continue = () => {

    const { selectedCover, premium, vehicleCost } = this.state;
    const routeParams = this.props.route.params;
    const params = { ...routeParams, selectedCover, premium, vehicleCost };

   // if (selectedCover == coverTypes.comprehensive) {
      this.props.navigation.navigate('VehiclePhotosScreen' , params);
   // }
    
  }

  render() {
    const { loading, rate, errors,selectedCover, premium, vehicleCost } = this.state;

    if (loading) {
      return (
          <Loading text="Please wait..." />
      )
    }
   return (
      
           <View style={styles.container}>
                    <Text style={styles.help}>Please select how you will be compensated when your car is involved in an accident</Text>

                <ScrollView>
                  <Text style={{marginTop: 25, marginBottom: 10, fontWeight: 'bold', fontSize: 16}}>Choose compensation type</Text>

                  <TouchableOpacity style={[styles.checkboxContainer, selectedCover == coverTypes.comprehensive ? styles.checkBoxSelected : {}]} onPress={() => this.selectCover(coverTypes.comprehensive)}>
                  <CheckBox
                    value={selectedCover == coverTypes.comprehensive ? true : false}
                    onValueChange={(selected) => {
                      selected && this.selectCover(coverTypes.comprehensive);
                    
                  }}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Comprehensive - Compensate me for any damages incured on my car when involved in an accident</Text>
                </TouchableOpacity>
                  <TouchableOpacity style={[styles.checkboxContainer, selectedCover == coverTypes.thirdParty ? styles.checkBoxSelected : {}]} onPress={() => this.selectCover(coverTypes.thirdParty)}>
                  <CheckBox
                    value={selectedCover == coverTypes.thirdParty ? true : false}
                    onValueChange={(selected) => {
                      selected && this.selectCover(coverTypes.thirdParty);
                    
                  }}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Third Party - Compensate the other person (third party) when I damage their vehicle during an accident</Text>

                  </TouchableOpacity>

                  {
                    selectedCover == coverTypes.comprehensive && 
                    <View style={{}}>
                       <TextField
                          label='Cost of Vehicle'
                          error={errors.vehicleCostError}
                          ref={this.vehicleCostRef}
                          keyboardType="numeric"
                          onChangeText={(vehicleCost) => {
                            if (!vehicleCost) return;
                            const premium = ((rate/100) * vehicleCost)
                              this.setState({ vehicleCost, premium });
                          }}
                          value={vehicleCost}
                        {...R.pallete.textFieldStyle}
                      />
                    </View>
                  }

                  {
                    premium && 
                    <View style={styles.costContainer}>
                      <Text>Insurance Premium</Text>
                      <Text>{formatCurrency(premium)}</Text>
                    </View>
                  }

          {
          premium &&
          
          <TouchableOpacity style={{
            backgroundColor: "#494949",
            marginBottom: 20,
            width: "70%",
            borderRadius: 90,
            padding: 20,
            marginTop: 20,
            elevation: 4,
            alignSelf: "center",
          }} onPress={this.continue}>
            <Text style={{textAlign: "center", color: '#fff'}}>Continue</Text>
          </TouchableOpacity>
          }
                </ScrollView>

            </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    margin: 15,
  },
  help: {
    fontSize: 15
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    
  },
  checkBoxSelected : {
    borderWidth: 1,
    borderColor: R.colors.appPrimary,
    borderRadius: 10,
    padding: 15

  },
  costContainer : {
    marginTop: 20,
    paddingTop: 14,
    borderTopColor: R.colors.appSecondary,
    borderTopWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
  }
});

