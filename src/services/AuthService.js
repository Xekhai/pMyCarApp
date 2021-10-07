
import BaseService from 'services/BaseService';
import axios from 'axios';

class AuthService extends BaseService{
    
    constructor() {
        super();
    }

    async doLogin(email, password) {
        const data = {
            email: email,
            password: password
        }
          
        try {
           return await axios.post('user/login', data);
        }
        catch (err) {
            return err;

        }
    }

    async registerUser(newUserObj) {
        const formData = new FormData();
        formData.append('first_name', newUserObj.first_name);
        formData.append('last_name', newUserObj.last_name);
        formData.append('other_name', newUserObj.other_name);
        formData.append('email', newUserObj.email);
        formData.append('phone', newUserObj.phone);
        formData.append('password', newUserObj.password);
        formData.append('date_of_birth', newUserObj.date_of_birth);
        formData.append('state', newUserObj.state);
        formData.append('lga', newUserObj.city);

        try {
           return await axios.post('/user/register', formData);
        }
        catch (err) {
            return err;

        }
    }

    async checkEmailAndPhoneNumber(email, phoneNumber) {
        const data = {
            email: email,
            phone: phoneNumber
        }
          
        try {
           return await axios.post('/app/auth/check-email-and-phone', data);
        }
        catch (err) {
            return err;

        }
    }

    async sendPasswordResetCode(email) {
        const data = {
            email: email,
        }
          
        try {
           return await axios.post('user/password/reset/init', data);
        }
        catch (err) {
            return err;

        }
    }


    async resetPassword(email, password, resetCode) {
        const data = {
            email: email,
            password: password,
            reset_code: resetCode
        }
          
        try {
           return await axios.post('user/password/reset', data);
        }
        catch (err) {
            return err;

        }
    }

    

    
}

export default new AuthService();