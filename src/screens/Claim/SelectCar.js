import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
  } from 'react-native';

import R from 'res/R'
import UnderwritingService from 'services/UnderwritingService';


import Loading from 'library/components/Loading'

 export default class SelectCarScreen extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      items: null,
      loading: true,
      networkError: false,
      policies: [null],
    }
  }

  componentDidMount = async () => {
   this.getUserPolicies();

  }

  getUserPolicies = async () => {
    await this.setState({networkError: false});
   
    const req = await UnderwritingService.getUserPolicies();
    const res = req.data;

    if (res.success) {
      // console.log(res.policies);
      this.setState({policies: res.policies, loading: false});
    }
  }


  gotoMakeClaim = (policy) => {
      this.props.navigation.navigate('DriverDetailsScreen', {policy});
  }


  renderPolicies() {
    const { policies } = this.state;

    if (policies.length == 0) {
      return (
        <View style={[styles.container, {}]}>
          <Text style={{textAlign: 'center'}}>You have not insured any cars yets</Text>
          <TouchableOpacity onPress={ () => this.props.navigation.navigate('VehicleInfo')} style ={[R.pallete.appButton, {marginTop: 10}]}>
            <Text style={{textAlign: "center", color: '#fff'}}>insure your car now</Text>
          </TouchableOpacity>
        </View>
      )
    }
     
    
   else return (
     <View>

   { policies.map(policy => (
     <TouchableOpacity style={styles.card} onPress={()=>{this.gotoMakeClaim(policy)}}>
     <Image style={styles.cardImage} source={{uri: R.constants.FILE_SERVER+policy.details.photo_1}}/>
     <View style={styles.cardHeader}>
       <View>
         <Text style={styles.title}>{policy.details.vehicle_make}</Text>
         <Text style={styles.description}>{policy.details.vehicle_model}, {policy.cover_type}</Text>
         <View style={styles.timeContainer}>
           <Text style={styles.time}>{policy.status}</Text>
         </View>
       </View>
     </View>
    
   </TouchableOpacity>
   ))}
  
    
        </View>

   )
      
  }

  render() {
    if (this.state.networkError) {
      return (
        <NetworkErrorHandler retry={this.getOrders} />
      );
    }
   else return (
      
           <View style={styles.container}>
                <ScrollView>
                  {this.state.policies !== null ? this.renderPolicies() : <Loading text="Loading..." />}
                </ScrollView>

            </View>
       
   )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:"#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  }, 
  description:{
    fontSize:15,
    color:"#888",
    flex:1,
    marginTop:5,
    marginBottom:5,
  },
  time:{
    fontSize:13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width:25,
    height:25,
  },
  
  timeContainer:{
    flexDirection:'row'
  },
  
});   
