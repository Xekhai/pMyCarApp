
import BaseService from 'services/BaseService';
import axios from 'axios';


class ClaimService extends BaseService {

  constructor() {
    super();

  }
  async fileClaim(params) {
    console.log(params);
    var formData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      timeout: 60 * 5
    };
    formData.append("underwriting_id", params.underwriting_id);

    formData.append("name_of_driver", params.driverFullname);
    formData.append("address_of_driver", params.driverAddress);
    formData.append("phone_of_driver", params.driverPhone);
    formData.append("driver_rel_to_insured", params.driversRelToInsured);
    formData.append("drivers_licence", params.driversLicence);
    formData.append("driver_type", params.driverType);

    formData.append("date_of_accident", params.date);
    formData.append("time_of_accident", params.time);

    formData.append("location", params.location);
    formData.append("narration", params.narration);
    formData.append("nature_of_damage", params.natureOfDamage);

    formData.append("third_party_name_of_driver", params.thirdPartyFullname);
    formData.append("third_party_address_of_driver", params.thirdPartyAddress);
    formData.append("third_pary_phone_of_driver", params.thirdPartyPhone);
    formData.append("third_party_drivers_licence", params.thirdPartyDriversLicence);

    formData.append("lng", params.coords.longitude);
    formData.append("lat", params.coords.latitude);
    formData.append("bank_name", params.bankName);
    formData.append("bank_account_name", params.accountName);
    formData.append("bank_account_number", params.accountNumber);
    formData.append("bank_account_type", params.accountType);
  


    if (params.insuredDamageImages) {
      
      params.insuredDamageImages.forEach((damageImage, index) => {


          formData.append(`insured_damage_img_${index}`, {
            uri: damageImage.uri,
            name: `damage_img_${index}.jpg`,
            type: 'image/jpg'
          });

          formData.append(`insured_damage_img_${index}_part_id`, damageImage.vehiclePartId);
      });
    }


    if (params.thirdPartyDamageImages) {
      
      params.thirdPartyDamageImages.forEach((damageImage, index) => {


          formData.append(`third_party_damage_img_${index}`, {
            uri: damageImage.uri,
            name: `third_party_damage_img_${index}.jpg`,
            type: 'image/jpg'
          });

          formData.append(`third_party_damage_img_${index}_part_id`, damageImage.vehiclePartId);
      });
    }

    

    if (params.documents[0] != null) {
      formData.append('doc_1', {
        uri: params.documents[0],
        name: 'doc_1.jpg',
        type: 'image/jpg'
      });
    }

    if (params.documents[1] != null) {
      formData.append('doc_2', {
        uri: params.documents[1],
        name: 'doc_2.jpg',
        type: 'image/jpg'
      });
    }

    if (params.documents[2] != null) {
      formData.append('doc_3', {
        uri: params.documents[2],
        name: 'doc_3.jpg',
        type: 'image/jpg'
      });
    }
    if (params.documents[3] != null) {
      formData.append('doc_4', {
        uri: params.documents[3],
        name: 'doc_4.jpg',
        type: 'image/jpg'
      });
    }

    try {
      console.log("Sending claim request to server...");
      return await axios.post('user/claim', formData, config);
    } catch (err) {
      return err;
    }

  }



  async getUserClaims() {
    try {

      return await axios.get('user/claims');

    }
    catch (err) {
      return err;
    }

  }

  async getClaim(claimId) {
    try {

      return await axios.get('user/claim?id='+claimId);

    }
    catch (err) {
      return err;
    }

  }

  async updateOffer(claimId, status) {
    try {

      return await axios.post('user/claim/update', {claim_id: claimId, status});

    }
    catch (err) {
      return err;
    }

  }


}

export default new ClaimService();