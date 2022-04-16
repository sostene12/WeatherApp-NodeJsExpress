const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic29zdGVuZTEyIiwiYSI6ImNsMjAwcW9oeDBydGIzanFvZjZ3NndhMzMifQ.V5Kes1g_GLdp_VzwphC57A`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the Location services !", undefined);
    } else if (body.features.length == 0) {
      callback("unable to find location. Try another Search.", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
