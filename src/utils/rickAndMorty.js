const request = require('request');

const rickAndMortyData = (data, callback) => {
    const rickMortyApiUrl = 'https://rickandmortyapi.com/api/character/?name=' + data.name + '&species=' + data.species;

    request({
        url: rickMortyApiUrl, 
        json: true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to the rick and morty api services!', undefined);
        }else if(body.error || body.info.count === 0 || body.info.count > 1){
            callback('Enter Full Name of character or enter a valid name!', undefined);
        }else{
            callback(undefined, body.results);
        }
    });
};

module.exports = rickAndMortyData;