import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'
import UserService from './services/UserService';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const coordinatesEl = document.getElementById('coordinates');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const recommendEl = document.getElementById('recommend');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0' + minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

var input = document.getElementById("input");
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
        let location = document.getElementById("input").value;
        let text = location.toLowerCase();
        if (text === "ho chi minh" || text === "sai gon" || text ==="ho chi minh city"){
            let data = null;
            location = "Ho Chi Minh";
            text = "";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
            axios.get(url).then((response) => {
                data = response.data;
                console.log(response.data)
            })
            UserService.getLatestRecord().then((response)=>{
                console.log(response);
                data.main.humidity   = response.data.humidity;
                data.main.feels_like = response.data.temperature;
                data.wind.speed      = response.data.windSpeed;
                // console.log(data);
                showWeatherData(data);
                predictWeatherData2(data);
            }).catch((err)=>{
                console.log(err);
            });
            location='';
            document.getElementById("input").value="";
        }
        else{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
            axios.get(url).then((response) => {
                let data=response.data;
                console.log(response.data)
                showWeatherData(data);
                predictWeatherData2(data);
            })
            location='';
            document.getElementById("input").value="";
        }
    }
});

function predictWeatherData2 (obj) {
        let latitude = obj.coord.lat;
        let longitude = obj.coord.lon;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            // console.log(data)
            predictWeatherData(data);
        })
}

function showWeatherData (data){
    let humidity = data.main.humidity;
    let pressure = data.main.pressure;
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    let wind_speed = data.wind.speed;
    let feels_like = data.main.feels_like;
    let visibility = data.visibility;
    let clouds = data.clouds.all;
    countryEl.innerHTML = data.sys.country;
    coordinatesEl.innerHTML = data.coord.lat + 'N ' + data.coord.lon + 'E'
    timezone.innerHTML = data.name;
    recommendEl.innerHTML = `
    <div className="classify">
        <p>Classify</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-cloud-fill" viewBox="0 0 16 16">
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
        </svg>
    </div>
    <div className="object">
        <p>Object</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-umbrella-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 0a.5.5 0 0 1 .5.5v.514C12.625 1.238 16 4.22 16 8c0 0 0 .5-.5.5-.149 0-.352-.145-.352-.145l-.004-.004-.025-.023a3.484 3.484 0 0 0-.555-.394A3.166 3.166 0 0 0 13 7.5c-.638 0-1.178.213-1.564.434a3.484 3.484 0 0 0-.555.394l-.025.023-.003.003s-.204.146-.353.146-.352-.145-.352-.145l-.004-.004-.025-.023a3.484 3.484 0 0 0-.555-.394 3.3 3.3 0 0 0-1.064-.39V13.5H8h.5v.039l-.005.083a2.958 2.958 0 0 1-.298 1.102 2.257 2.257 0 0 1-.763.88C7.06 15.851 6.587 16 6 16s-1.061-.148-1.434-.396a2.255 2.255 0 0 1-.763-.88 2.958 2.958 0 0 1-.302-1.185v-.025l-.001-.009v-.003s0-.002.5-.002h-.5V13a.5.5 0 0 1 1 0v.506l.003.044a1.958 1.958 0 0 0 .195.726c.095.191.23.367.423.495.19.127.466.229.879.229s.689-.102.879-.229c.193-.128.328-.304.424-.495a1.958 1.958 0 0 0 .197-.77V7.544a3.3 3.3 0 0 0-1.064.39 3.482 3.482 0 0 0-.58.417l-.004.004S5.65 8.5 5.5 8.5c-.149 0-.352-.145-.352-.145l-.004-.004a3.482 3.482 0 0 0-.58-.417A3.166 3.166 0 0 0 3 7.5c-.638 0-1.177.213-1.564.434a3.482 3.482 0 0 0-.58.417l-.004.004S.65 8.5.5 8.5C0 8.5 0 8 0 8c0-3.78 3.375-6.762 7.5-6.986V.5A.5.5 0 0 1 8 0z"/>
        </svg>
    </div>
    <div className="Further">
        <p>Further</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-bicycle" viewBox="0 0 16 16">
            <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5zm1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139L5.5 6.943zM8 9.057 9.598 6.5H6.402L8 9.057zM4.937 9.5a1.997 1.997 0 0 0-.487-.877l-.548.877h1.035zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765l1.027-1.643zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53L11.55 8.623z"/>
        </svg>
    </div>`;

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Feelslike</div>
        <div>${feels_like} &#176;C</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed*3600/1000} kph</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure} mb</div>
    </div>
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Visibility</div>
        <div>${visibility/1000} km</div>
    </div>
    <div class="weather-item">
        <div>Clouds</div>
        <div>${clouds} %</div>
    </div>
    

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    `;
}

function predictWeatherData(data){
    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx === 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })
    weatherForecastEl.innerHTML = otherDayForcast;
}
