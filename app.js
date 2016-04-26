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
/*
db = mysql.createConnection(
{
	host: 'us-cdbr-iron-east-03.cleardb.net',
	port: '3306',
	user: 'b949f5a82f36fb',
	password: '3b81693c',
	database: 'ad_3063a2f467afe38'
});

db.connect();
*/
var letter;
var categories;
var cpuanswers;

function handleDisconnect()
{
	db = mysql.createConnection({
		host: 'us-cdbr-iron-east-03.cleardb.net',
		port: '3306',
		user: 'b949f5a82f36fb',
		password: '3b81693c',
		database: 'ad_3063a2f467afe38'
	});
	
	db.connect(function(err) {
		if (err) {
			console.log('error when connecting to the db:', err);
			setTimeout(handleDisconnect, 2000);
		}
	});
	
	db.on('error', function(err) {
		console.log('db error', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST')
		{
			handleDisconnect();
		}
		else
		{
			throw err;
		}
	});
}

handleDisconnect();

// serve the files out of ./views as our main files
app.use(express.static(__dirname + '/views'));


//this is the 
app.get('/', function(req, res){

	var ty = 'Hiscores';
  	res.render('hiscores.jade', {title: ty});
  	console.log('What even');
});
//TODO add app.get('quit')


//this is where will retrieve the db data
app.get('/check', function(req, res) {
	
	
	//concat the data
	var sends = req.query.one +"|"+req.query.two+"|"+req.query.three;
	console.log("Body of req "+sends);
	
	//split to array of strings
	sends = sends.split("|");
	
	
	//split the categories
	var cates = categories.split("|");
	
	//generate random number

	console.log(cpuanswers);   
	
	//TODO split into an array and send to client via res.render()
	var sendC = cpuanswers.split("|");
	console.log(sendC[0]+" "+sendC[1]+" "+sendC[2]);
	
	var score = 0;
	
	for(var u = 0; u < sends.length; u++) {
		
		var one = sends[u].toLowerCase();
		var two = sendC[u].toLowerCase();
		
		if((one !== two || two !== '') && one !== '')
			score++;
		
	}	


	res.render('client.jade', {answer: sends, cpu: sendC, total: score});
	
	
	
});

//this is where will send the db data
app.get('/hi', function(req, res) {
	
	
	  
	//TODO push highscore to db
	  db.query("INSERT into hiscores (score) VALUES ",function (err, rows){
	  	
	  });
	
	
	
	//TODO do the play function
	
		//get random category
	var high = 6;
	var low = 1;
	var cat1 = Math.floor(Math.random() * (high - low) + low);
	
	//generate a letter
	var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	
	letter = Math.floor( Math.random() * 26) ;

	var cat1String, cat2String, cat3String;
	var value1 = "";
	var cpu = "";
	db.query('SELECT name FROM categories WHERE id = '+ cat1, function(err, rows)
	{
		cat1String = rows[0].name;
		value1 = value1+rows[0].name;
		console.log("Cat Query 1" + value1);

		var query = "SELECT " + cat1String + " AS hello FROM word WHERE id = " + letter;
		db.query(query, function(err1, rows1)
		{
			var answerWhole = "";
			answerWhole = rows1[0].hello.split(",");
			
			var rng = answerWhole.length + 1;
			var rn = Math.floor(Math.random() * (rng));
			if (rn < answerWhole.length)
			{
				cpu = answerWhole[rn];
			}
			else 
			{
				cpu = "No Answer";
			}
			
			cpuanswers = cpuanswers+cpu;
			console.log("CPU Ans 1" + cpuanswers);
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
		cat2String = rows[0].name;
		value1 = value1+"|"+ rows[0].name;
		console.log("Cat Query 2" + value1);
		
		cpu ="";
		
		var query = "SELECT " + cat2String + " AS hello FROM word WHERE id = " + letter;
		db.query(query, function(err1, rows1)
		{
			var answerWhole;
			answerWhole = rows1[0].hello.split(",");
			
			var rng = answerWhole.length + 1;
			var rn = Math.floor(Math.random() * (rng));
			if (rn < answerWhole.length)
			{
				cpu = "|" + answerWhole[rn];
			}
			else 
			{
				cpu = "|No Answer";
			}
			
			cpuanswers = cpuanswers+cpu;
			console.log("CPU Ans 2" + cpuanswers);
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
		value1 = value1+"|"+ rows[0].name;
		cat3String = rows[0].name;
		console.log("Cat Query 3" + value1);
		
		cpu ="";		
		var query = "SELECT " + cat3String + " AS hello FROM word WHERE id = " + letter;
		db.query(query, function(err1, rows1)
		{
			var answerWhole;
			answerWhole = rows1[0].hello.split(",");
			
			var rng = answerWhole.length + 1;
			var rn = Math.floor(Math.random() * (rng));
			if (rn < answerWhole.length)
			{
				cpu = "|" + answerWhole[rn];
			}
			else 
			{
				cpu = "|No Answer";
			}
			cpuanswers = cpuanswers+cpu;
			console.log("CPU Ans 3" + cpuanswers);
		});		
		//store the categories
		categories= value1;
		var val = value1.split("|");
		
		cpuanswers = cpu;
		var comp = cpu.split("|");		
		//send the data to Main
		res.render('main.jade', {title: 'Categories w/ Friends', value: val, letr: alpha.charAt(letter-1) });
	});
	
	
	
	
	
	
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

	var cat1String, cat2String, cat3String;
	var value1 = "";
	var cpu = "";
	db.query('SELECT name FROM categories WHERE id = '+ cat1, function(err, rows)
	{
		cat1String = rows[0].name;
		value1 = value1+rows[0].name;
		console.log("Cat Query 1" + value1);

		var query = "SELECT " + cat1String + " AS hello FROM word WHERE id = " + letter;
		db.query(query, function(err1, rows1)
		{
			var answerWhole = "";
			answerWhole = rows1[0].hello.split(",");
			
			var rng = answerWhole.length + 1;
			var rn = Math.floor(Math.random() * (rng));
			if (rn < answerWhole.length)
			{
				cpu = answerWhole[rn];
			}
			else 
			{
				cpu = "No Answer";
			}
			
			cpuanswers = cpuanswers+cpu;
			console.log("CPU Ans 1" + cpuanswers);
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
		cat2String = rows[0].name;
		value1 = value1+"|"+ rows[0].name;
		console.log("Cat Query 2" + value1);
		
		var query = "SELECT " + cat2String + " AS hello FROM word WHERE id = " + letter;
		db.query(query, function(err1, rows1)
		{
			var answerWhole;
			answerWhole = rows1[0].hello.split(",");
			
			var rng = answerWhole.length + 1;
			var rn = Math.floor(Math.random() * (rng));
			if (rn < answerWhole.length)
			{
				cpu = "|" + answerWhole[rn];
			}
			else 
			{
				cpu = "|No Answer";
			}
			
			cpuanswers = cpuanswers+cpu;
			console.log("CPU Ans 2" + cpuanswers);
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
		value1 = value1+"|"+ rows[0].name;
		cat3String = rows[0].name;
		console.log("Cat Query 3" + value1);
		
		var query = "SELECT " + cat3String + " AS hello FROM word WHERE id = " + letter;
		db.query(query, function(err1, rows1)
		{
			var answerWhole;
			answerWhole = rows1[0].hello.split(",");
			
			var rng = answerWhole.length + 1;
			var rn = Math.floor(Math.random() * (rng));
			if (rn < answerWhole.length)
			{
				cpu = "|" + answerWhole[rn];
			}
			else 
			{
				cpu = "|No Answer";
			}
			cpuanswers = cpuanswers+cpu;
			console.log("CPU Ans 3" + cpuanswers);
		});		
		//store the categories
		categories= value1;
		var val = value1.split("|");
		
		cpuanswers = cpu;
		var comp = cpu.split("|");		
		//send the data to Main
		res.render('main.jade', {title: 'Categories w/ Friends', value: val, letr: alpha.charAt(letter-1) });
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







