/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

	

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv

var cfenv = require('cfenv');
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var express = require('express');
// create a new express server
var app = express();


// serve the files out of ./views as our main files
app.use(express.static(__dirname + '/views'));


//this is the 
app.get('/', function(req, res){
  	res.render('hiscores.jade', {title: 'Hiscores'});
  	console.log('What even');
});

//this is where will retrieve the db data
app.post('/check', function(req, res) {
	//res.render('hiscores.jade', {title: 'scores'});
	res.send('This is the Check page');
	
});

//this is where will retrieve the db data
app.get('/hi', function(req, res) {
	//res.render('hiscores.jade', {title: 'scores'});
	res.send('HI there');
	
});

//ths i 
app.get('/play', function(req, res){	
    res.render('main.jade', {title: 'Guess the Word'});
	//res.send('nothing works');
	
	
	
});



// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
console.log('What just');







