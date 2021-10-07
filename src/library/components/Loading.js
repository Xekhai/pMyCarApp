import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
  
   
  } from 'react-native';
  import LinearGradient from "react-native-linear-gradient";

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        
    }

   

    render() {
        return (
            <LinearGradient
          colors={["#000000", "#161616"]}
          style={{ flex: 1, paddingHorizontal: 30, paddingVertical: 55 }}
        >
            <View style={styles.container}>
               
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ margin:24, fontSize: 16, color: "#fff", alignSelf: "center" }}>{this.props.text}</Text>
                </View></LinearGradient>
        )
        
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});