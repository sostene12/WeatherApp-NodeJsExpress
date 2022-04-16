const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "./views");

// static middlewares
app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "./views/partials"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index", { title: "Weather App", name: "Ng Sostene" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Ng Sostene" });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ng Sostene",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide the address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        const temp = forecastData.main.feels_like - 273.15;
        const look = forecastData.weather[0].description;
        res.send({
          forecast: `It is ${temp} degrees and we have ${look} `,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    text: "The page you are looking for is not found",
    name: "Ng Sostene",
  });
});
