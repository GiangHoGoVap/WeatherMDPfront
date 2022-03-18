import axios from 'axios'
const WEATHER_REST_API_URL = 'https://mdp-weather-api.herokuapp.com/api';
class UserService{
    getLatestRecord(){
        return axios.get(WEATHER_REST_API_URL + '/getLatest');    
    }
}
export default new UserService();