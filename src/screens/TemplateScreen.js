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



import Loading from 'library/components/Loading'

 export default class TemplateScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      loading: false,
    }
    this.params = this.props.route.params;
    console.log(this.params);
  }

  doSomething = async () => {
   

  }

  render() {
   return (
      
           <View style={styles.container}>
                <ScrollView>
                    <Text>Hello world!</Text>
                </ScrollView>

            </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  
});

