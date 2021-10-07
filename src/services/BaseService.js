
import axios from 'axios';

import constants from 'res/constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

const apiKey = "GJbrd3dmlJCeXYmja4QlOHp4NfSXj8XixhcrXsT7m8ELTFJBzUuK4xvgm1ARqMZb";
class BaseService {

    constructor() {
        this.init();
       
      
    }

    async init() {
        console.log("initializing base service...");
        let token = ""; 
        let user = await AsyncStorage.getItem('@user');

        if (user){
             user = JSON.parse(user);
             
             token = user.token.accessToken;
           }


        //set axios defaults
        axios.defaults.baseURL = constants.BASE_URL;
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['X-Authorization'] = apiKey;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        

    }

   

}

export default BaseService;