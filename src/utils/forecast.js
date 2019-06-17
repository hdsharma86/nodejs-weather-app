const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/31912d96c87e549209d8d6852eac60eb/' + latitude + ',' + longitude;
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to forecast services!', undefined);
        } else if (body.error) {
            callback('Unable to find forecast data, try again later!', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently '+ body.currently.temperature +' degree out. There is a '+body.currently.precipProbability+' % chance of rain.');
        }
    });
};

module.exports = forecast;