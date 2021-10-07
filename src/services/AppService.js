
import BaseService from 'services/BaseService';
import axios from 'axios';

class AppService extends BaseService{
    
    constructor() {
        super()
      
    }

    async getBanks() {
      
  
        try {
           return await axios.get('/app/banks');
        }
        catch (err) {
            return err;

        }
    }

    async getCarParts() {
  
        try {
           return await axios.get('/app/cars/parts');
        }
        catch (err) {
            return err;

        }
    }
    async getSetting(setting) {
      
  
        try {
           return await axios.get('/app/setting?setting='+setting);
        }
        catch (err) {
            return err;

        }
    }

   

    
}

export default new AppService();