const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https")

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
    var name = req.body.placeName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=5bfef1a0e9a166383e1628a36d863038&units=metric";
    https.get(url, function (response) {
        console.log(response);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>Your city temperature is  " + temp + "</h1>");
            res.write("<h3>Your city weather is " + weatherDescription + "</h3>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});
app.listen(3000, function () {
    console.log("hello");
});
