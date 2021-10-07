
import { StyleSheet } from 'react-native';
import R from 'res/R'

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#272727',

    },

    headerWrapper: {
        backgroundColor: '#272727',
        padding: 10,
        paddingTop: 80,
    },

    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        
        

    
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
     
      },
      sloganText: {
          color: 'white',
          textAlign: 'center',
          fontSize: 10
         
      },
      menuIcon: {
        marginLeft: 20,
        height: 30
      },

      carAvatar : {
        width: 160,
        height: 100,
        position: 'absolute',
        marginStart: 140,
        marginTop: 65
      },

      content: {
        padding: 10,
        backgroundColor: '#272727',

      },

      greetingTitle : {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fff',
        marginLeft: 34,
        marginBottom: 20,
        paddingTop: 40,

      },
      greetingSub : {
        marginLeft: 34,
        marginBottom: 50,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff'
      },

      actionItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width : '100%'
      },
      actionItem: {
        marginEnd: 10,
        width: 120,
        height: 120,
        borderColor: R.colors.appPrimary,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        justifyContent: 'space-evenly'
      },
      actionIcon: {
        color: R.colors.appSecondary,
        alignSelf: 'center'
       
      },
      actionTitle: {
        fontSize: 17,
        textAlign: 'center'
      },
     

   
  })

  export default styles;