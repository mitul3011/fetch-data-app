const request = require('request');

const earthQuakeStatus = (data, callback) => {
    const geoCodeURL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=' + data.latitude + '&longitude=' + data.longitude + '&maxradiuskm=' + data.maxradiuskm + '&starttime=' + data.starttime + '&endtime=' + data.endtime + '&alertlevel=' + data.alertlevel + '&maxmagnitude=' + data.maxmagnitude;

    request({
        url: geoCodeURL, 
        json: true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to the earthquake services!', undefined);
        }else if(body.metadata.count === 0){
            callback('There is no ' + data.alertlevel + ' alert for entered location/Address in entered date range and entered radius.', undefined);
        }else{
            callback(undefined, body.features);
        }
    });
};

module.exports = earthQuakeStatus;