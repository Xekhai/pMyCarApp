
import BaseService from 'services/BaseService';
import axios from 'axios';


class FeedbackService extends BaseService{
    
    constructor() {
      super();
       
    }
 async sendFeedback(rating, notes) {
  
    const params = { rating, notes}
    try {
      return await axios.post('user/feedback', params);
    } catch(err) {
      return err;
    }
  }
}

export default new FeedbackService();
  