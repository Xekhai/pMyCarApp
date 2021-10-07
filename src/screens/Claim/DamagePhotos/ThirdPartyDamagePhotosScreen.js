import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import R from 'res/R'

import AppService from 'services/AppService'
import Loading from 'library/components/Loading'


import CarPartsModal from './CarPartsModal';

import styles from './style'


 export default class InsuredDamagePhotosScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
        thirdPartyDamageImages: [],
        loading: true,
        showAlert: false,
        photoPermission: null,
        cameraPermission: null,
        renderCamera: false,
        capturing: false,
        showModal: false,
        vehiclePartId: 0
    }

    this.params = this.props.route.params.params;
    console.log(this.params);
  }

  componentDidMount() {
    this._checkCameraAndPhotosPermission();
    this.getCarParts();
  }

  getCarParts = async () => {

    const req = await AppService.getCarParts();
    const res = req.data;

    if (res.success) {
      this.setState({carParts: res.car_parts, loading: false});
    }
    
  }

  continue = async () => {
   
      const {  thirdPartyDamageImages } = this.state;

      const params = { ...this.params,  thirdPartyDamageImages };

      this.props.navigation.navigate('ThirdPartyDetails', {params});



  }

  _checkCameraAndPhotosPermission = () => {
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
      //response is an object mapping type to permission
      console.log(response);
      if (response.camera === 'undetermined' || response.camera ==='denied') {
        Permissions.request('camera');
      }
      if (response.photo  === 'undetermined' || response.photo === 'denied') {
        Permissions.request('photo');
      }
    });
  };
 


  takePicture = async () => {
    if (this.state.capturing) {
      return;
    }
    this.setState({capturing: true})
    if (this.camera) {
      const options = { quality: 0.7, base64: false, width: 1000 };
      const data = await this.camera.takePictureAsync(options);
      data.vehiclePartId = this.state.vehiclePartId;
      console.log(data);
      const {  thirdPartyDamageImages } = this.state;
       thirdPartyDamageImages.push(data);
      await this.setState({ thirdPartyDamageImages, renderCamera: false, capturing: false});
      // this.setState((state, props) => {
      //   var  thirdPartyDamageImages = state. thirdPartyDamageImages;
      //     thirdPartyDamageImages[state.imageIndex] = data;
      //   return {
      //      thirdPartyDamageImages,
      //     renderCamera: false,
      //     capturing: false
      //   }
      // }   
      //);
    }
    else {
      console.log("NO camera object");
    }
  }

  gotoSupportingDocs = async () => {
     
  }

  dismissModal = (vehiclePartId) => {
    console.log(vehiclePartId);
    this.setState({showModal: false, vehiclePartId});
    if (vehiclePartId != 0) this.setState({renderCamera:true});
  }
 
  removeImage(index) {
    const {  thirdPartyDamageImages } = this.state;
     thirdPartyDamageImages.splice(index, 1);
    
    this.setState({ thirdPartyDamageImages});
  }

  renderAddImageBox() {
    return (
      <TouchableOpacity style={styles.addImageWrapper} onPress={() => this.setState({showModal: true})}>
         <View>
          <Ionicons style={{alignSelf: 'center'}} name="ios-add-circle" size={25} color="orange" />
          <Text>Add Damage Image</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderImages() {
    const {  thirdPartyDamageImages } = this.state;

    if ( thirdPartyDamageImages.length) {

      return(
        <View>
          { thirdPartyDamageImages.map((image,index) => (
            <TouchableOpacity onPress={() => this.removeImage(index)}>
               <Text style={styles.tapTochangeText}>Tap on Image to Remove</Text>
              <Image
                source={{ uri: image.uri }}
                style={styles.itemImage}
              />
            </TouchableOpacity>
          ))}
        </View>
      )
    }
  }

  renderCamera() {
    return (
     <View style={styles.RNContainer}>
   <RNCamera
     ref={ref => {
       this.camera = ref;
     }}
     style={styles.RNPreview}
     type={RNCamera.Constants.Type.back}
     androidCameraPermissionOptions={{
       title: 'Permission to use camera',
       message: 'We need your permission to use your camera',
       buttonPositive: 'Ok',
       buttonNegative: 'Cancel',
     }}
     androidRecordAudioPermissionOptions={{
       title: 'Permission to use audio recording',
       message: 'We need your permission to use your audio',
       buttonPositive: 'Ok',
       buttonNegative: 'Cancel',
     }}
    
   />
   <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
     <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.RNCapture}>
       <Text style={{ fontSize: 14 }}> Capture </Text>
     </TouchableOpacity>
   </View>
 </View>
    )
   
  }

  renderContents() {
    return (
              <ScrollView>
                <View style={styles.infoCard}>
                <Text style={styles.cardText}>
                  Upload photos of damages of the THIRD PARTY Vehicle if you have any. NOTE claims with photos will be processed faster.
                  Add photos of each damage area.
                </Text>

                </View>

                <View>
                  {this.renderImages()}
                </View>
              
            <View style={styles.itemImages}>
              {this.renderAddImageBox()}

              {this.state.showModal && <CarPartsModal carParts={this.state.carParts} onDismiss={ this.dismissModal }/>}

            </View>
            

            
            <TouchableHighlight onPress={this.continue} style ={[R.pallete.appButton, {backgroundColor: R.constants.appGreen}]}>
                        <Text style={{textAlign: "center", color: '#fff'}}>Continue</Text>
                      </TouchableHighlight>
                </ScrollView>
                
               
    )
  }


  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <Loading text="Please wait.." />
        </View>
      )
    }
   return (
        <View style={styles.container}>{this.state.renderCamera ? this.renderCamera() : this.renderContents()}</View>
      
           
       
   )
  }
}

