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
  TouchableOpacity,
} from 'react-native';

import R from 'res/R'

import { TextField } from 'react-native-material-textfield';
import ISMaterialPicker from 'library/components/ISMaterialPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
var moment = require('moment');


import Loading from 'library/components/Loading'
const accidentTypes = [
  { name: 'Accidental Damage to own vehicle' },
  { name: 'Third party property damage' },
  { name: 'Theft' }, { name: 'Fire Damage' },
  { name: 'Third Party injury/Death' },
  { name: 'Personal accident to passengers' },
]

export default class AccidentDetailsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

      loading: false,
      errors: {},
      date: null,
      time: null,
      location: null,
      narration: null,
      natureOfDamage: null,
      showDatePicker: false,
      showTimePicker: false,

    }
    this.params = this.props.route.params.params;
    console.log(this.params);
  }

  continue = async () => {
    const formValid = await this.validateForm();

    if (formValid) {
      const { date, time, location, narration, natureOfDamage } = this.state;

      const params = { ...this.params, date, time, location, narration, natureOfDamage };

      if (this.params.cover_type == 'Comprehensive') {
      this.props.navigation.navigate('InsuredDamagePhotos', {params});


      }

    }
  }

  validateForm = async () => {
    let  errors  = {};

    let formValid = true;

    await this.setState({ errors });

    const driverTypes_ = { me: 'Me', someone: 'Someone else' };

    const { natureOfDamage, date, time, location, narration } = this.state;

    if (!natureOfDamage) {
      errors.natureOfDamageError = 'Please select the nature of damage.'
    }
    if (!date) {
      errors.dateError = `Please select the date accident occured`;
    }
    if (!time) {
      errors.timeError = `Please select time of accident`;
    }
    if (!location) {
      errors.locationError = `Please input where the accident occured.`;
    }
    if (!narration) {
      errors.narrationError = `Describe briefly what happened`;
    }

    await this.setState({ errors });

    console.log(errors);
   
    if (Object.keys(errors).length !== 0) {
      formValid = false;
    }

    return formValid;

  }

  render() {
    const { errors, date, time, narration, location, showDatePicker, showTimePicker } = this.state;
    return (

      <View style={styles.container}>
        <ScrollView>
          <ISMaterialPicker
            items={accidentTypes}
            label="Select Nature of Damage"
            errorText={errors.natureOfDamageError}
            onValueChange={async (natureOfDamage, index) => {
              if (index === 0) return this.setState({ natureOfDamage: null });
              await this.setState({ natureOfDamage });

            }}
          />

          <TouchableOpacity  style={styles.dt} onPress={() => this.setState({showDatePicker: true})}>
          <Text style={styles.dtText}>Date of Accident [Tap to select]</Text>
          {errors.dateError && <Text style={R.pallete.errorText}>{errors.dateError}</Text>}

          {date && 
          
            <Text  style={styles.dtText}>{date}</Text>
            }
          </TouchableOpacity>
         {showDatePicker &&
         <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={'date'}
              is24Hour={false}
              display="default"
              dateFormat="dayofweek day month"
              onChange={(e,date) => {
                let date_ = moment(date).format('YYYY-MM-DD');
                console.log(date_);
                this.setState({date:date_, showDatePicker: false})
            }}
            />
         
         } 


<TouchableOpacity  style={styles.dt} onPress={() => this.setState({showTimePicker: true})}>
          <Text  style={styles.dtText}>Time of Accident [Tap to select]</Text>
          {errors.timeError && <Text style={R.pallete.errorText}>{errors.timeError}</Text>}

          {time && 
          
            <Text style={styles.dtText}>{time}</Text>
            }
          </TouchableOpacity>
         {showTimePicker &&
         <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={'time'}
              is24Hour={false}
              display="default"
              dateFormat="dayofweek day month"
              onChange={(e,dateTime) => {
              let time = moment(dateTime).format("hh:mm:ss a")
                this.setState({time, showTimePicker: false})
            }}
            />
         
         } 



          <TextField
            label='Where did this accident occur ?'
            error={errors.locationError}
            ref={this.firstNameRef}
            keyboardType="default"
            onChangeText={(location) => {
              this.setState({ location });
            }}
            value={location}
            {...R.pallete.textFieldStyle}
          />

          <TextField
            label='Narrate what happened'
            error={errors.narrationError}
            ref={this.firstNameRef}
            keyboardType="default"
            multiline={true}
            onChangeText={(narration) => {
              this.setState({ narration });
            }}
            value={narration}
            {...R.pallete.textFieldStyle}
          />





        </ScrollView>
        <TouchableHighlight onPress={() => this.continue()} style={[R.pallete.appButton, { marginTop: 10, marginBottom: 35, width: '100%' }]}>
          <Text style={{ textAlign: "center", color: '#fff' }}>Continue</Text>
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
  dt : {
    marginBottom: 10,
    marginStart: 8
  },
  dtText: {
    fontSize: 15
  }

});

