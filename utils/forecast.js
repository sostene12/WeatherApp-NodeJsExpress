const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=80a23852116f97e099a492c890c6b52e`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unavle to find location", undefined);
    } else {
      callback(undefined, body);
      // const temp = body.main.feels_like - 273.15;
      // const look = body.weather.description;
      // console.log(temp);
      // request(
      //   {
      //     url: `http://openweathermap.org/img/wn/10d@2x.png`,
      //     jon: true,
      //   },
      //   (error, response) => {
      //     if (error) {
      //       return console.log(error);
      //     }
      //     console.log(response.body);
      //   }
      // );
    }
  });
};

module.exports = forecast;
