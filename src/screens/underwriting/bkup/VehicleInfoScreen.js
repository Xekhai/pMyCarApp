import React, { Component } from 'react';
import {
  StyleSheet,
  Picker,
  View,
  TouchableHighlight,
  ScrollView,
  Text
} from 'react-native';
import Loading from 'library/components/Loading'
import Geolocation from '@react-native-community/geolocation';
import { RNToasty } from 'react-native-toasty'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatCurrency } from 'library/utils/StringUtils'
import { TextField } from 'react-native-material-textfield';
import CarService from 'services/CarService';
import ISMaterialPicker from 'library/components/ISMaterialPicker';



import R from 'res/R';



const vehicleCategories = [
  {name:"Private"}, {name:"Commercial"}
];

const years = [
  {name: '1995'}, {name: '1996'},{name: '1997'},{name: '1998'},
  {name: '1999'}, {name: '2000'},{name: '2001'},{name: '2002'},
  {name: '2003'}, {name: '2004'},{name: '2005'},{name: '2006'},
  {name: '2007'}, {name: '2008'},{name: '2009'},{name: '2010'},
  {name: '2011'}, {name: '2012'},{name: '2013'},{name: '2014'},
  {name: '2015'}, {name: '2016'},{name: '2017'},{name: '2018'},
  {name: '2019'}, {name: '2021'},
];

const carColors = [
  {name:'Black'}, {name: 'Blue'}, {name: 'Brown'},{ name: 'Ash'}, {name: 'White'}, {name: 'Gold'},
  {name:'Green'}, {name: 'Grey'}, {name: 'Indigo'}, {name: 'Orange'}, {name: 'Pink'}, {name: 'Purple'},
  {name:'Red'}, {name: 'Silver'}, {name: 'Violet'}, {name: 'Wine'}, {name: 'Yellow'}, {name: 'Other'},
]

export default class VehicleInfoScreen extends React.Component {
 

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      vehicleCategory: null,
      selectedVehicleCategory: null,
      selectedCarMake: null,
      selectedCarModel: null,
      carMakes:null,
      carModels:null,
      plateNumber: null,
      chasisNumber: null,
      engineNumber: null,
      vehicleColor: null,
      yearOfMake: null,
      carColor: null,
      lat:null,
      lng:null,
      coords: {},
    

