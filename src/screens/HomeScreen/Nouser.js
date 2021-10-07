import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";

import { Text, View, Image, TouchableOpacity, StatusBar } from "react-native";

class NoUser extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#000000", "#161616"]}
        style={{ flex: 1, paddingHorizontal: 30, paddingVertical: 55 }}
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={{
              elevation: 4,
              height: 60,
              width: 60,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 200,
              padding: 10,
            }}
          >
            <Icon name="ellipsis-v" size={20} color="#000" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              color: "#fff",
              alignSelf: "center",
              textAlign: "center",
              flex: 1,
            }}
          >
            PMyCar
          </Text>
        </View>
        <Image
          style={{ height: 250, width: "100%" }}
          resizeMode="contain"
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/tikka-1f350.appspot.com/o/1633365748393.png?alt=media&token=091e6a92-1d8f-49c7-a974-e33ea52b6333",
          }}
        />

        <Text style={{ fontSize: 24, marginVertical: 24, color: "#fff" }}>
          Good Evening
        </Text>
        <Text style={{ fontSize: 16, color: "#fff" }}>
          How can we help you today?
        </Text>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "#494949",
              width: "100%",
              borderRadius: 90,
            }}
            onPress={() => this.props.navigation.navigate("RegisterScreen")}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 24,
                backgroundColor: "#fff",
                borderRadius: 90,
                elevation: 4,
              }}
              onPress={() => this.props.navigation.navigate("LoginScreen")}
            >
              <Text
                style={{ fontSize: 16, alignSelf: "center", color: "#000" }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1, padding: 24 }}>
              <Text
                style={{ fontSize: 16, color: "#fff", alignSelf: "center" }}
              >
                Signup
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

export default NoUser;
