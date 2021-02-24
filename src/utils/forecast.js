//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (long, lat, callback) => {
    const latlon = lat + ", " + long 
    const url = 'http://api.weatherstack.com/current?access_key=1d94d179529d5b95f188877527c7a2b0&query=' + encodeURIComponent(latlon)+ '&units=s&hourly=1'

    request({ url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather service", undefined)
        }
        else if(body.error){
            callback(response.body.error.info, undefined)
        }
        else {
            callback(undefined,
                'Currently it is ' + body.current.temperature/10 + ' degrees Fahrenheit and it is ' + body.current.weather_descriptions[0] + '.'
                )
        }
    } )
}

module.exports = forecast