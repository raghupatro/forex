const express = require("express");
const bodyParser = require("body-parser");

const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var toCurrency = req.body.toCurrency;
  var fromCurrency = req.body.fromCurrency;

  var options = {
    url: "https://api.exchangeratesapi.io/latest",
    method: "GET",
    qs: {
      base: fromCurrency
    }
  };

  //instead of taking just a url the request function
  //takes a js object called options which has additional
  //parameters for the get request

  request(options, function(error, response, body) {
    var data = JSON.parse(body);
    if (toCurrency === fromCurrency) {
      value = 1;
    } else {
      if (data.base !== "INR" && toCurrency === "INR") {
        value = data.rates.INR;
      }

      if (data.base !== "USD" && toCurrency === "USD") {
        value = data.rates.USD;
      }

      if (data.base !== "EUR" && toCurrency === "EUR") {
        value = data.rates.EUR;
      }

      if (data.base !== "GBP" && toCurrency === "GBP") {
        value = data.rates.GBP;
      }
    }
    res.send(
      "<h1>The value of " +
        fromCurrency +
        " is " +
        value +
        " " +
        toCurrency +
        "</h1>"
    );
    value = 0;
  });
});

app.listen(3000, function() {
  console.log("server started at port 3000");
});
