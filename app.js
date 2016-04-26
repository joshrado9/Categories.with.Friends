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

//body parser that was recommended to use
//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: true}));

//Database setup
var db = null;

var mysql = require('mysql');

db = mysql.createConnection(
{
	host: 'us-cdbr-iron-east-03.cleardb.net',
	port: '3306',
	user: 'b949f5a82f36fb',
	password: '3b81693c',
	database: 'ad_3063a2f467afe38'
});

var letter;
var categories;
var cpuanswers;

// serve the files out of ./views as our main files
app.use(express.static(__dirname + '/views'));


//this is the 
app.get('/', function(req, res){
	db.connect();
	var ty = 'Hiscores';
  	res.render('hiscores.jade', {title: ty});
  	console.log('What even');
});
//TODO add app.get('quit')


//this is where will retrieve the db data
app.get('/check', function(req, res) {
	
	
	//concat the data
	var sends = req.query.one +"|"+req.query.two+"|"+req.query.three+"|"+req.query.four+"|"+req.query.five;
	console.log("Body of req "+sends);
	//split to array of strings
	sends = sends.split("|");
	
	//get computer outputs
	var comp = "blank|";
	
	//DB queries
	
	//split the categories
	var cates = categories.split("|");
	
	//generate random number
//	var index = Math.floor(Math.random()*25) + 1;
	console.log(letter+"  "+cates[1]);
	//	db.query('SELECT fruits FROM word WHERE id = 1', function(err, rows)
//	{
//	
//		console.log('stuff');
//		if(cates[1] == 'fruits')
//			console.log('row content: '+rows[0].fruits[0]);
//								
//		var tmp = rows[0].fruits;
//		
//		if(tmp.indexOf(',') != -1)
//			tmp = tmp.substr(0, tmp.indexOf(','));
//		
//		comp = comp + tmp;
//	});

    
	console.log(comp);
	
	//TODO split into an array and send to client via res.render()
	var sendC = comp.split("|");
	
	//send a full string
	res.render('client.jade', {answer: sends, cpu: sendC});
	
	
	
});

//this is where will send the db data
app.get('/hi', function(req, res) {
	//res.render('hiscores.jade', {title: 'scores'});
	res.send('HI there');
	
});


//this is where the meat is 
app.get('/play', function(req, res){	


	//get random category
	var high = 6;
	var low = 1;
	var cat1 = Math.floor(Math.random() * (high - low) + low);
	
	//generate a letter
	var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	
	letter = Math.floor( Math.random() * 26) ;
	
	
	//DB Connection
	
	
	var cat1String, cat2String, cat3String, cat4String;
	var value1 = "nothing|";
	var cpu = "";
	db.query('SELECT name FROM categories WHERE id = '+ cat1, function(err, rows)
	{
		console.log('Data received from Db1:\n');
		console.log('1 '+rows[0]);
		cat1String = rows[0].name;
		console.log(cat1String);
	
		value1 = value1+rows[0].name;

		var query = "SELECT " + cat1String + " FROM word WHERE id = " + letter;
		db.query(query, function(err1, rows1)
		{
			console.log("word " + cat1String);
			console.log(rows1[0]);
			var str = JSON.stringify(rows1[0]);
			console.log("Whole " + str);
			var answerWhole = str.split("\"");
			
			console.log("Whole " + answerWhole[3]);
			//cpu = cpu + "|" + rows1[0].cat1String;
		});
		
	});
	
	var cat2 = Math.floor(Math.random() * (high - low) + low);
	while (cat2 == cat1)
	{
		console.log('cat2 loop');
		cat2 = Math.floor(Math.random() * (high - low) + low);
	}
	db.query('SELECT name FROM categories WHERE id = '+cat2, function(err, rows)
	{
	
		console.log('2');
		console.log('Data received from Db2:(value)\n');
		console.log('2'+value1);
		cat2String = rows[0].name;
	
		value1 = value1+"|"+ rows[0].name;
		console.log('2'+value1);
		
		var query = "SELECT " + cat2String + " FROM word WHERE id = " + letter;
		db.query(query, function(err1, rows1)
		{
			console.log(rows1[0]);
			//cpu = cpu + "|" + rows1[0].cat2String;
		});
	});
	
	var cat3 = Math.floor(Math.random() * (high - low) + low);
	while (cat3 == cat1 || cat3 == cat2)
	{
		console.log('cat3 loop');
		cat3 = Math.floor(Math.random() * (high - low) + low);
	}
	db.query('SELECT name FROM categories WHERE id = '+cat3, function(err, rows)
	{
		console.log('3');
		console.log('Data received from Db3:(value)\n');
		value1 = value1+"|"+ rows[0].name;
		console.log('3'+value1);
		cat3String = rows[0].name;
		
		var query = "SELECT " + cat3String + " FROM word WHERE id = " + letter;
		db.query(query, function(err1, rows1)
		{
			console.log(rows1[0]);
			//cpu = cpu + "|" + rows1[0].cat3String;
		});
	});

	db.query('SELECT name FROM categories WHERE id = 4', function(err, rows)
	{
		//if (err) throw err;
		console.log('4');
		console.log('Data received from Db4:(value)\n');	
		value1 = value1+"|"+ rows[0].name;
		console.log('4'+value1);
		cat4String = rows[0].name;
		
		var query = "SELECT " + cat4String + " FROM word WHERE id = " + letter;
		db.query(query, function(err1, rows1)
		{
			console.log(rows1);
			//cpu = cpu + "|" + rows1[0].cat4String;
		});
		
		
		//store the categories
		categories= value1;
		var val = value1.split("|");
		
		cpuanswers = cpu;
		var comp = cpu.split("|");		
		//send the data to Main
		res.render('main.jade', {title: 'Guess the Word', value: val, letr: alpha.charAt(letter-1)});
	
		///res.end(value1);
	
	});
	
	
		
});

app.get('/quit', function(req, res)
{
	db.end();
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
console.log('What just');







