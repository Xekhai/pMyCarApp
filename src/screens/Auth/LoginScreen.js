import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import R from "res/R";
import { TextField } from "react-native-material-textfield";

import Loading from "library/components/Loading";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthService from "services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: "Screen title here",
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: null,
      password: null,
      errors: {},
    };
  }

  componentDidMount() {}
  componentWillUnmount() {}

  handleLogin = async () => {
    console.log("logging in...");
    if (!this.validateForm()) return;
    this.setState({ loading: true });
    const req = await AuthService.doLogin(
      this.state.email,
      this.state.password
    );
    const res = req.data;

    console.log(res);
    if (res.success) {
      console.log("Logged in successfully");
      await AsyncStorage.setItem("@user", JSON.stringify(res.user));

      this.props.navigation.goBack();
    } else {
      const errors = {
        invalidDetails: res.msg,
      };
      this.setState({ errors });
    }
    this.setState({ loading: false });
  };

  validateForm = () => {
    let formValid = true;
    const { email, password } = this.state;
    let errors = {};
    this.setState({ errors });
    if (!email) {
      formValid = false;
      errors.emailError = "Please input a valid email";
    }
    if (!password) {
      formValid = false;
      errors.passwordError = "Please enter your PMyCar password";
    }

    this.setState({ errors });

    return formValid;
  };

  handleRegister = async () => {
    this.props.navigation.navigate("RegisterScreen");
  };

  renderForm() {
    const { email, password, errors } = this.state;

    return (
      <ScrollView>
        <View style={styles.formContainer}>
          <TextField
            label="Email"
            error={errors.emailError}
            ref={this.emailRef}
            onChangeText={(email) => {
              this.setState({ email });
            }}
            value={email}
            {...R.pallete.textFieldStyle}
          />
          <View style={{ height: 30 }}></View>
          <TextField
            label="Password"
            error={errors.passwordError}
            ref={this.passwordRef}
            secureTextEntry={true}
            onChangeText={(password) => {
              this.setState({ password });
            }}
            value={password}
            {...R.pallete.textFieldStyle}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 18,
              marginBottom: 18,
            }}
          >
            <Text style={{ fontFamily: "Segoe-UI", color: "#606060" }}>
              Dont have an account?
            </Text>

            <TouchableOpacity onPress={this.handleRegister}>
              <Text style={{ fontFamily: "Segoe-UI", color: "#fff" }}>
                {" "}
                Register
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("ForgotPasswordScreen")
            }
          >
            <Text
              style={{
                fontFamily: "Segoe-UI",
                color: "#fff",
                width: "100%",
                textAlign: "center",
              }}
            >
              {" "}
              Forgot Password{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              marginTop: 20,
              width: "100%",
              borderRadius: 90,
              padding: 24,
              elevation: 4,
            }}
            onPress={() => this.handleLogin()}
          >
            <Text style={R.pallete.appBtnText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  render() {
    const { loading, errors } = this.state;
    if (loading) {
      return <Loading text="Loggin you in..." />;
    }
    return (
      <LinearGradient
        colors={["#000000", "#161616"]}
        style={{ flex: 1, paddingHorizontal: 30, paddingVertical: 55 }}
      >
        <View style={styles.headerContainer}></View>
        <Text style={{ fontSize: 30, marginVertical: 24, color: "#fff" }}>
          Lets Sign you in
        </Text>
        <Text style={{ fontSize: 24, color: "#fff" }}>
          Welcome.{"\n"}You have been missed!
        </Text>

        <View style={styles.subheadingContainer}>
          {errors.invalidDetails && (
            <Text style={R.pallete.errorText}>{errors.invalidDetails}</Text>
          )}
        </View>

        {this.renderForm()}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    fontFamily: "Segoe-UI-Italic",
  },
  headerContainer: {
    paddingBottom: 10,
  },
  headerLogo: {
    width: 130,
    height: 80,
    alignSelf: "center",
  },

  subheadingContainer: {
    marginTop: 30,
  },

  formContainer: {
    fontFamily: "Segoe-UI",
    flex: 1,
  },
});
