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

//Database setup
var db = null;

var mysql = require('mysql');
//db = mysql.createConnection(
//{
//	host: 'us-cdbr-iron-east-03.cleardb.net',
//	port: '3306',
//	user: 'b949f5a82f36fb',
//	password: '3b81693c',
//	database: 'ad_3063a2f467afe38'
//});

var high = 2;
var low = 1;

var cat = Math.floor(Math.random() * (high - low) + low);

//db.query('SELECT name FROM categories WHERE id = ' + cat, function(err, rows)
//{
//	if (err) throw err;
//	
//	console.log(cat);
//	console.log('Data received from Db:\n');
//	console.log(rows);
//});

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

//db.end();





