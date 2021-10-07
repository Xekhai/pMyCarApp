
import BaseService from 'services/BaseService';
import axios from 'axios';


class CarService extends BaseService{
    
    constructor() {
      super();
       
    }
    async getCarMakes( ) {
        
      try {
        return await axios.get('/app/cars/makes');
         
      }
      catch (err) {
          return err;

      }
  }

  
}

export default new CarService();