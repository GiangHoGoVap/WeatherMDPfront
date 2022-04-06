import axios from 'axios'
const WEATHER_REST_API_URL = 'https://mdp-weather-api.herokuapp.com/api';
const WEATHER_CLASSIFY_API_URL = 'https://cors-proxy420.herokuapp.com/https://ensampleapi.herokuapp.com/api/classify/'; 
const WEATHER_PREDICT_API_URL ='https://simple-ml-deploy.herokuapp.com/api/v2/6'
class UserService{
    getLatestRecord(){
        return axios.get(WEATHER_REST_API_URL + '/getLatest');    
    }
    getRecordList(){
        return axios.get(WEATHER_REST_API_URL + '/getDiagramRecords'); 
    }
    getPredictNextHour(){
        return axios.get(WEATHER_PREDICT_API_URL);
    }
    ensampleClassify(temp,speed,pres,humid,vis,clou){
        let param_json = JSON.stringify({
            "temperature": temp,
            "wind_speed": speed,
            "pressure": pres,
            "humidity": humid,
            "vis_km": vis,
            "cloud": clou,
        });
        return fetch(WEATHER_CLASSIFY_API_URL,  {
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: param_json,
                redirect: 'follow'
            })
            .then(res =>  res.json())
            .then(response => {
                // console.log('Success:', JSON.stringify(response));
                return response;
            })
            .catch(error => console.error('Error here:', error))
    }
}
export default new UserService();