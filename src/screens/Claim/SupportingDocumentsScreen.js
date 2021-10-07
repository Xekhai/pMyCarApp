import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Geolocation from '@react-native-community/geolocation';
import { RNCamera } from 'react-native-camera';



import Loading from 'library/components/Loading'
import Permissions from 'react-native-permissions';
import R from 'res/R'




class SupportingDocumentsScreen extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
        docs: [
          {uri: null},
          {uri: null},
          {uri: null},
          {uri: null},
        ],
        docIndex: 0,
      loading: false,
      showAlert: false,
      photoPermission: null,
      cameraPermission: null,
      coords: null,
      renderCamera: false,
      capturing: false,
    }

    this.params = this.props.route.params.params;
    console.log(this.params);
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
    this.setState({capturing: true});
    if (this.camera) {
      const options = { quality: 0.7, base64: false, width: 1000 };

      const data = await this.camera.takePictureAsync(options);
    console.log("taking picture");

      console.log(data);
      this.setState((state, props) => {
        var docs = state.docs;
         docs[state.docIndex] = data;
        return {
          docs,
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
  

  continue = async () => {
    this.setState({loading: true});
    const documents = [
      this.state.docs[0].uri,
      this.state.docs[1].uri,
      this.state.docs[2].uri,
      this.state.docs[3].uri,
     ]
     let params = this.params;
     params.documents = documents;
     params.coords = {
       longitude: this.state.coords.longitude,
       latitude: this.state.coords.latitude
     }

     this.props.navigation.navigate('BankDetails', {params});

     
    await this.setState({loading: false});
   
   
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


  renderAddImageBox(index) {
    return (
      <TouchableOpacity style={styles.addImageWrapper} onPress={() => this.setState({renderCamera: true, docIndex: index})}>

      {this.state.docs[index].uri !== null ?
        <View>
          <Text style={styles.tapTochangeText}>Tap on Image to Change</Text>
          <Image
            source={{ uri: this.state.docs[index].uri }}
            style={styles.itemImage}
          />
        </View>

        : <View>
          <Ionicons style={{alignSelf: 'center'}} name="ios-add-circle" size={25} color="orange" />
          <Text>Add Document Image</Text>
        </View>}

    </TouchableOpacity>
    )
  }

  renderContents() {
    return (
      <View>
      <ScrollView>
                <View style={styles.infoCard}>
                <Text style={styles.cardText}>Upload all necessary documents (IF ANY) to back your claim, e.g Invoices, Receipts, Police report, etc. If there are no documents, tap 'Continue' Button below.</Text>

                </View>
              
            <View style={styles.itemImages}>
              {this.renderAddImageBox(0)}

              {this.renderAddImageBox(1)}
            </View>

            <View style={styles.itemImages}>
              {this.renderAddImageBox(2)}

              {this.renderAddImageBox(3)}
            </View>
            <TouchableHighlight onPress={()=>{this.continue()}} style ={[R.pallete.appButton, {backgroundColor: R.constants.appGreen}]}>
                        <Text style={{textAlign: "center", color: '#fff'}}>CONTINUE</Text>
                      </TouchableHighlight>
            
            
                </ScrollView>
            
              
        </View>
    )
  }

  render() {
      return (
      
           <View style={styles.container}>
             {this.state.loading ? <Loading text="Submitting claim..."/> :
                <View style={styles.container}>{this.state.renderCamera ? this.renderCamera() : this.renderContents()}</View>
   }
            </View>
       
   )
    
    
  }
}

export default SupportingDocumentsScreen;

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
      height: 200,
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
      height: 200,
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

