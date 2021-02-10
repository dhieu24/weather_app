const request = require("request");



const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +  ".json?limit=1&access_token=pk.eyJ1IjoiaGlldWRhbmdrMjciLCJhIjoiY2trbnQ3Nmt6MHg3dzJ4cnp5NWJhcGthbyJ9.JKNf4D6yfZRd8WCy9UV-nQ"
    request({url, json: true}, (error, {body}) => { 
        if(error) {
            callback("Cannot connect to the service", undefined);
        }else if(body.features.length === 0) {
            callback("Cannot specify the location", undefined);
        }else {
            callback(undefined, 
            {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            );
        }
    })

}

module.exports = geocode;


