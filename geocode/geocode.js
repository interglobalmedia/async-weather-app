const request = require('request');
const dotenv = require('dotenv').config();

const geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const mapquest_key = process.env.MAPQUEST_KEY;
    const urlString = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapquest_key}&location=${encodedAddress}`;
    request({
        // this actually will NOT work
        url: urlString,
        // tells request that the data being sent back is json data and 
        // it will take the json string and convert it to an object for us
        // lets us skip a step. useful option
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to mapquest api!');
        } else {
            try {
                if (encodedAddress === '') {
                    callback('No result found');
                } else {
                    callback(undefined, {
                        address: (body.results[0].providedLocation.location).toUpperCase() + ' ' + body.results[0].locations[0].adminArea3 + ' ' + body.results[0].locations[0].postalCode + ' ' + body.results[0].locations[0].adminArea1,
                        latitude: `${body.results[0].locations[0].displayLatLng.lat}`,
                        longitude: `${body.results[0].locations[0].displayLatLng.lng}`
                    });
                    // add JSON.stringify() so that we can access body objects info
                    // undefined is a placeholder for our objects filter
                    // we need to add it in order to get to what we really want to access
                    // and that is the third arg - space indentation
                }
            } catch (e) {
                console.log(JSON.stringify(body, undefined, 2))
            }
        }
    })
}

module.exports = {
    geocodeAddress
}