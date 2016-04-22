/**
 * Server for the GuessTheWord app
 */

var express = require('express');
var app = express();
var http = require('http');

var host = "localhost";
var port = 3030;

var cloudant = {
	url : "https://04fea742-a58c-4952-9d62-e7a493b49f95-bluemix.cloudant.com/categories_with_friends_hiscores/_all_docs" 
};
if (process.env.hasOwnProperty("VCAP_SERVICES")) {
	var env = JSON.parse(proces.env.VCAP_SERVICES);
	var host = process.env.VCAP_APP_HOST;
	var port = process.env.VCAP_APP_PORT;

	cloudant = env['cloudantNoSQLDB'][0].credentials;
}
var nano = require('nano')(cloudant.url);
var db = nano.db.use('categories_with_friends_hiscores');
// Set path to Jade template directory
app.set('views', __dirname + '/views');

// Set path to JavaScript files
app.set('js', __dirname + '/js');

// Set path to CSS files
app.set('css', __dirname + '/css');

// Set path to image files
app.set('images', __dirname + '/images');

// Set path to sound files
app.set('sounds', __dirname + '/sounds');

// Set path to static files
app.use(express.static(__dirname + '/public'));

// Bind the root '/' URL to the hiscore page
app.get('/', function(req, res){
  res.render('hiscores.jade', {title: 'Hiscores'});
});

// Bind the '/play' URL to the main game page
app.get('/play', function(req, res){	
  res.render('main.jade', {title: 'Guess the Word'});
});

var server = app.listen(port, function() {
  console.log('Server running on port %d on host %s', server.address().port, host);
});

process.on('exit', function() {
  console.log('Server is shutting down!');
});
