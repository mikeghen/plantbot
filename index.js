// Platbot
// by Mike Ghen @mikeghen

var gpio = require('rpi-gpio');
var express = require('express');
var app = express();
var CronJob = require('cron').CronJob;

// Turn on the Light on start up
gpio.setup(16, gpio.DIR_OUT, start_lights);
function start_lights() { 
 // Set the cron job to turn the light on/off at 9:00am EST and 9:00pm EST
 var job = new CronJob('0 0 14 * * *', function() {
   // Cycle the light
   gpio.write(16, true, function(err) {
     if (err) throw err;
   });
  }, function () {
    /* This function is executed when the job stops */
  },
  true
 );
var job = new CronJob('0 0 2 * * *', function() {
   // Cycle the light
   gpio.write(16, false, function(err) {
     if (err) throw err;
   });
  }, function () {
    /* This function is executed when the job stops */
  },
  true
 );
}


// Display a webpage so we know the platbot is alive
app.get('/', function (req, res) {
  res.send('<h1>Plantbot</h1>');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


