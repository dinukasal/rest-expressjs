var express = require("express");
var bodyParser = require("body-parser");
var app = express();

expressLogging = require('express-logging'),
    logger = require('logops');

app.use(expressLogging(logger));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