      errors: {

      }
    }


  }

  async componentDidMount() {
   
    this.getCarMakes();

    Geolocation.getCurrentPosition((info) => {
     const coords = info.coords;
      console.log(coords);
      this.setState({ coords });
    },
      (error) => {
        console.log(error);
        this.setState({ coords: { lat: '0', lng: '0' } });
      }
    );

    
  }

  getCarMakes = async () => {

    const req = await CarService.getCarMakes();
    const res = req.data;
    if (res.success) {

      await this.setState({loading:false, carMakes: res.carMakes});

      if (R.constants.DEV) {
        this.setState({
            selectedVehicleCategory : 'Private',
            selectedCarMake : 'Mercedes',
            selectedCarModel : 'Benz', 
            plateNumber : 'AE 250 TKP', 
            chasisNumber : '17894DXXD',
            engineNumber : 'ENG123', 
            yearOfMake : '2010', 
            carColor : 'Black', 
            lat : '1.234344', 
            lng : '1.729374'

        });
      }
    }
  }






  continue =  async () => {
    const formValid = await this.validateForm();

    if (!formValid) {//validation fails
      return;
    }


    else {
        const { selectedVehicleCategory, selectedCarMake, selectedCarModel, plateNumber, chasisNumber, engineNumber, yearOfMake, carColor, lat, lng } = this.state;
        this.props.navigation.navigate('SelectCoverScreen', {selectedVehicleCategory, selectedCarMake, selectedCarModel, plateNumber, chasisNumber, engineNumber, yearOfMake, carColor, lat, lng});
      }

  } 

  validateForm = async () => {
    let formValid = true;
    let errors = {};
    this.setState({errors});

    const { selectedCarMake, selectedCarModel, yearOfMake, plateNumber, chasisNumber, engineNumber, selectedVehicleCategory, carColor } = this.state;

    if (!selectedCarMake) {
      errors.carMakeError = "Please select car make";
      formValid = false;
    }

    if (!selectedCarModel) {
      errors.carModelError = "Please select car model";
      formValid = false;
    }
    if (!yearOfMake) {
      errors.yearOfMakeError = "Please select year of car make";
      formValid = false;
    }
    if (!selectedCarMake) {
      errors.carMakeError = "Please select car make";
      formValid = false;
    }
    if (!plateNumber) {
      errors.plateNumberError = "Please input plate number";
      formValid = false;
    }
    if (!chasisNumber) {
      errors.chasisNumberError = "Please input chasis number";
      formValid = false;
    }
    if (!engineNumber) {
      errors.engineNumberError = "Please input engine number";
      formValid = false;
    }
    if (!carColor) {
      errors.carColorError = "Please select vehicle Color";
      formValid = false;
    }
    if (!selectedVehicleCategory) {
      errors.vehicleCategoryError = "Please select vehicle category";
      formValid = false;
    }
   await this.setState({errors});
   return formValid;



  }



  render() {

    const { loading, errors, carMakes, carModels, plateNumber, chasisNumber, engineNumber } = this.state;

    if (loading) {
      return <Loading text="Please wait..." /> 
    }

    return (
      <View style={styles.container}>
      <ScrollView>
        <View >
         
            <View style={styles.container}>


            <ISMaterialPicker 
                items={carMakes} 
                label="Select Car Make"
                labelKey="car_make"
                errorText={errors.carMakeError}
                onValueChange={async (selectedCarMake, index) => {
                  if (index === 0) return this.setState({selectedCarMake: null});
                 const carModels = carMakes[index - 1].models;
                 await this.setState({selectedCarMake, carModels});

                }}
                />



                {
                carModels &&  
                  <>
                <ISMaterialPicker 
                items={carModels} 
                label="Select Car Model"
                labelKey="car_model"
                errorText={errors.carModelError}
                onValueChange={async (selectedCarModel, index) => {
                  if (index === 0) return this.setState({selectedCarModel: null});
                 await this.setState({selectedCarModel});

                }}
                />

                </>
                }

            <ISMaterialPicker 
                items={years} 
                label="Select Year of Make"
                errorText={errors.yearOfMakeError}
                onValueChange={async (yearOfMake, index) => {
                  if (index === 0) return this.setState({yearOfMake: null});
                 await this.setState({yearOfMake});

                }}
                />



              <TextField
                  label='Plate Number'
                  error={errors.plateNumberError}
                  ref={this.firstNameRef}
                  keyboardType="default"
                  onChangeText={(plateNumber) => {
                      this.setState({ plateNumber });
                  }}
                  value={plateNumber}
                 {...R.pallete.textFieldStyle}
              />

{errors.plateNumberError && <Text style={R.pallete.errorText}>{errors.plateNumberError}</Text>}


          <TextField
                  label='Chasis Number'
                  error={errors.chasisNumberError}
                  ref={this.firstNameRef}
                  keyboardType="default"
                  onChangeText={(chasisNumber) => {
                      this.setState({ chasisNumber });
                  }}
                  value={chasisNumber}
                 {...R.pallete.textFieldStyle}
              />

{errors.chasisNumberError && <Text style={R.pallete.errorText}>{errors.chasisNumberError}</Text>}


          <TextField
                  label='Engine Number'
                  error={errors.engineNumberError}
                  ref={this.firstNameRef}
                  keyboardType="default"
                  onChangeText={(engineNumber) => {
                      this.setState({ engineNumber });
                  }}
                  value={engineNumber}
                 {...R.pallete.textFieldStyle}
              />

{errors.engineNumberError && <Text style={R.pallete.errorText}>{errors.engineNumberError}</Text>}

              <ISMaterialPicker 
                items={carColors} 
                label="Select Car Color"
                errorText={errors.carColorError}
                onValueChange={async (carColor, index) => {
                  if (index === 0) return this.setState({carColor: null});
                 await this.setState({carColor});

                }}
                />

            
             
          <ISMaterialPicker 
                items={vehicleCategories} 
                label="Select Vehicle Category"
                errorText={errors.vehicleCategoryError}
                onValueChange={async (selectedVehicleCategory, index) => {
                  if (index === 0) return this.setState({selectedVehicleCategory: null});
                 await this.setState({selectedVehicleCategory});

                }}
                />


           

            </View>
          
        </View>

      </ScrollView>
       <TouchableHighlight onPress={() => this.continue()} style ={[R.pallete.appButton, {marginTop: 10, marginBottom: 35, width: '100%'}]}>
       <Text style={{textAlign: "center", color: '#fff'}}>Continue</Text>
      </TouchableHighlight>
      </View>
    
    );

  }
}

const styles = StyleSheet.create({

  RNContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 500,

  },

  container: {
    flex: 1,
    margin: 3,

  },
  form: {
    backgroundColor: 'white',
    padding: 10
  },





});

