import axios from 'axios'
const WEATHER_REST_API_URL = 'https://mdp-weather-api.herokuapp.com/api'
const WEATHER_CLASSIFY_API_URL = 'https://simple-ml-deploy.herokuapp.com/api/v1/'
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
    async ensampleClassify(temp, speed, pres, humid, vis, clou) {
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

    async _chatbotHelper(place) {
        if (localStorage.getItem(place) == null) {
            if (place === "Ho Chi Minh City") {
                let data = null;
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
                return axios
                    .get(url)
                    .then(async(response) => {
                        data = response.data;
                        return this
                            .getLatestRecord()
                            .then(async(response) => {
                                let humidity = response.data.humidity;
                                let pressure = data.main.pressure;
                                let wind_speed = response.data.windSpeed;
                                let temp = response.data.temperature;
                                let visibility = data.visibility;
                                let clouds = data.clouds.all;

                                const result = await this.ensampleClassify(temp, wind_speed, pressure, humidity, visibility, clouds);
                                localStorage.setItem(place, JSON.stringify({"temp": temp, "humidity": humidity, "wind_speed": wind_speed, "classify": result.Condition}));
                                //DEBUG console.log(localStorage);
                                return data;
                            })
                            .catch((err) => {
                                console.err(err);
                            });
                    })

            } else {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
                return axios
                    .get(url)
                    .then(async(response) => {
                        let data = response.data;
                        let humidity = data.main.humidity;
                        let pressure = data.main.pressure;
                        let wind_speed = data.wind.speed;
                        let temp = data.main.feels_like;
                        let visibility = data.visibility;
                        let clouds = data.clouds.all;

                        const result = await this.ensampleClassify(temp, wind_speed, pressure, humidity, visibility, clouds);
                        localStorage.setItem(place, JSON.stringify({"temp": temp, "humidity": humidity, "wind_speed": wind_speed, "classify": result.Condition}));
                        //DEBUG console.log(localStorage);
                        return data;
                    })
            }
        }
    }

    async getChatbotReponse(user_input) {
        return axios
            .post(CHATBOT_API_URL, {"input": user_input})
            .then(async(response) => {
                let raw_bot_response = response.data.response;
                //DEBUG console.log(raw_bot_response);
                let place = null;
                let time = null;
                let bot_response = raw_bot_response;
                if (raw_bot_response.includes("%") || raw_bot_response.includes("$")) {
                    place = 'Ho Chi Minh City';
                    time = 'now';
                }

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

                //DEBUG console.log(`Place: ${place}, Time: ${time}`);
                // do something to get all the data or just a few neccessary stuff for user that
                if (place != null) {
                    await this._chatbotHelper(place);
                    let data = JSON.parse(localStorage.getItem(place))
                    let temp = data["temp"]
                    let humidity = data["humidity"]
                    let wt_cond = data["classify"]
                    let item = null
                    let wind_speed = data["wind_speed"]
                    if (wt_cond === 'Cloud') {
                        item = 'jacket'
                    } else if (wt_cond === 'Sunny') {
                        item = 'sunglasses'
                    } else if (wt_cond === 'Rainy') {
                        item = 'umbrella'
                    } else if (wt_cond === 'Clear') {
                        item = 'bottle of water'
                    }
                    // ask about different feature such as temp, humidity, wind speed and the
                    // response from chatbot is !!feature!! $$value$$
                    let feature_regexp = RegExp("(?<=!!)([A-Za-z0-9 ]+)(?=!!)")
                    let feature = ""
                    if (raw_bot_response.match(feature_regexp) != null) {
                        feature = raw_bot_response.match(feature_regexp)[0]
                    }
                    let value = 0
                    if (feature === "temperature") {
                        value = temp
                    } else if (feature === "humidity") {
                        value = humidity
                    } else if (feature === "wind speed") {
                        value = wind_speed
                    }

                    bot_response = bot_response
                        .replaceAll("$$wt_cond$$", wt_cond)
                        .replaceAll("$$item$$", item)
                        .replaceAll("$$temp$$", temp)
                        .replaceAll("$$value$$", value)
                        .replaceAll("@@", "")
                        .replaceAll("!!", "")
                        .replaceAll("%%", "")
                        .replaceAll("$$", "")
                    //DEBUG console.log(bot_response)
                    return bot_response
                }
            });
    }
}
export default new UserService();