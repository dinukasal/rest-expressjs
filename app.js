var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var RateLimiter = require("rolling-rate-limiter");
var Redis = require("redis");
var redisClient = Redis.createClient(19266, 'xxxxxxxxxx.cloud.redislabs.com', { no_ready_check: true });
redisClient.auth('xxxxxxxxxxxxxxxxxxx')

var limiter = RateLimiter({
    redis: redisClient,
    namespace: "requestRateLimiter",
    interval: 5000,
    maxInInterval: 5,
    minDifference: 100
});

app.use(function (req, res, next) {

    // "req.ipAddress" could be replaced with any unique user identifier
    // Note that the limiter returns the number of miliseconds until an action
    // will be allowed.  Since 0 is falsey, this can be treated as a boolean.
    limiter(req.ipAddress, function (err, timeLeft) {
        if (err) {
            return res.status(500).send();
        } else if (timeLeft) {
            return res.status(429).send("You must wait " + timeLeft + " ms before you can make requests.");
        } else {
            return next();
        }
    });

});

expressLogging = require('express-logging'),
    logger = require('logops');

app.use(expressLogging(logger));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
