import React, { Component } from 'react';
import {
  StyleSheet,
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




 export default class DamagePhotosScreen extends Component {
  static navigationOptions = {
     title: 'Photos of Damages',

   };

  constructor(props) {
    super(props);
    this.state = {
        images: [
            {uri: null},
            {uri: null},
            {uri: null},
            {uri: null}
        ],
        imageIndex: 0,
      loading: false,
      showAlert: false,
      photoPermission: null,
      cameraPermission: null,
      renderCamera: false,
      capturing: false
    }

    this.params = this.props.navigation.getParam('params');
    console.log(this.params);
  }

  componentDidMount() {
    this._checkCameraAndPhotosPermission();
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
 

  // …


  
  takePicture = async () => {
    if (this.state.capturing) {
      return;
    }
    this.setState({capturing: true})
    if (this.camera) {
      const options = { quality: 0.7, base64: false, width: 1000 };
      const data = await this.camera.takePictureAsync(options);
      console.log(data);
      this.setState((state, props) => {
        var images = state.images;
         images[state.imageIndex] = data;
        return {
          images: images,
          renderCamera: false,
          capturing: false
        }
      }   
      );
    }
    else {
      console.log("NO camera object");
    }
  }

  gotoSupportingDocs = async () => {
      // let allImagesProvided = true
      // this.state.images.forEach(image => {
      //     if (image.uri === null) allImagesProvided = false
      // });
      // if (!allImagesProvided) {
      //     Alert.alert("You need to upload all four photos to continue, use different angles");
      //     return;
      // }
    const damagePhotos = [
      this.state.images[0].uri,
      this.state.images[1].uri,
      this.state.images[2].uri,
      this.state.images[3].uri,
     ]
     const p = this.params;
     p.damagePhotos = damagePhotos;
     p.type = 'claim';
     this.props.navigation.navigate('RecordScreen', {params: p});
  }
 

  renderAddImageBox(index) {
    return (
      <TouchableOpacity style={styles.addImageWrapper} onPress={() => this.setState({renderCamera: true, imageIndex: index})}>

      {this.state.images[index].uri !== null ?
        <View>
          <Text style={styles.tapTochangeText}>Tap on Image to Change</Text>
          <Image
            source={{ uri: this.state.images[index].uri }}
            style={styles.itemImage}
          />
        </View>

        : <View>
          <Ionicons style={{alignSelf: 'center'}} name="ios-add-circle" size={25} color="orange" />
          <Text>Add Damage Image</Text>
        </View>}

    </TouchableOpacity>
    )
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
                <Text style={styles.cardText}>Upload photos of damages if you have any. NOTE claims with photos will be processed faster</Text>

                </View>
              
            <View style={styles.itemImages}>
              {this.renderAddImageBox(0)}

              {this.renderAddImageBox(1)}
            </View>

            <View style={styles.itemImages}>
              {this.renderAddImageBox(2)}

              {this.renderAddImageBox(3)}
            </View>
            
            <TouchableHighlight onPress={this.gotoSupportingDocs} style ={[R.pallete.appButton, {backgroundColor: R.constants.appGreen}]}>
                        <Text style={{textAlign: "center", color: '#fff'}}>CONTINUE</Text>
                      </TouchableHighlight>
                </ScrollView>
                
               
    )
  }


  render() {
   return (
        <View style={styles.container}>{this.state.renderCamera ? this.renderCamera() : this.renderContents()}</View>
      
           
       
   )
  }
}

const styles = StyleSheet.create({
  RNContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    height: 500,
  },
  RNPreview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  RNCapture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  container: {
    flex: 1,
  },
  addImageWrapper : {
    flex: 1,
      height: 420,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      marginRight: 3,
      marginBottom: 6,
      borderColor: '#ccc',
        borderWidth: 3,
        borderStyle: 'dotted',
        borderRadius: 10,
  },
  itemImageWrapper: {
    position: 'relative',

  },
  tapTochangeText: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
    backgroundColor: '#fff',
    zIndex: 99,
    marginRight: 5,
    color: '#000',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    
    
  },
  itemImage: {
      flex: 1,
      height: 420,
      width: 400,
      resizeMode: 'cover',

  },
  infoCard : {
    backgroundColor: 'purple',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: "100",
  },
  
});