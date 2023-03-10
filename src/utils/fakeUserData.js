const request = require('request');

const generateFakeUserData = (data, callback) => {
    let fakerApiUrl = 'https://fakerapi.it/api/v1/custom?_quantity=' + data._quantity;

    let i = 1;

    for (const key in data) {
        if(key === '_quantity')
            continue;

        fakerApiUrl += '&customfield' + i + '=' + data[key];
        i++;
    }

    request({
        url: fakerApiUrl,
        json: true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to the fake data generator services!', undefined);
        }else{
            callback(undefined, body.data);
        }
    });
};

module.exports = generateFakeUserData;