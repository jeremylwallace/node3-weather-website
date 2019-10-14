const request = require('request')

const forecast = (location, cb) => {
    const url = `https://api.darksky.net/forecast/53267eb56599fdb07a05b97b09d6ac8b/${location.latitude},${location.longitude}`

    request({url: url, json: true}, (error, response) => {
    if (error) {
        cb('Unable to connect to weather service.', undefined)
    } else if (response.body.error) {
        cb('Unable to find location', undefined)
    } else {
        cb(undefined, 'Weather for ' + location.location + ': ' + response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. The high today is expected to be ' + response.body.daily.data[0].temperatureHigh + ' degrees. The low is expected to be ' + response.body.daily.data[0].temperatureLow + ' degrees. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
    }
})
}

module.exports = forecast;