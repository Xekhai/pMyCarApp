import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import R from "res/R";
import { TextField } from "react-native-material-textfield";

import ISMaterialPicker from "library/components/ISMaterialPicker";
import BaseService from "services/BaseService";
import AuthService from "services/AuthService";
import states from "res/states";
import DatePicker from "react-native-date-picker";
import Loading from "library/components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
const moment = require("moment");

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      otherName: null,
      dateOfBirth: null,
      email: null,
      date: new Date(),
      phoneNumber: null,
      state: null,
      citiesInState: null,
      city: null,
      password: null,
      confirmPassword: null,
      loading: false,
      errors: {},
    };
  }

  componentDidMount() {
    //auto form filling for fast prototyping
    if (R.constants.DEV) {
      this.setState({
        firstName: "Acheme",
        lastName: "Enokela",
        otherName: "Paul",
        email: "achemepaulenokela@gmail.com",
        phoneNumber: "07061097224",
        state: "Benue",
        city: "Makurdi",
        dateOfBirth: "1992-11-03",
        password: "123",
        citiesInState: states[6].locals,
      });
    }
  }

  async validateForm() {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      state,
      city,
      password,
      dateOfBirth,
      errors,
    } = this.state;
    await this.setState({ errors: {} });
    let formValid = true;

    if (!firstName) {
      errors.firstNameError = "Please input your first name";
      formValid = false;
    }
    if (!lastName) {
      console.log("input last name");
      errors.lastNameError = "Please input your last name (surname)";
      formValid = false;
    }
    if (!email) {
      errors.emailError = "Please input your email";
      formValid = false;
    }
    if (!phoneNumber) {
      errors.phoneNumberError = "Please input your phone number";
      formValid = false;
    }
    if (!state) {
      errors.stateError = "Please select your state";
      formValid = false;
    }
    if (!city) {
      errors.cityError = "Please select LGA in your state";
      formValid = false;
    }
    if (!password) {
      errors.passwordError = "Please create a password";
      formValid = false;
    }

    if (!dateOfBirth) {
      errors.dobError = "Please select your date of birth.";
      formValid = false;
    }

    await this.setState({ errors });

    return formValid;
  }

  handleContinue = async () => {
    console.log("handle continue pressed");
    const formValid = await this.validateForm();
    console.log(formValid);
    if (!formValid) return;

    this.registerUser();
  };

  registerUser = async () => {
    const {
      firstName,
      lastName,
      otherName,
      email,
      phoneNumber,
      dateOfBirth,
      state,
      city,
      password,
    } = this.state;
    const user = {
      first_name: firstName,
      last_name: lastName,
      other_name: otherName,
      email: email,
      phone: phoneNumber,
      date_of_birth: dateOfBirth,
      state: state,
      city: city,
      password: password,
    };

    this.setState({ loading: true });
    const req = await AuthService.registerUser(user);
    //  console.log(req);
    const res = req.data;

    console.log(res);

    //successful reg
    if (res.success) {
      await AsyncStorage.setItem("@user", JSON.stringify(res.user));
      this.setState({ loading: false });
      console.log("Registration successfull");
      await new BaseService().init();
      this.props.navigation.goBack();
    }
    //reg error
    else {
      let errors = {};
      errors.checkError = res.msg;
      this.setState({ errors, loading: false });
    }
  };

  render() {
    const {
      lastName,
      firstName,
      otherName,
      email,
      phoneNumber,
      password,
      errors,
      date,
      state,
      citiesInState,
      loading,
    } = this.state;

    if (loading) {
      return <Loading text="Verifying information, please wait..." />;
    }
    return (
      <>
        <LinearGradient colors={["#000000", "#242424"]} style={{ flex: 1 }}>
          <ScrollView style={{ paddingHorizontal: 10 }}>
            <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 55 }}>
              <Text style={{ fontSize: 30, marginVertical: 24, color: "#fff" }}>
                Lets Sign you up
              </Text>
              <Text style={{ fontSize: 24, color: "#fff" }}>
                Welcome,{"\n"}Join the Family!
              </Text>
              <Text style={R.pallete.formTitle}>Personal Info</Text>
              {errors.checkError && (
                <Text style={R.pallete.errorText}>{errors.checkError}</Text>
              )}
              <TextField
                label="Last Name (Surname)"
                error={errors.lastNameError}
                ref={this.lastNameRef}
                onChangeText={(lastName) => {
                  this.setState({ lastName });
                }}
                value={lastName}
                {...R.pallete.textFieldStyle}
              />

              <TextField
                label="First Name"
                error={errors.firstNameError}
                ref={this.firstNameRef}
                keyboardType="default"
                onChangeText={(firstName) => {
                  this.setState({ firstName });
                }}
                value={firstName}
                {...R.pallete.textFieldStyle}
              />

              <TextField
                label="Other Name"
                error={errors.otherNameError}
                keyboardType="default"
                ref={this.otherNameRef}
                onChangeText={(otherName) => {
                  this.setState({ otherName });
                }}
                value={otherName}
                {...R.pallete.textFieldStyle}
              />

              <TextField
                label="Email"
                error={errors.emailError}
                keyboardType="email-address"
                ref={this.emailRef}
                onChangeText={(email) => {
                  this.setState({ email });
                }}
                value={email}
                {...R.pallete.textFieldStyle}
              />
              <TextField
                label="Phone Number"
                error={errors.phoneNumberError}
                keyboardType="number-pad"
                ref={this.phoneNumberRef}
                onChangeText={(phoneNumber) => {
                  this.setState({ phoneNumber });
                }}
                value={phoneNumber}
                {...R.pallete.textFieldStyle}
              />

              <Text style={R.pallete.formSubTitle}>Date of Birth</Text>
              {errors.dobError && (
                <Text style={{ ...R.pallete.errorText }}>
                  {errors.dobError}
                </Text>
              )}
              <DatePicker
                date={date}
                onDateChange={(date_) => {
                  const dateOfBirth = moment(date_).format("YYYY-MM-DD");
                  console.log(dateOfBirth);
                  this.setState({ dateOfBirth });
                }}
                mode="date"
                androidVariant="nativeAndroid"
                textColor="#fff"
              />

              <Text style={R.pallete.formSubTitle}>Contact Details</Text>

              <ISMaterialPicker
                items={states}
                label="State"
                errorText={errors.stateError}
                onValueChange={async (state, index) => {
                  if (index === 0) return this.setState({ state: null });
                  const citiesInState = states[index - 1].locals;
                  await this.setState({ state, citiesInState });
                }}
              />

              {state && (
                <ISMaterialPicker
                  items={citiesInState}
                  label="city"
                  selectedItem={null}
                  errorText={errors.cityError}
                  onValueChange={async (city, index) => {
                    if (index === 0) return this.setState({ city: null });

                    await this.setState({ city });
                  }}
                />
              )}

              <Text style={R.pallete.formSubTitle}>Account Security</Text>
              <Text style={R.pallete.formSubTitle}>
                Create a password to secure your account.
              </Text>
              <TextField
                label="Password"
                error={errors.passwordError}
                keyboardType="visible-password"
                ref={this.passwordRef}
                onChangeText={(password) => {
                  this.setState({ password });
                }}
                value={password}
                {...R.pallete.textFieldStyle}
              />

              {/* Just empty view to give margin */}
              <View style={{ marginBottom: 10 }}></View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#494949",
                marginBottom: 20,
                width: "70%",
                borderRadius: 90,
                padding: 20,
                elevation: 4,
                alignSelf: "center",
              }}
              onPress={() => this.handleContinue()}
            >
              <Text
                style={{ fontSize: 16, color: "#fff", alignSelf: "center" }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </>
    );
  }
}
