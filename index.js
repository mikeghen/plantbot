// Platbot
// by Mike Ghen @mikeghen

var gpio = require('rpi-gpio');
var express = require('express');
var app = express();
var CronJob = require('cron').CronJob;
var isOn = true;

// Turn on the Light on start up
gpio.setup(16, gpio.DIR_OUT, start_lights);
function start_lights() { 
 // Set the cron job to turn the light on/off at 9:00am and 9:00pm
 var job = new CronJob('00 00 09 * * *', function() {
   // Cycle the light
   gpio.write(16, isOn, function(err) {
     if (err) throw err;
   });
   isOn = !isOn;
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


