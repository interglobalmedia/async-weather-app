const request = require('request');
const dotenv = require('dotenv').config();

const mapquest_key = process.env.MAPQUEST_KEY;
request({
    // this actually will NOT work
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${mapquest_key}&location=1301%20lombard%20street%20philadelphia`,
    // tells request that the data being sent back is json data and 
    // it will take the json string and convert it to an object for us
    // lets us skip a step. useful option
    json: true
}, (error, response, body) => {
    // add JSON.stringify() so that we can access body objects info
    // undefined is a placeholder for our objects filter
    // we need to add it in order to get to what we really want to access
    // and that is the third arg - space indentation
    console.log(JSON.stringify(response, undefined, 2));
})