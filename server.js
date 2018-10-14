const yargs = require('yargs');

const geocode = require('./geocode/geocode');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});

// const request = require('request');

// const urlString = 'https://api.darksky.net/forecast/66bfaf56d4739498936cb270e0ceef70/40.745614,-73.977916';

// request({
//     url: urlString,
//     json: true
// }, (error, response, body) => {
//     console.log(`Temperature: ${body.currently.temperature}`)
//         // console.log(JSON.stringify(body, undefined, 2))
// })