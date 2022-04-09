import axios from 'axios'
const WEATHER_REST_API_URL = 'https://mdp-weather-api.herokuapp.com/api';
const proxy_url = 'https://cors-proxy420.herokuapp.com/';
const WEATHER_CLASSIFY_API_URL = proxy_url + 'https://ensampleapi.herokuapp.com/api/classify/';
const WEATHER_PREDICT_API_URL = 'https://simple-ml-deploy.herokuapp.com/api/v2/6'
const CHATBOT_API_URL = 'https://simple-ml-deploy.herokuapp.com/api/v3/'

class UserService {
    getLatestRecord() {
        return axios.get(WEATHER_REST_API_URL + '/getLatest');
    }
    getRecordList() {
        return axios.get(WEATHER_REST_API_URL + '/getDiagramRecords');
    }
    getPredictNextHour() {
        return axios.get(WEATHER_PREDICT_API_URL);
    }
    ensampleClassify(temp, speed, pres, humid, vis, clou) {
        let param_json = JSON.stringify({
            "temperature": temp,
            "wind_speed": speed,
            "pressure": pres,
            "humidity": humid,
            "vis_km": vis,
            "cloud": clou
        });
        return fetch(WEATHER_CLASSIFY_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: param_json,
                redirect: 'follow'
            })
            .then(res => res.json())
            .then(response => {
                // console.log('Success:', JSON.stringify(response));
                return response;
            })
            .catch(error => console.error('Error here:', error))
    }
    async getChatbotReponse(user_input) {
        let temp = 28;
        let humidity = 70;
        let wind_speed = 5.5;
        let wt_cond = 'Sunny';
        let time = '13:00';
        let place = 'Ho Chi Minh City';
        let item = 'something';
        return axios
            .post(CHATBOT_API_URL, {"input": user_input})
            .then(response => {
                let raw_bot_response = response.data.response;
                console.log(raw_bot_response);
                let bot_response = raw_bot_response;

                // need to get the place and time in order to determine temperature, humidity
                // weather condition
                let place_regexp = RegExp("(?<=%%)([A-Za-z ]+)(?=%%)");
                if (raw_bot_response.match(place_regexp) != null) {
                    place = raw_bot_response.match(place_regexp)[0];
                }

                let time_regexp = RegExp("(?<=@@)([A-Za-z0-9 ]+)(?=@@)");
                if (raw_bot_response.match(time_regexp) != null) {
                    time = raw_bot_response.match(time_regexp)[0];
                }

                console.log(`Place: ${place}, Time: ${time}`);
                // do something to get all the data or just a few neccessary stuff for user that

                // const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
                // axios
                //     .get(url)
                //     .then((response) => {
                //         data = response.data;
                //         console.log(response.data);
                //     })

                // ask about different feature such as temp, humidity, wind speed and the
                // response from chatbot is !!feature!! $$value$$
                let feature_regexp = RegExp("(?<=!!)([A-Za-z0-9 ]+)(?=!!)");
                let feature = "";
                if (raw_bot_response.match(feature_regexp) != null) {
                    feature = raw_bot_response.match(feature_regexp)[0];
                }
                let value = 0;
                if (feature === "temperature") {
                    value = temp;
                } else if (feature === "humidity") {
                    value = humidity;
                } else if (feature === "wind speed") {
                    value = wind_speed;
                }

                bot_response = bot_response
                    .replaceAll("$$wt_cond$$", wt_cond)
                    .replaceAll("$$item$$", item)
                    .replaceAll("$$temp$$", temp)
                    .replaceAll("$$value$$", value)
                    .replaceAll("@@", "")
                    .replaceAll("!!", "")
                    .replaceAll("%%", "")
                    .replaceAll("$$", "");
                console.log(bot_response);

                return bot_response
            });
    }
}
export default new UserService();