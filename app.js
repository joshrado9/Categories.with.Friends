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


//adding database stuff
var cloudant = {
	url : "https://04fea742-a58c-4952-9d62-e7a493b49f95-bluemix.cloudant.com/categories_with_friends_hiscores/_all_docs" //todo
};
if (process.env.hasOwnProperty("VCAP_SERVICES")) {
	var env = JSON.parse(proces.env.VCAP_SERVICES);
	var host = process.env.VCAP_APP_HOST;
	var port = process.env.VCAP_APP_PORT;

	cloudant = env['cloudantNoSQLDB'][0].credentials;
}
var nano = require('nano')(cloudant.url);
var db = nano.db.use('categories_with_friends_hiscores');

//new code added
app.get('/hiscores', function(request, response) {
  db.view('top_scores', 'top_scores_index', function(err, body) {
  if (!err) {
    var scores = [];
      body.rows.forEach(function(doc) {
        scores.push(doc.value);		      
      });
      response.send(JSON.stringify(scores));
    } else {
    	response.send("I'm a failure");
    }
  });
});

app.get('/save_score', function(request, response) {
  var name = request.query.name;
  var score = request.query.score;

  var scoreRecord = { 'name': name, 'score' : parseInt(score), 'date': new Date() };
  db.insert(scoreRecord, function(err, body, header) {
    if (!err) {       
      response.send('Successfully added one score to the DB');
    }
  });
});
//end of new code and database code


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
