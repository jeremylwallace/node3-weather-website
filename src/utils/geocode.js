const request = require('request')

const geocode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamVyZW15bHdhbGxhY2UiLCJhIjoiY2sxcGl6aXhzMHhodzNnbWk0bjN5bTU3diJ9.wiIbMhnwQwe9tXuYfPK9hw&limit=1`

    request({url: url, json: true}, (error, response) => {
        if (error || response.body.message) {
            cb('Unable to connect to location services!', undefined);
        } else if (response.body.features.length === 0) {
            cb('Unable to find location. Try another search', undefined);
        } else {
            cb(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;