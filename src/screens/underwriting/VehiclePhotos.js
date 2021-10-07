import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator

} from 'react-native';

import R from 'res/R'

import { RNCamera } from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RNToasty } from 'react-native-toasty'

import UnderwritingService from 'services/UnderwritingService'

import Loading from 'library/components/Loading'

 export default class VehiclePhotosScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      
      loading: false,
      images: [],
      imageIndex: 0,
      renderCamera: false,
      snapTapped: false,
      coords:null,
    }
 
  }

   componentDidMount() {
  
      
      Geolocation.getCurrentPosition((info)=> {
        coords = info.coords;
        console.log(coords);
       this.setState({coords});
      },
      (error) => {
        console.log(error);
        this.setState({coords: {lat: '0', lng: '0'}});
      }
      );
  }


  continue = async () => {
    const { images } = this.state;
       if (this.state.images.length !== 4) {
         Alert.alert('Missing Photos', 
      'Please take all four images',
      [
      {text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]
      );
       }

       else {
         //make the request here.
         this.setState({loading: true});

         const params = this.props.route.params;

         const vehicleImages = [
          images[0].uri,
          images[1].uri,
          images[2].uri,
          images[2].uri,
         ]
         const req = await UnderwritingService.vehicleUnderwriting(
                         params.selectedCarMake,
                         params.plateNumber,
                         params.chasisNumber,
                         params.engineNumber,
                         params.carColor,
                         params.selectedCarModel,
                         params.yearOfMake,
                         params.selectedVehicleCategory,
                         params.selectedCover,
                         vehicleImages,
                         params.premium,
                         params.vehicleCost,
                         this.state.coords.longitude,
                         this.state.coords.latitude,

                         );
         //console.log(req);
         const res = req.data;

         if (typeof res === 'undefined') {
           this.setState({loading:false});
           RNToasty.Error({
             title: 'Network error, check your internet connection and try again',
             duration: 1
          });
         }
         else if (res.success == true) {
           this.props.navigation.navigate('PayScreen', {params});
         }
       
      }
      

       

  }

  takePicture = async () => {
    if (this.state.snapTapped) {
      return;
    }
    this.setState({snapTapped: true});
    if (this.camera) {
      const options = { quality: 0.7, base64: false, width: 1000 };
      const data = await this.camera.takePictureAsync(options);
      console.log(data);

      //PLEASE CONSIDER USING THE BELOW CODE INSTEAD OF THE ONE AFTER
       /* const { images, imageIndex } = this.state;
    images[imageIndex] = data;

    this.setState({images: images, renderCamera: false});
    */

      this.setState((state, props) => {
        var images = state.images;
         images[state.imageIndex] = data;
        return {
          images,
          renderCamera: false,
          snapTapped: false
        }
      }   
      );
    }
    else {
      console.log("NO camera object");
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
     captureAudio={false}
    
   />
   <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
     <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.RNCapture}>
       {this.state.snapTapped ? <ActivityIndicator />
       :
     <Ionicons style={{alignSelf: 'center'}} name="ios-camera" size={35} color="green" />
       
       }
     </TouchableOpacity>
     {!this.state.snapTapped &&
        <TouchableOpacity onPress={() => this.setState({renderCamera: false})} style={styles.RNCapture}>
        <Ionicons style={{alignSelf: 'center'}} name="ios-close" size={35} color="red" />
        </TouchableOpacity>
     }
    
   </View>
 </View>
    )
   
  }


  renderAddImageBox(index, view, sampleImage) {
    return (
      <TouchableOpacity style={styles.addImageWrapper} onPress={() => this.setState({renderCamera: true, imageIndex: index})}>

      {this.state.images[index] !== undefined ?
        <View>
          <Text style={styles.tapTochangeText}>Tap on Image to Change</Text>
          <Image
            source={{ uri: this.state.images[index].uri }}
            style={styles.itemImage}
          />
        </View>

        : <View>
          {/* <Ionicons style={{alignSelf: 'center'}} name="ios-add-circle" size={25} color="orange" /> */}
          <Image
            source={sampleImage}
            style={styles.itemImage}
          />
          <Text style={{textAlign: 'center'}}>{view}</Text>
        </View>}

    </TouchableOpacity>
    )
  }

  renderContents() {
   return (
      
           <View style={styles.container}>
                <ScrollView>
                    <Text>Take Photos of your car as illustrated below, capture both sides of the vehicle, the front view and the back view. 
        Make sure the plate number is clearly visible. Tap on the sample photo to open your camera
        </Text>
        <View style={styles.itemImages}>
           {this.renderAddImageBox(0, "Left side view", R.images.car_left_side)}

           {this.renderAddImageBox(1, "Right side view", R.images.car_right_side)}
         </View>

         <View style={styles.itemImages}>
           {this.renderAddImageBox(2, "Front view", R.images.car_front)}

           {this.renderAddImageBox(3, "Back view", R.images.car_back)}
         </View>
         
         <TouchableHighlight onPress={ this.continue} style={{
            backgroundColor: "#494949",
            marginBottom: 20,
            width: "70%",
            borderRadius: 90,
            padding: 20,
            marginTop: 20,
            elevation: 4,
            alignSelf: "center",
          }}>
            <Text style={{textAlign: "center", color: '#fff'}}>Continue</Text>
          </TouchableHighlight>
                </ScrollView>

            </View>
       
   )
  }

  render() {
    const { loading, renderCamera } = this.state;
    return (
        <ScrollView>
          <View style={[styles.container, renderCamera && {justifyContent: 'center', height: Dimensions.get('window').height}]}>
            {loading ? <Loading text="Processing order..." /> :
            <>{renderCamera ? this.renderCamera() : this.renderContents()}</>
          }
          </View>
            
    </ScrollView>
    );
    
}
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    margin: 7
  },
  RNContainer: {
    flex: 1,
    flexDirection: 'column',
 
    justifyContent: 'center'
    
  },
  RNPreview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 200,

  },
  RNCapture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: (Dimensions.get('window').height - 200),


      },
      capture: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
       
      },

      itemImages: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5,

    },
    addImageWrapper : {
      flex: 1,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: 20,
        marginTop: 10,
        padding: 5,
        borderColor: '#dadada',
        borderWidth: 1,
        borderRadius: 10,
    },
    itemImageWrapper: {
    

    },
    tapTochangeText: {
     
      padding: 5,
      backgroundColor: '#fff',
      zIndex: 99,
      color: '#000',
      width: '100%',
      justifyContent: 'center',
      alignSelf: 'center',
      
      
    },
    itemImage: {
      flex: 1,
      width:  Dimensions.get('window').width - 40,
      height: null,
      resizeMode: "cover",
      borderRadius: 5,


    }
  
});

