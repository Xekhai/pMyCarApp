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



import Loading from 'library/components/Loading'
import ClaimService from '../../services/ClaimService';
import { formatCurrency } from 'library/utils/StringUtils'
var moment = require('moment');


 export default class ClaimInfoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      claim: null,
    }
    this.params = this.props.route.params;
    console.log(this.params);
    this.getClaim();
  }

  getClaim = async () => {
   
    const req = await ClaimService.getClaim(this.params.claimId);
    const res = req.data; 
 
    if (res.success) {
        this.setState({loading: false, claim: res.claim});
    }
  }

  alertOfferUpdate = (status) => {
    if (status == 'ACCEPTED') {
        Alert.alert(
            "Accept Offer",
            `By accepting this offer, the amount ${formatCurrency(this.state.claim.adjusted_amount)} will be paid into the your account and this claim will be closed and marked as paid. Do you wish to continue ?`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "CANCEL"
              },
              { text: "ACCEPT", onPress: () => this.updateOffer('PAID') }
            ]
          );
    }

    else {
        Alert.alert(
            "Reject Offer",
            `If you reject this offer, our customer service agent will be in touch to discuss a compromising offer. Do you wish to continue ?`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "CANCEL"
              },
              { text: "REJECT", onPress: () => this.updateOffer(status) }
            ]
          );
    }
  }

  updateOffer = async (status) => {
    this.setState({loading:true});
    const req = await ClaimService.updateOffer(this.params.claimId, status);
    const res = req.data;
    if (res.success) {
        this.getClaim();//reload
    }
  }

  render() {

    const { loading, claim } = this.state;

    if (loading) {
         return (
             <View style={styles.container}>
                 <Loading text="Please wait.." />
             </View>
         )
    }
   return (
      
           <View style={styles.container}>
                <ScrollView>
                   <View style={styles.offerWrapper}>
                       <View style={styles.offerHeaderWrapper}>
                           {claim.status == 'PAID' ? <Text style={{textAlign: 'center'}}>PAID</Text> : <Text style={{textAlign: 'center'}}>OFFER</Text> }
                       </View>

                       <View style={styles.offerBody}>
                       {
                            claim.status == 'OFFER' || claim.status == 'PAID' ?
                            <Text style={styles.offerAmount}>{formatCurrency(claim.adjusted_amount)}</Text>
                            :
                            <Text style={{textAlign: 'center'}}>You have not been made an offer yet</Text>
                        }


                       </View>

                       {claim.status == 'OFFER'  && 
                       
                       <View style={styles.offerFooter}>

                           <TouchableOpacity style={[R.pallete.appButton, {width: 'auto', borderRadius: 5, marginRight: 15}]} onPress={() => this.alertOfferUpdate('OFFER REJECTED')}>
                               <Text style={{color: 'white'}}>REJECT</Text>
                           </TouchableOpacity>

                           <TouchableOpacity style={[R.pallete.appButton, {width: 'auto', backgroundColor: 'green', borderRadius: 5, marginLeft: 0,}]} onPress={() => this.alertOfferUpdate('ACCEPTED')}>
                               <Text style={{color: 'white'}}>ACCEPT</Text>
                           </TouchableOpacity>

                        </View>
                       }

                   </View>


                   <View style={styles.claimDetailsWrapper}>
                       <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
                           <View>
                               <Text style={styles.title}>CLAIM ON</Text>
                               <Text style={styles.info}>{claim.underwriting.info.vehicle_make} {claim.underwriting.info.vehicle_model}</Text>
                           </View>
                           <View>
                               <Text style={styles.title}>STATUS</Text>
                               <Text style={styles.info}>{claim.status}</Text>
                           </View>
                       </View>

                       <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                           <View>
                               <Text style={styles.title}>INSURANCE TYPE</Text>
                               <Text style={styles.info}>Vehicle, {claim.underwriting.cover_type}</Text>
                           </View>
                           <View>
                               <Text style={styles.title}>DATE FILED</Text>
                               <Text style={styles.info}>{moment(claim.created_at).format('DD MMM Y')}</Text>
                               
                           </View>
                       </View>

                       <View>
                           <Text style={styles.title}>DAMAGE PHOTOS</Text>

                        <View style={styles.damagePhotosWrapper}>
                           {claim.damage_photos.length && claim.damage_photos.map(damagePhoto => (
                               <Image source={{uri: R.constants.FILE_SERVER+damagePhoto.photo}} style={styles.damagePhoto}/>
                           ))}
                           </View>
                       </View>

                   </View>
                </ScrollView>

            </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    margin: 10,
  },
  offerWrapper: {
      borderWidth: 1,
      borderColor: R.colors.appPrimary,
      borderRadius: 6,
      padding: 10,
      marginBottom: 15
  },

  offerBody: {
  
  },

  offerAmount: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: R.colors.appPrimary,
  },

  offerFooter:{
      flexDirection: 'row',
      justifyContent: 'center'
  },

  title:{
      fontWeight: 'bold',
  },

  damagePhotosWrapper: {
      flexDirection: 'row',
  },
  damagePhoto: {
    height: 200,
    width:200,
    marginEnd: 7,
  }
  
});

