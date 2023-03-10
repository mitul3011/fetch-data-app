const request = require('request');

const getWeatherInfo = (latitude, longitude, callback) => {
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + latitude + '&lon=' + longitude + '&appid=' + process.env.OpenweathermapAPIKEY;

    request({
        url: weatherUrl, 
        json: true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to the rick and morty api services!', undefined);
        }else if(body.message){
            callback('Enter valid location name!', undefined);
        }else{
            callback(undefined, body);
        }
    });
};

module.exports = getWeatherInfo;