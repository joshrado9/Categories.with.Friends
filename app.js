/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
var express = require('express');
	

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();


// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/views'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.get('/', function(req, res){
  res.render('hiscores.jade', {title: 'Hiscores'});
});

app.get('/play', function(req, res){	
  res.render('main.jade', {title: 'Guess the Word'});
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});