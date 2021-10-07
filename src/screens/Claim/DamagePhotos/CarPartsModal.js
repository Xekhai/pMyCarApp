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

import Modal from 'react-native-modal';


import Loading from 'library/components/Loading'

 export default class CarPartsModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      loading: false,
      isVisible: true,
      selectedPartId:null,
    }
    this.renderCarParts = this.renderCarParts.bind(this);
    this.carParts = this.props.carParts;
    console.log(this.props.carParts);
   
  }

  dismissModal = () => {
      this.setState({isVisible: false});
      this.props.onDismiss(this.state.selectedPartId);
  }
  setSelectedPart = async (selectedPartId) => {
      await this.setState({selectedPartId});
      this.dismissModal();
  }
  renderCarParts =  () => {
      const carParts = this.props.carParts;
   
    return (
        <>
        {
         carParts && carParts.map(carPart => (
             <TouchableOpacity style={styles.carPartContainer} onPress={() => this.setSelectedPart(carPart.id)}>
                 <Image source={{uri:R.constants.FILE_SERVER+carPart.image}} style={styles.image} />
                 <Text style={styles.carPartTxt}>{carPart.part}</Text>
             </TouchableOpacity>
         ))
        }
        </>
    )
    

  }

  render() {
   return (
      
    <View>
        <Modal isVisible={this.state.isVisible} onBackButtonPress={this.dismissModal} onBackdropPress={this.dismissModal}>
        <View style={styles.modal}>
            <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 5}}>Select Part of Car Damaged</Text>
            <Text style={{fontSize: 13, marginBottom: 35}}>One at a time</Text>
            {this.renderCarParts()}
        </View>
        </Modal>
    </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  modal: {
      flex:1,
      backgroundColor: '#fff',
   
    padding: 20,
  },
  carPartContainer:{
      flexDirection: 'row',
      borderColor: R.colors.appPrimary,
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      borderRadius: 10
  },
  carPartTxt: {
      fontSize: 17,
      marginTop: 15
  },
  image: {
      width: 150,
      height: 80,
      marginRight: 10
  }
  
});

