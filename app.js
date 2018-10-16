var createError = require('http-errors');
var express = require('express');
var path = require('path');
var request = require('request');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = process.env.PORT || 5000;
var weatherKey = process.env.WEATHER_KEY;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/weather/:city', function(req, res, next) {
  let city = req.params.city;
  request(`https://api.openweathermap.org/data/2.5/weather?appid=${weatherKey}&q=${city}&units=Imperial`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      res.json(data);
    }
  });
});

app.get('/quote/:firstName&:lastName?', function(req, res, next) {
  let firstName = (req.params.firstName) ? req.params.firstName : "";
  let lastName = (req.params.lastName) ? req.params.lastName : "";
  console.log(firstName, lastName);
  request(`https://api.icndb.com/jokes/random?limitTo=[nerdy]&firstName=${firstName}&lastName=${lastName}&escape=javascript`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      res.json(data);
    }
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port);

console.log(`Server listening on ${port}`);
