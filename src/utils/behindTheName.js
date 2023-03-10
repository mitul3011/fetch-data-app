const request = require('request');

const behindTheName = (data, callback) => {
    const behindTheNameUrl = 'https://www.behindthename.com/api/lookup.json?name=' + data.name + '&key=' + process.env.behindthenameAPIKEY;

    request({
        url: behindTheNameUrl, 
        json: true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to the behind the name api services!', undefined);
        }else if(body.error_code){
            callback('Name could not be found!', undefined);
        }else{
            callback(undefined, body);
        }
    });
};

module.exports = behindTheName;