
import { StyleSheet } from 'react-native';

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

  export default styles;