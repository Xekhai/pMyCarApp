
import BaseService from 'services/BaseService';
import axios from 'axios';


class UnderwritingService extends BaseService {

    constructor() {
        super();
    }

    async getUserPolicies() {
        try {
            return await axios.get('user/policies');

        }
        catch (err) {
            return err;
        }
    }

    async vehicleUnderwriting(vehicleMake, plateNumber, chasisNumber,
        engineNumber, vehicleColor, vehicleModel, yearOfMake, vehicleCategory,
        cover, imgs, premium, cost, lng, lat) {
        var formData = new FormData();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            timeout: 60 * 4
        };
        formData.append("vehicle_make", vehicleMake);
        formData.append("plate_number", plateNumber);
        formData.append("chasis_number", chasisNumber);
        formData.append("engine_number", engineNumber);
        formData.append("vehicle_color", vehicleColor);
        formData.append("vehicle_model", vehicleModel);
        formData.append("year_of_make", yearOfMake);
        formData.append("vehicle_category", vehicleCategory);
        formData.append("cover", cover);
        formData.append("premium", premium);
        formData.append("vehicle_cost", cost);
        formData.append("lng", lng);
        formData.append("lat", lat);
        formData.append('img_1', {
            uri: imgs[0],
            name: 'img_1.jpg',
            type: 'image/jpg'
        });
        formData.append('img_2', {
            uri: imgs[1],
            name: 'img_2.jpg',
            type: 'image/jpg'
        });
        formData.append('img_3', {
            uri: imgs[2],
            name: 'img_3.jpg',
            type: 'image/jpg'
        });
        formData.append('img_4', {
            uri: imgs[3],
            name: 'img_4.jpg',
            type: 'image/jpg'
        });

        try {
            return await axios.post('user/underwriting/vehicle', formData, config);
        } catch (err) {
            return err;
        }

    }

    
    async updatePayment(underwritingId) {
        try {
            return await axios.post('user/underwriting/payment/update', { underwriting_id: underwritingId });

        }
        catch (err) {
            return err;
        }
    }

   


}

export default new UnderwritingService();